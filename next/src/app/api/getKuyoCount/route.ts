import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/nextAuth';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    // URLからlimitパラメータを取得（デフォルト20件）
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '20');

    // statusがtrueの投稿を持つユーザーをグループ化して取得
    const kuyoUsers = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        // statusがtrueの投稿だけをカウント
        _count: {
          select: {
            posts: {
              where: {
                status: true,
              },
            },
          },
        },
      },
      // statusがtrueの投稿が1つ以上あるユーザーのみ
      where: {
        posts: {
          some: {
            status: true,
          },
        },
      },
      // 供養数の多い順にソート
      orderBy: {
        posts: {
          _count: 'desc',
        },
      },
      // 指定された数だけ取得
      take: limit,
    });

    // クライアントに返すための整形
    const formattedResult = kuyoUsers.map(user => ({
      user: {
        id: user.id,
        name: user.name,
        image: user.image,
        kuyouCount: user._count.posts,
      }
    }));

    // ログインユーザーの情報と順位を準備
    let loginUser = null;

    if (userId) {
      // ランキング内にログインユーザーがいるか確認
      const userIndex = formattedResult.findIndex(item => item.user.id === userId);
      
      if (userIndex !== -1) {
        // ランキング内にいる場合は順位を計算して追加
        loginUser = {
          ...formattedResult[userIndex].user,
          rank: userIndex + 1 // 0始まりのインデックスを1始まりの順位に変換
        };
      } else {
        // ランキング外の場合はユーザー情報と供養数を取得
        const userData = await prisma.user.findUnique({
          where: { id: userId },
          select: {
            id: true,
            name: true,
            image: true,
            _count: {
              select: {
                posts: {
                  where: { status: true }
                }
              }
            }
          }
        });

        if (userData) {
          const kuyouCount = userData._count.posts;
          
          // 全ユーザーの供養数を取得して比較
          const allUsers = await prisma.user.findMany({
            where: {
              posts: {
                some: { status: true }
              }
            },
            select: {
              id: true,
              _count: {
                select: {
                  posts: {
                    where: { status: true }
                  }
                }
              }
            }
          });
          
          // 自分より供養数が多いユーザーの数をカウント
          const higherRankedCount = allUsers.filter(user => 
            user._count.posts > kuyouCount
          ).length;
          
          loginUser = {
            id: userData.id,
            name: userData.name,
            image: userData.image,
            kuyouCount: kuyouCount,
            rank: higherRankedCount + 1  // 自分より多い人の数 + 1 = 自分の順位
          };
        }
      }
    }

    return NextResponse.json({
      kuyouUsers: formattedResult,
      loginUser
    });
  } catch (error) {
    console.error('供養ランキング取得エラー:', error);
    return NextResponse.json(
      { error: '供養ランキングの取得に失敗しました' },
      { status: 500 }
    );
  }
}