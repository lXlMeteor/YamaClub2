// export { default } from "next-auth/middleware";

// export const config = {
//   matcher: [
//     "/((?!signIn|hoge).*)",  // /signInおよび/hogeディレクトリを除外し、他のすべてのルートに認証を適用
//   ],
// };
export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/((?!signIn).*)"
  ],
};