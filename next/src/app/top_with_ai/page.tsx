'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Avatar, Chip, IconButton, Button, Card } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RefreshIcon from '@mui/icons-material/Refresh';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Image from 'next/image';
import Link from 'next/link';
import { usePosts, Post } from '@/hooks/usePosts';

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
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderBottom: 1,
        borderColor: 'divider'
      }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
          投稿タイムライン
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Button 
            size="small" 
            variant="outlined" 
            onClick={handleLoadNewPosts} 
            startIcon={<RefreshIcon />}
            disabled={loading}
          >
            最新の投稿を表示
          </Button>
          
          <Typography variant="body2" color="text.secondary">
            {posts.length > 0 ? `${currentIndex + 1} / ${posts.length}` : '投稿なし'}
          </Typography>
        </Box>
      </Box>
      
      {/* 新着投稿アラート */}
      {showNewPostsAlert && (
        <Box sx={{
          p: 1,
          bgcolor: 'primary.light',
          color: 'primary.contrastText',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer'
        }}
        onClick={handleLoadNewPosts}
        >
          <Typography variant="body2" fontWeight="medium">
            {newPostsCount}件の新しい投稿があります。クリックして表示
          </Typography>
        </Box>
      )}
      
      {/* ローディング状態 */}
      {loading && posts.length === 0 ? (
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
        <Box sx={{ flex: 1, display: 'flex', position: 'relative' }}>
          {/* 左矢印（前の投稿） */}
          <Box sx={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 2 }}>
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
              aria-label="前の投稿"
            >
              <ArrowBackIcon />
            </IconButton>
          </Box>
          
          {/* 投稿表示エリア */}
          <Card sx={{ 
            flex: 1, 
            mx: 10, 
            my: 2, 
            display: 'flex', 
            flexDirection: 'column',
            overflow: 'auto',
            boxShadow: 3,
            borderRadius: 2
          }}>
            {currentPost && (
              <>
                {/* 投稿ヘッダー */}
                <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar 
                      src={currentPost.user.image || undefined} 
                      alt={currentPost.user.name}
                      sx={{ width: 48, height: 48, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {currentPost.user.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(currentPost.createdAt)}
                      </Typography>
                    </Box>
                    <Chip 
                      label={currentPost.category} 
                      color="primary" 
                      size="small" 
                      sx={{ ml: 'auto' }} 
                    />
                  </Box>
                  
                  <Typography variant="h5" sx={{ mb: 1, fontWeight: 'medium' }}>
                    {currentPost.title}
                  </Typography>
                </Box>
                
                {/* 投稿内容 */}
                <Box sx={{ px: 3, py: 2, flex: 1, overflow: 'auto' }}>
                  {currentPost.image && (
                    <Box sx={{ position: 'relative', height: 300, mb: 3, borderRadius: 1, overflow: 'hidden' }}>
                      <Image
                        src={currentPost.image}
                        alt={currentPost.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="100%, 100%, 100%"
                        priority
                      />
                    </Box>
                  )}
                  
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      whiteSpace: 'pre-wrap',
                      lineHeight: 1.8
                    }}
                  >
                    {currentPost.content}
                  </Typography>
                </Box>
                
                {/* リアクション・コメント数 */}
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  p: 2,
                  mt: 'auto',
                  borderTop: 1,
                  borderColor: 'divider',
                  bgcolor: 'background.paper'
                }}>
                  <Box sx={{ display: 'flex', gap: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <FavoriteIcon color="error" sx={{ mr: 0.5 }} />
                      <Typography>{currentPost.reactionCounts.EMPATHY}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <SentimentSatisfiedAltIcon color="warning" sx={{ mr: 0.5 }} />
                      <Typography>{currentPost.reactionCounts.LOL}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <EmojiEmotionsIcon color="success" sx={{ mr: 0.5 }} />
                      <Typography>{currentPost.reactionCounts.BIGLOL}</Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CommentIcon color="primary" sx={{ mr: 0.5 }} />
                    <Typography>{currentPost._count.comments} コメント</Typography>
                  </Box>
                </Box>
                
                {/* コメント表示ボタン */}
                <Box sx={{ p: 2, textAlign: 'center', bgcolor: 'background.paper' }}>
                  <Link href={`/post/${currentPost.id}`} passHref>
                    <Button 
                      variant="outlined" 
                      startIcon={<CommentIcon />}
                      fullWidth
                    >
                      コメントを見る・投稿する
                    </Button>
                  </Link>
                </Box>
              </>
            )}
          </Card>
          
          {/* 右矢印（次の投稿） */}
          <Box sx={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 2 }}>
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
              aria-label="次の投稿"
            >
              <ArrowForwardIcon />
            </IconButton>
          </Box>
        </Box>
      )}
      
      {/* 読み込み中インジケーター */}
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
    </Box>
  );
}