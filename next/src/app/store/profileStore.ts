// グローバルにユーザー情報を保存するためのストアファイル

// 表示対象のユーザーIDを保持
let targetUserId: string | null = null;

export const setTargetUserId = (userId: string) => {
  targetUserId = userId;
};

export const getTargetUserId = () => {
  return targetUserId;
};

// ユーザー情報をクリア（必要に応じて）
export const clearTargetUserId = () => {
  targetUserId = null;
};