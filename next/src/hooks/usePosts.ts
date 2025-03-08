'use client';

import { useState, useCallback } from 'react';

// 型定義
export interface User {
  id: string;
  name: string;
  image: string | null;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: User;
  _count: {
    comments: number;
    reactions: number;
  };
  reactionCounts: {
    EMPATHY: number;
    LOL: number;
    BIGLOL: number;
  };
}

export interface PaginationInfo {
  oldestPostDate: string | null;
  newestPostDate: string | null;
  currentServerTime: string;
  hasOlder: boolean;
  hasNewer: boolean;
}

export interface PostsResponse {
  posts: Post[];
  pagination: PaginationInfo;
}

export function usePosts() {
  // 投稿データ
  const [posts, setPosts] = useState<Post[]>([]);
  // ページネーション情報
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 初期データ読み込み
  const loadInitialPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/getPosts');
      if (!response.ok) {
        throw new Error('投稿の取得に失敗しました');
      }
      
      const data: PostsResponse = await response.json();
      
      // 取得したデータをセット
      setPosts(data.posts);
      // 取得したページネーション情報をセット
      setPaginationInfo(data.pagination);
      return data;
    } catch (err: any) {
      console.error('投稿の読み込みエラー:', err);
      setError(err.message || '投稿の読み込みに失敗しました');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // より新しい投稿を読み込む
  const loadNewerPosts = useCallback(async () => {
    // 新しい投稿がない場合は何もしない
    if (!paginationInfo?.newestPostDate || loading) return null;
    
    try {
      setLoading(true);
      
      // postsの中で最新の日付をエンコードしてAPIにリクエスト、また、afterでエンコードした日付より新しい投稿を取得
      const response = await fetch(`/api/getPosts?after=${encodeURIComponent(paginationInfo.newestPostDate)}`);
      if (!response.ok) {
        throw new Error('新しい投稿の取得に失敗しました');
      }
      
      const data: PostsResponse = await response.json();
      
      if (data.posts.length > 0) {
        // 取得した新しい投稿を既存の投稿の前に追加
        setPosts(prevPosts => [...data.posts, ...prevPosts]);
        // 新しい方の日付を更新
        setPaginationInfo(prevInfo => ({
          ...data.pagination,
          // 古い方の日付は変えない（既存データの方が古い）
          oldestPostDate: prevInfo?.oldestPostDate || data.pagination.oldestPostDate,
        }));
      }
      
      return data;
    } catch (err: any) {
      console.error('新しい投稿の読み込みエラー:', err);
      setError(err.message || '新しい投稿の読み込みに失敗しました');
      return null;
    } finally {
      setLoading(false);
    }
  }, [paginationInfo, loading]);

  // より古い投稿を読み込む
  const loadOlderPosts = useCallback(async () => {
    if (!paginationInfo?.oldestPostDate || loading || !paginationInfo.hasOlder) return null;
    
    try {
      setLoading(true);
      
      const response = await fetch(`/api/getPosts?before=${encodeURIComponent(paginationInfo.oldestPostDate)}`);
      if (!response.ok) {
        throw new Error('古い投稿の取得に失敗しました');
      }
      
      const data: PostsResponse = await response.json();
      
      if (data.posts.length > 0) {
        setPosts(prevPosts => [...prevPosts, ...data.posts]);
        setPaginationInfo(prevInfo => ({
          ...data.pagination,
          // 新しい方の日付は変えない（既存データの方が新しい）
          newestPostDate: prevInfo?.newestPostDate || data.pagination.newestPostDate,
        }));
      }
      
      return data;
    } catch (err: any) {
      console.error('古い投稿の読み込みエラー:', err);
      setError(err.message || '古い投稿の読み込みに失敗しました');
      return null;
    } finally {
      setLoading(false);
    }
  }, [paginationInfo, loading]);

  // 最新の投稿をチェック
  const checkForNewPosts = useCallback(async () => {
    if (!paginationInfo?.newestPostDate || loading) return null;
    
    try {
      setLoading(true);
      
      const response = await fetch(`/api/getPosts?after=${encodeURIComponent(paginationInfo.newestPostDate)}`);
      if (!response.ok) {
        throw new Error('新着投稿の確認に失敗しました');
      }
      
      const data: PostsResponse = await response.json();
      return data;
    } catch (err: any) {
      console.error('新着投稿の確認エラー:', err);
      setError(err.message || '新着投稿の確認に失敗しました');
      return null;
    } finally {
      setLoading(false);
    }
  }, [paginationInfo, loading]);

  return {
    posts,
    paginationInfo,
    loading,
    error,
    loadInitialPosts,
    loadNewerPosts,
    loadOlderPosts,
    checkForNewPosts,
    setPosts
  };
}