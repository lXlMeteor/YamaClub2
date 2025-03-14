import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/nextAuth';

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: '認証されていません' }, { status: 401 });
        }

        const userId = request.nextUrl.searchParams.get('userId');
        if (!userId) {
            return NextResponse.json({ error: 'ユーザーIDが指定されていません' }, { status: 400 });
        }

        // プロフィール情報の取得
    const userProfile = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          name: true,
          image: true,
          intro: true,
        },
    });

    if (!userProfile) {
        return NextResponse.json({ error: 'ユーザーが見つかりません' }, { status: 404 });
    }

    const userPosts = await prisma.post.findMany({
        where: { userId },
        orderBy: {
            createdAt: 'desc', // 新しい順にソート
        },
        include: {
          reactions: true,
          _count: {
            select: {
              comments: true,
            },
          },
        },
    });

    // 投稿ごとのリアクションのタイプごとの数を計算
    const postsWithReactionCounts = userPosts.map(post => {
        const reactionCounts = {
          EMPATHY: 0,
          LOL: 0,
          BIGLOL: 0
        };
  
        // リアクション数をタイプごとに集計
        post.reactions.forEach(reaction => {
          reactionCounts[reaction.type]++;
        });

        const totalReactions = reactionCounts.EMPATHY + reactionCounts.LOL + reactionCounts.BIGLOL;
        const commentCount = post._count.comments;
        const counter = totalReactions + commentCount;  // ← ここで合計値を計算
  
        // reactions プロパティを削除
        const { reactions, ...restPost } = post;
        void reactions;
  
        return {
          ...restPost,
          reactionCounts,
          commentCount,
          counter,
        };
      });

    // カウント情報の取得
    const kuyoCount = userPosts.filter(post => post.status).length;
    const reactionCounts = {
        EMPATHY: 0,
        LOL: 0,
        BIGLOL: 0
    };
  
    userPosts.forEach(post => {
        post.reactions.forEach(reaction => {
          reactionCounts[reaction.type]++;
        });
    });

    return NextResponse.json({
        profiles: userProfile,
        posts: postsWithReactionCounts,
        counts: {
          kuyoCount,
          reactionCounts,
        },
      });
    } catch (error) {
      console.error('プロフィールの取得でエラーが発生しました:', error);
      return NextResponse.json({ error: 'プロフィールの取得に失敗しました' }, { status: 500 });
    }
}