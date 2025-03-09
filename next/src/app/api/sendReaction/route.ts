import { authOptions } from "@/app/lib/nextAuth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        // 認証情報の取得
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "認証が必要です" },
                { status: 401 }
            );
        }

        const userId = session.user.id;
        const { postId, type } = await request.json();

        if (!postId || !type) {
            return NextResponse.json(
                { error: "投稿IDとリアクションの種類は必須です" },
                { status: 400 }
            );
        }

        // すでに同じリアクションがあるか確認
        const existingReaction = await prisma.reaction.findUnique({
            where: {
                userId_postId_type: {
                    userId,
                    postId,
                    type
                }
            }
        });

        if (existingReaction) {
            console.error("すでに同じリアクションをしています。")
        }

        await prisma.reaction.create({
            data: {
                userId,
                postId,
                type
            }
        });

        return NextResponse.json({ message: "リアクションを追加しました" });

    } catch (error) {
        console.error("リアクション処理エラー:", error);
        return NextResponse.json(
            { error: "サーバーエラーが発生しました" },
            { status: 500 }
        );
    }
}
