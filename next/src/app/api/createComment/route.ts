import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/app/lib/prisma';
import { authOptions } from '@/app/lib/nextAuth';

export async function POST(request: Request) {
  try {
    // セッション情報を取得
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: '認証されていません' }, { status: 401 });
    }

    const userId = session.user.id;
    const { postId, replyId, content } = await request.json();

    // postId と replyId のいずれかが存在するか、content が空ではないかを確認
    if ((!postId && !replyId) || !content) {
      return NextResponse.json(
        { error: 'パラメーターが不足しています' },
        { status: 400 }
      );
    }

    // コメントの作成
    const newComment = await prisma.comment.create({
      data: {
        userId,
        postId: postId || null,
        replyId,
        content,
      },
    });

    return NextResponse.json({ comment: newComment }, { status: 201 });
  } catch (error) {
    console.error('コメント作成でエラーが発生しました:', error);
    return NextResponse.json(
      { error: 'コメントの作成に失敗しました' },
      { status: 500 }
    );
  }
}