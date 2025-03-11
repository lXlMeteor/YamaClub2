import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/nextAuth';
import prisma from '@/app/lib/prisma';
import { z } from 'zod';

// 投稿データのバリデーションスキーマ
// フロントエンドから送られるデータに合わせて設定
const postSchema = z.object({
  title: z.string().min(1, { message: "タイトルは必須です" }),
  category: z.string().min(1, { message: "カテゴリは必須です" }),
  content: z.string().min(1, { message: "内容は必須です" }),
  // 画像は省略可能、null可能、または文字列
  image: z.string().nullable().optional(),
});

/*
*
* title: タイトル
* category: カテゴリ
* content: 内容
* image: 画像URL
* 
* これらをフロントから受け取る
* idはバックエンドで受け取るのでフロントからは送信しない
*/
export async function POST(request: NextRequest) {
  try {
    // 認証チェック
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "認証が必要です" },
        { status: 401 }
      );
    }
    
    // リクエストボディの取得
    const body = await request.json();
    console.log(body);
    
    // バリデーション
    // 上のpostSchemaを使ってリクエストボディを検証
    const validationResult = postSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: "入力データが不正です", 
          details: validationResult.error.format() 
        },
        { status: 400 }
      );
    }
    
    // フロントエンドから送られてきたデータを取得
    const { title, category, content, image } = validationResult.data;
    
    // データベースに投稿を保存
    // status は自動的に false を設定
    const postData = {
      title,
      category,
      content,
      status: false,
      userId: session.user.id,
      image: image || null  // image がない場合は null を設定
    };
    
    const post = await prisma.post.create({
      data: postData
    });
    
    return NextResponse.json({ 
      message: "投稿が作成されました",
      post
    }, { status: 201 });
    
  } catch (error) {
    console.error("投稿作成エラー:", error);
    return NextResponse.json(
      { error: "投稿の作成中にエラーが発生しました" },
      { status: 500 }
    );
  }
}