import  { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/nextAuth';
import prisma from '@/app/lib/prisma';
import { z } from 'zod';

const postSchema = z.object({
    postId: z.string().min(1, { message: "postIdは必須です" }),
});

/*
* 供養するAPI
*
* 受け取る値
* postId: 投稿ID
*/
export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    
    // 認証チェック
    if (!userId) {
        return NextResponse.json(
            { error: "認証が必要です" },
            { status: 401 }
        );
    }

    const data = await request.json();

    // バリデーションチェック
    const validationResult = postSchema.safeParse(data);
    if(!validationResult.success) {
        return NextResponse.json(
            {
                error: "入力データが不正です",
                details: validationResult.error.format()
            },
            { status: 400 }
        );
    }
    const { postId } = validationResult.data;

    // 指定された投稿の投稿したuserIdとstatusのみを取得
    const post = await prisma.post.findUnique({
        where: { id: postId },
        select: {
            userId: true,
            status: true
        }
    });
    
    if(!post) {
        // 投稿が見つからない場合
        return NextResponse.json(
            { error: "投稿が見つかりません" },
            { status: 404 }
        );
    } else if (post?.userId !== userId) {
        // 投稿者以外が供養しようとした場合
        return NextResponse.json(
            { error: "投稿者以外は供養できません" },
            { status: 403 }
        );
    } else if (post?.status) {
        // 既に供養済みの場合
        return NextResponse.json(
            { error: "既に供養されています" },
            { status: 400 }
        );
    } else {
        // 供養処理
        try {
            const letsKuyo = await prisma.post.update({
                where: { id: postId },
                data: {
                    status: true
                }
            });

            return NextResponse.json({
                message: "供養しました",
                letsKuyo
            }, { status: 200 });
        } catch (error) {
            console.error("供養エラー", error);
            return NextResponse.json(
                { error: "供養供養中に事件が発生しました" },
                { status: 500 }
            );
        }
    }
}