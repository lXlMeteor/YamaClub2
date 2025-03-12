import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET(request: NextRequest) {
    try {
        // クエリパラメータから spotId を取得
        const { searchParams } = new URL(request.url);
        const spotId = searchParams.get("postId");

        if (!spotId) {
            return NextResponse.json(
                { error: "パラメーターが不足しています" },
                { status: 400 }
            );
        }

        // コメントを取得（User 情報も含める）
        const comments = await prisma.comment.findMany({
            where: { postId: spotId },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
                replies: { // 返信コメントも取得
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                image: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: "desc", // 最新のコメントを上に表示
            },
        });

        return NextResponse.json({ comments }, { status: 200 });

    } catch (error) {
        console.error("コメント取得でエラーが発生しました:", error);
        return NextResponse.json(
            { error: "コメントの取得に失敗しました" },
            { status: 500 }
        );
    }
}
