'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Avatar, Chip, IconButton, Button, Card } from '@mui/material';
import { usePosts, Post } from '@/hooks/usePosts';
import NextPostButton from '../components/top/nextPostButton';
import PreviousPostButton from '../components/top/previousPostButton';
import LoadNewPostsButton from '../components/top/loadNewPostButton';
import PaginationInfo from '../components/top/pagenationInfo';
import NewPostsButton from '../components/top/newPostButton';
import PostCard from '../components/top/postCard';


export default function TopPage() {
    const { 
        posts, 
        loading,  //バックエンドから読み込み中かどうか
        error, 
        paginationInfo,
        loadInitialPosts, 
        loadNewerPosts, 
        loadOlderPosts,
        checkForNewPosts
    } = usePosts();
  
    // 現在表示中の投稿のインデックス
    const [currentIndex, setCurrentIndex] = useState(0);
    // さらなる読み込み中かどうか
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    //////この二つはオプション
    // 新着投稿アラートの表示
    const [showNewPostsAlert, setShowNewPostsAlert] = useState(false);
    // 新着投稿の件数
    const [newPostsCount, setNewPostsCount] = useState(0);
    //////

    const [isShowComments, setIsShowComments] = useState(false);

    // 初期データのロード
    useEffect(() => {
        loadInitialPosts();
    }, [loadInitialPosts]);
    useEffect(() => {
        console.log(posts); 
    }, [posts]);

  // 自動データロードの設定
    useEffect(() => {
      if (posts.length === 0) return;
      
      const loadMoreIfNeeded = async () => {
        // すでに読み込み中なら何もしない
        if (isLoadingMore) return;
        
        setIsLoadingMore(true);
        try {
          // 先頭付近に来たらより新しい投稿をロード
          if (currentIndex <= 1 && paginationInfo?.hasNewer) {
            await loadNewerPosts();
          }
          
          // 末尾付近に来たらより古い投稿をロード
          if (posts.length - currentIndex <= 2 && paginationInfo?.hasOlder) {
            await loadOlderPosts();
          }
        } finally {
          setIsLoadingMore(false);
        }
      };
      
      loadMoreIfNeeded();
    }, [currentIndex, posts.length, paginationInfo, loadNewerPosts, loadOlderPosts, isLoadingMore]);

    // 定期的に新しい投稿をチェック（オプション）
    useEffect(() => {
        const checkNewPostsInterval = setInterval(async () => {
            if (!paginationInfo || loading) return;
            
            const data = await checkForNewPosts();
            if (data && data.posts.length > 0) {
                setNewPostsCount(data.posts.length);
                setShowNewPostsAlert(true);
            }
        }, 60000); // 1分ごとにチェック
      
          return () => clearInterval(checkNewPostsInterval);
        }, [paginationInfo, loading, checkForNewPosts]);

        // 前の投稿に移動
        const handlePrevPost = () => {
            if (currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
            }
        };

        // 次の投稿に移動
        const handleNextPost = () => {
            if (currentIndex < posts.length - 1) {
                setCurrentIndex(currentIndex + 1);
            }
        };

        // 最新の投稿を読み込んで表示
        const handleLoadNewPosts = async () => {
            const data = await loadNewerPosts();
            if (data && data.posts.length > 0) {
                setCurrentIndex(0); // 最新の投稿にジャンプ
                setShowNewPostsAlert(false);
                setNewPostsCount(0);
            }
        };

        // 投稿日時のフォーマット
        const formatDate = (dateString: string) => {
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('ja-JP', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }).format(date);
        };

        //コメントを表示するかどうか
        const handleShowComments = () => {
            setIsShowComments(true);
        } 
        const handleHideComments = () => {
            setIsShowComments(false);
        }

        // 現在表示中の投稿
        const currentPost = posts.length > 0 ? posts[currentIndex] : null;
        console.log(currentPost);

        return (
            <div>
                {/* <div>
                    <p>カスタマイズ要素(念の為残しとく)</p>
                    <LoadNewPostsButton 
                        handleLoadNewPosts={handleLoadNewPosts} 
                        loading={loading} 
                    />
                    <PaginationInfo 
                        currentIndex={currentIndex} 
                        postsLength={posts.length} 
                    />
                </div> */}
              
                {/* 新着投稿アラート 他の人とかが投稿したら表示される(これは要相談かな？毎回出たらうるさいし) */}

                {showNewPostsAlert && (
                    // 最新投稿を取得して、そこにジャンプ
                    <NewPostsButton 
                        newPostsCount={newPostsCount} 
                        handleLoadNewPosts={handleLoadNewPosts} 
                    />
                )}
              
                {/* ローディング状態　これはAIが作ってくれたよ♡ 要変更 */}
                {loading && posts.length === 0 ? (

                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {/* 最初の読み込み中 */}
                        <CircularProgress />
                    </Box>
                    
                ) : error && posts.length === 0 ? (

                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 2 }}>
                        <Typography color="error">{error}</Typography>
                        <Button variant="contained" onClick={loadInitialPosts}>再読み込み</Button>
                    </Box>

                ) : posts.length === 0 ? (

                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography>投稿がありません</Typography>
                    </Box>

                ) : (

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        {/* 左矢印（次の投稿） */}
                        <PreviousPostButton 
                            handlePrevPost={handlePrevPost} 
                            currentIndex={currentIndex} 
                        />

                        {/* 投稿表示エリア */}
                        {/* 表示する投稿(一枚一枚表示) currentPost(投稿の情報が大量に入ってる) postsに配列で投稿が入ってて、
                            currentIndexでその配列の何番目かを指定する感じ console.logで取得してる情報流してるからその番号振ってあるのと
                            currentIndex->currentPostの情報がリンクしてるからわからんくなったら確認
                            こっから下は必要そうな情報の出し方とかメモみたいに書いていく*/}

                        {currentPost && (
                            <div>
                                <PostCard
                                    currentPost={currentPost}
                                    isShowComments={isShowComments}
                                    handleHideComments={handleHideComments}
                                    handleShowComments={handleShowComments}
                                    formatDate={formatDate}
                                />
                          </div>
                        )}
                    
                        {/* 右矢印（次の投稿） */}
                        <NextPostButton 
                            handleNextPost={handleNextPost} 
                            currentIndex={currentIndex} 
                            postsLength={posts.length} 
                        />
                    </div>
                )}
              
                {/* 読み込み中インジケーター さらなる読み込み中*/}
                {isLoadingMore && (
                    <Box sx={{ 
                        position: 'fixed', 
                        bottom: 16, 
                        left: '50%', 
                        transform: 'translateX(-50%)',
                        bgcolor: 'background.paper',
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        boxShadow: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        zIndex: 1000
                    }}>
                        <CircularProgress size={20} />
                        <Typography variant="body2">投稿を読み込み中...</Typography>
                    </Box>
                )}
        </div>
    );
}