import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/nextAuth';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || null;
    const { searchParams } = new URL(request.url);
    
    // クエリパラメータの取得
    const after = searchParams.get('after');   // これより新しい投稿を取得（この時点より後に作成された投稿）例: 2022-01-01T00:00:00.000Z
    const before = searchParams.get('before'); // これより古い投稿を取得（この時点より前に作成された投稿）例: 2022-01-01T00:00:00.000Z
    const limit = parseInt(searchParams.get('limit') || '5'); // デフォルトは20件
    
    // 基本的なフィルター条件（status=falseの投稿のみ）
    const baseWhere = {
      status: false // statusがfalseの投稿のみ取得
    };
    
    // ページネーション条件（双方向）
    let paginationWhere = {};
    let orderDirection: 'asc' | 'desc' = 'desc'; // デフォルトは新しい順
    
    // ISO形式の日時文字列をDateオブジェクトに変換する関数
    const parseDateTime = (dateTimeStr: string | null): Date | null => {
      if (!dateTimeStr) return null;
      
      try {
        // ISO形式の日時文字列をパース
        const date = new Date(dateTimeStr);
        
        // 有効な日付かチェック
        if (isNaN(date.getTime())) {
          console.error(`Invalid date format: ${dateTimeStr}`);
          return null;
        }
        
        return date; // Dateオブジェクトを返す
      } catch (error) {
        console.error(`Error parsing date: ${dateTimeStr}`, error);
        return null;
      }
    };
    
    // before/afterパラメータをDateオブジェクトに変換
    // after指定の場合は新しい順に取得するため、afterDateが指定されている場合はbeforeDateは無視
    const beforeDate = parseDateTime(before);
    const afterDate = parseDateTime(after);
    
    if (afterDate) {
      // 指定の日付時間より新しい(greater than)投稿を取得（この時点より後に作成）
      paginationWhere = {
        createdAt: {
          gt: afterDate // カーソル(日時)より新しい投稿を取得
        }
      };
      orderDirection = 'desc'; // 新→古
    } else if (beforeDate) {
      // 指定の日付時間より古い(less than)投稿を取得（この時点より前に作成）
      paginationWhere = {
        createdAt: {
          lt: beforeDate // カーソル(日時)より古い投稿を取得
        }
      };
      orderDirection = 'desc'; // 新→古（同じ順序で一貫性を保つ）
    }
    
    // 投稿を取得
    const posts = await prisma.post.findMany({
      take: limit, // 取得件数
      where: {
        ...baseWhere, // 基本条件
        ...paginationWhere // ページネーション条件
      },
      orderBy: {
        createdAt: orderDirection // ソート順(基本は新しい順)
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        reactions: {
          select: {
            //全ユーザーのリアクションを取得
            userId: true,
            type: true
          }
        },
        _count: {
          select: {
            comments: true, // コメント数
            reactions: true // リアクション数
          }
        }
      }
    });
    
    // after指定の場合は結果を逆順に（古い→新しいの順に表示するため）
    const orderedPosts = afterDate ? [...posts].reverse() : posts;
    
    // ページネーションのための情報
    let oldestPostDate = null; // 最古の投稿日時
    let newestPostDate = null; // 最新の投稿日時
    
    if (orderedPosts.length > 0) {
      // 日時を秒単位のISO文字列に変換して保存（ミリ秒まで含める）
      oldestPostDate = orderedPosts[orderedPosts.length - 1].createdAt.toISOString();
      newestPostDate = orderedPosts[0].createdAt.toISOString();
    }
    
    // リアクションタイプごとに集計 & ログイン中のユーザーのリアクションを抽出
    const postsWithFormattedReactions = orderedPosts.map(post => {
      // リアクションタイプごとに集計
      const reactionCounts = {
        EMPATHY: 0,
        LOL: 0,
        BIGLOL: 0
      };
      
      // リアクション数をタイプごとに集計
      post.reactions.forEach(reaction => {
        reactionCounts[reaction.type]++;
      });

      const myReaction = userId
        ? post.reactions
            .filter(r => r.userId === userId)
            .map(r => r.type) // ['EMPATHY', ...] のような配列
        : [];
      
      // createdAt と updatedAt を ISO 形式に変換して確実に正確なタイムスタンプを返す
      const formattedPost = {
        ...post,
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString()
      };
      
      // 返却するデータからreactionsプロパティを削除し、集計したreactionCountsに置き換える
      const { reactions, ...restPost } = formattedPost;
      void reactions;
      
      return {
        ...restPost,
        reactionCounts,
        myReaction
      };
    });
    
    // 現在のサーバー時刻をISO形式で取得（新規投稿チェック用）
    const currentServerTime = new Date().toISOString();

    // 次の投稿が存在するかどうかを確認するための追加クエリ
    // リミットいっぱいの場合、さらに古い投稿があるかをチェック
    const hasOlder = orderedPosts.length === limit && oldestPostDate ? await prisma.post.count({
      where: {
        ...baseWhere,
        createdAt: {
          lt: new Date(oldestPostDate)
        }
      }
    }) > 0 : false;
    
    // after指定がある場合、さらに新しい投稿があるかをチェック
    const hasNewer = afterDate ? await prisma.post.count({
      where: {
        ...baseWhere,
        createdAt: {
          gt: newestPostDate ? new Date(newestPostDate) : new Date()
        }
      }
    }) > 0 : false;
    
    return NextResponse.json({
      posts: postsWithFormattedReactions,
      pagination: {
        oldestPostDate, // 古い方の日付（後のデータ取得用）
        newestPostDate, // 新しい方の日付（前のデータ取得用）
        currentServerTime, // 現在のサーバー時刻（新しい投稿のチェック用）
        hasOlder, // 古い投稿がまだある可能性
        hasNewer, // after指定がある場合、新しい投稿がある可能性
      }
    });
    
  } catch (error) {
    console.error('投稿の取得でエラーが発生しました:', error);
    return NextResponse.json(
      { error: '投稿の取得に失敗しました。' }, 
      { status: 500 }
    );
  }
}