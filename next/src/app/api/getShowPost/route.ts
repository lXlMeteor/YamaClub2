import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // 投稿IDをクエリパラメータから取得
    const postId = searchParams.get('postId');
    
    if (!postId) {
      return NextResponse.json(
        { error: '投稿IDが指定されていません' },
        { status: 400 }
      );
    }
    
    // 指定された投稿を取得（シンプルな情報のみ）
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          }
        },
        reactions: {
          select: {
            userId: true,
            type: true,
          }
        },
        _count: {
          select: {
            comments: true,
          }
        },
      }
    });
    
    if (!post) {
      return NextResponse.json(
        { error: '投稿が見つかりませんでした' },
        { status: 404 }
      );
    }
    
    // リアクションのタイプごとの数を計算
    const reactionCounts = {
      EMPATHY: 0,
      LOL: 0,
      BIGLOL: 0
    };
    
    // リアクション数をタイプごとに集計
    post.reactions.forEach(reaction => {
      if (reaction.type in reactionCounts) {
        reactionCounts[reaction.type as keyof typeof reactionCounts]++;
      }
    });
    
    // 日時をISO文字列に変換
    const { reactions, user, ...postRest } = post;
    void reactions;
    
    // 整形された投稿情報
    const formattedPost = {
      ...postRest,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      reactionCounts,
    };
    
    // レスポンスオブジェクトを作成
    return NextResponse.json({
      profile: {
        id: user.id,
        name: user.name,
        image: user.image,
      },
      post: formattedPost,
    });
    
  } catch (error) {
    console.error('投稿の取得でエラーが発生しました:', error);
    return NextResponse.json(
      { error: '投稿の取得に失敗しました' },
      { status: 500 }
    );
  }
}