'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Avatar, IconButton, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Image from 'next/image';
import { usePosts } from '@/hooks/usePosts';

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

  return (
    <div>
        <div style={{marginBottom: '20px'}}>
          <p>カスタマイズ要素(念の為残しとく)</p>
          {/* 最新の投稿を取得して、そこにジャンプ */}
          <button 
            onClick={handleLoadNewPosts} 
            disabled={loading}
            style={{border: '1px solid black'}}
          >
            最新の投稿を表示ボタン
          </button>
          {/* 今いる場所/全ページ数 */}
          <p>{posts.length > 0 ? `今いるページ：${currentIndex + 1} / ${posts.length}` : '投稿なし'}</p>
        </div>
      
      {/* 新着投稿アラート 他の人とかが投稿したら表示される(これは要相談かな？毎回出たらうるさいし) */}
      {showNewPostsAlert && (
        // 最新投稿を取得して、そこにジャンプ
        <button 
          style={{
            width: '100%',
            backgroundColor: 'rgba(0, 0, 255, 0.5)',
          }}
          onClick={handleLoadNewPosts}
        >
          {/* 自動で取得した新着の件数を表示 */}
          <p>{newPostsCount}件の新しい投稿があります。クリックして表示</p>
        </button>
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
        <div style={{display: 'flex', justifyContent:'space-between'}}>
            {/* 左矢印（次の投稿） */}
            <div>
                <p>次の投稿に遷移するボタン</p>
                {/* ひとつ新しい投稿に遷移するボタン デザインわからんから、AI生成したやつそのまま置いとく 要変更してください*/}
                <IconButton 
                onClick={handlePrevPost} 
                disabled={currentIndex === 0}
                sx={{ 
                    bgcolor: 'background.paper', 
                    boxShadow: 2,
                    '&:hover': { bgcolor: 'grey.100' },
                    '&.Mui-disabled': { bgcolor: 'grey.200', opacity: 0.4 }
                }}
                size="large"
                aria-label="次の投稿"
                >
                {/* <-みたいな矢印 */}
                <ArrowBackIcon />
                </IconButton>
            </div>
          
            {/* 投稿表示エリア */}
            {/* 表示する投稿(一枚一枚表示) currentPost(投稿の情報が大量に入ってる) postsに配列で投稿が入ってて、
                currentIndexでその配列の何番目かを指定する感じ console.logで取得してる情報流してるからその番号振ってあるのと
                currentIndex->currentPostの情報がリンクしてるからわからんくなったら確認
                こっから下は必要そうな情報の出し方とかメモみたいに書いていく*/}
            {currentPost && (
              <div style={{display:'flex', flexDirection:'column', gap: 2, flexGrow: 1, border: '1px solid black', paddingBottom: '100px'}}>
                {/* 投稿ヘッダー */}
                <div style={{display: 'flex', flexDirection: 'column', border: '1px solid black'}}>
                  {/* ユーザー情報 */}
                  <p>ユーザー情報</p>
                  <div>
                    {/* 投稿ユーザーのアイコン */}
                    <Avatar 
                      src={currentPost.user.image || undefined} 
                      sx={{ width: 48, height: 48, mr: 2 }}
                    />
                    <p>名前：{currentPost.user.name}</p>
                    <p>投稿時間：{formatDate(currentPost.createdAt)}</p>
                  </div>
                </div>
                
                {/* 投稿内容 */}
                <div style={{border: '1px solid black'}}>  
                  <p>投稿内容</p>
                  <p>カテゴリー：{currentPost.category}</p>
                  <p>タイトル：{currentPost.title}</p>
                  <p>文章：{currentPost.content}</p>
                  {currentPost.image && (
                    <Box sx={{ position: 'relative', height: 300, mb: 3, borderRadius: 1, overflow: 'hidden' }}>
                      <Image
                        src={currentPost.image}
                        alt={currentPost.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="100%, 100%, 100%"
                        priority  //必須(これないと読み込み遅い)
                      />
                    </Box>
                  )}
                </div>
                
                {/* リアクション・コメント数 */}
                <div style={{ display: 'flex', border: '1px solid black', gap: 3 }}>
                      <p>共感：{currentPost.reactionCounts.EMPATHY}</p>
                      <p>草：{currentPost.reactionCounts.LOL}</p>
                      <p>爆笑：{currentPost.reactionCounts.BIGLOL}</p>
                      <p>コメント数：{currentPost._count.comments}</p>
                </div>

                {/* コメント表示ボタン */}
                {isShowComments ? (
                    <div style={{ textAlign: 'center'}}>
                        <p>コメント達</p>
                        <button onClick={handleHideComments}>コメント非表示ボタン</button>
                    </div>
                ) : (
                    <div style={{ textAlign: 'center'}}>
                        <button onClick={handleShowComments}>コメントを見る・投稿するボタン</button>
                    </div>
                )}
              </div>
            )}
          
            {/* 右矢印（次の投稿） */}
            <div>
                {/* ひとつ古い投稿に遷移するボタン デザインわからんから、AI生成したやつそのまま置いとく 要変更してください*/}
                <p>前の投稿に遷移するボタン</p>
                <IconButton 
                onClick={handleNextPost} 
                disabled={currentIndex === posts.length - 1}
                sx={{ 
                    bgcolor: 'background.paper', 
                    boxShadow: 2,
                    '&:hover': { bgcolor: 'grey.100' },
                    '&.Mui-disabled': { bgcolor: 'grey.200', opacity: 0.4 }
                }}
                size="large"
                aria-label="前の投稿"
                >
                {/* ->みたいな矢印 */}
                <ArrowForwardIcon />
                </IconButton>
            </div>
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