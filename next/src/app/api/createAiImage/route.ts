import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/nextAuth';
import prisma from '@/app/lib/prisma';
import { z } from 'zod';
import { createHash } from 'crypto';

const postSchema = z.object({
    content: z.string().min(1, { message: "本文は必須です" }),
});

/*
* 供養するAPI
*
* 受け取る値
* content: 本文
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
    const { content } = validationResult.data;
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { name: true},
    });

    const rawName = `${user?.name}-${Date.now()}`;
    const imageName = createHash('sha256').update(rawName).digest('hex');

    try {
        const flaskServerRoute = process.env.FLASK_SERVER_ROUTE;
        console.log(`${flaskServerRoute}/generate`);
        const response = await fetch(`${flaskServerRoute}/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: content,
                name :imageName,
            }),
        });
        console.log(`createAiImage: ${response}`);

        if (!response.ok) {
            const errorText = await response.text();
            return NextResponse.json({ error: errorText }, { status: response.status });
        }

        // flaskから受け取った画像のバイナリーデータをarrayBufferとして取得
        const imageBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(imageBuffer);
        const imageBase64 = buffer.toString('base64');

        return NextResponse.json({
            imageName,
            imageBase64, // この値は「生」のBase64文字列。フロント側で "data:image/png;base64," を付与して表示できる
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "画像生成に失敗しました" }, { status: 500 });
    }
}