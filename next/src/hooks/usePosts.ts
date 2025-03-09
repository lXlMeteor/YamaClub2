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
    } catch (err) {
      console.error('投稿の読み込みエラー:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('投稿の読み込みに失敗しました');
      }
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
          // 既存のページネーション情報ベースに
          ...data.pagination,
          // 古い方の日付は既存のデータで更新
          oldestPostDate: prevInfo?.oldestPostDate || data.pagination.oldestPostDate,
        }));
      }
      
      return data;
    } catch (err) {
      console.error('新しい投稿の読み込みエラー:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('新しい投稿の読み込みに失敗しました');
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, [paginationInfo, loading]);

  // より古い投稿を読み込む
  const loadOlderPosts = useCallback(async () => {
    // 古い投稿がない場合は何もしない
    if (!paginationInfo?.oldestPostDate || loading || !paginationInfo.hasOlder) return null;
    
    try {
      setLoading(true);
      
      // postsの中で最古の日付をエンコードしてAPIにリクエスト、また、beforeでエンコードした日付より古い投稿を取得
      const response = await fetch(`/api/getPosts?before=${encodeURIComponent(paginationInfo.oldestPostDate)}`);
      if (!response.ok) {
        throw new Error('古い投稿の取得に失敗しました');
      }
      
      const data: PostsResponse = await response.json();
      
      if (data.posts.length > 0) {
        // 取得した古い投稿を既存の投稿の後に追加
        setPosts(prevPosts => [...prevPosts, ...data.posts]);
        // 古い方の日付を更新
        setPaginationInfo(prevInfo => ({
          // 既存のページネーション情報ベースに
          ...data.pagination,
          // 新しい方の日付は既存のデータで更新
          newestPostDate: prevInfo?.newestPostDate || data.pagination.newestPostDate,
        }));
      }
      
      return data;
    } catch (err) {
      console.error('古い投稿の読み込みエラー:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('古い投稿の読み込みに失敗しました');
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, [paginationInfo, loading]);

  // 最新の投稿をチェック
  const checkForNewPosts = useCallback(async () => {
    // 新しい投稿がない場合は何もしない
    if (!paginationInfo?.newestPostDate || loading) return null;
    
    try {
      setLoading(true);
      
      // postsの中で最新の日付をエンコードしてAPIにリクエスト、また、afterでエンコードした日付より新しい投稿を取得
      const response = await fetch(`/api/getPosts?after=${encodeURIComponent(paginationInfo.newestPostDate)}`);
      if (!response.ok) {
        throw new Error('新着投稿の確認に失敗しました');
      }
      
      const data: PostsResponse = await response.json();
      // 新しい投稿がある場合は新着投稿を返す
      return data;
    } catch (err) {
      console.error('新着投稿の確認エラー:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('新着投稿の確認に失敗しました');
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, [paginationInfo, loading]);

  return {
    posts, // 投稿データ
    paginationInfo, // ページネーション情報
    loading, // ローディング中かどうか
    error, // エラー情報
    loadInitialPosts, // 初期データ読み込み
    loadNewerPosts, // より新しい投稿を読み込む
    loadOlderPosts, // より古い投稿を読み込む
    checkForNewPosts, // 最新の投稿をチェック
    setPosts // 投稿データをセット
  };
}