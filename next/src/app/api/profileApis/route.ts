import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma from '@/app/lib/prisma'
import { authOptions } from '@/app/lib/nextAuth'
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // セッション情報を取得
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: '認証されていません' }, { status: 401 });
    }

    const userId = session.user.id;
    
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

export async function PUT(request: Request) {
    try {
      // セッション情報を取得
      const session = await getServerSession(authOptions);
      if (!session || !session.user) {
        return NextResponse.json({ error: '認証されていません' }, { status: 401 });
      }
  
      const userId = session.user.id;
      const { name, email, password, image, intro } = await request.json();

      // 更新データの準備
      const updateData: Partial<{
        name: string;
        email: string;
        hashedPassword: string;
        image: string;
        intro: string;
      }> = {};
      if (name) updateData.name = name;
      if (email) updateData.email = email;
      if (password) updateData.hashedPassword = await bcrypt.hash(password, 10);
      if (image) updateData.image = image;
      if (intro) updateData.intro = intro;
  
      // ユーザー情報の更新
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updateData,
      });
  
      return NextResponse.json({ user: updatedUser });
    } catch (error) {
      console.error('プロフィールの更新でエラーが発生しました:', error);
      return NextResponse.json({ error: 'プロフィールの更新に失敗しました' }, { status: 500 });
    }
  }