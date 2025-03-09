type PostReactionsProps = {
    reactionCounts: {
        EMPATHY: number;
        LOL: number;
        BIGLOL: number;
    };
    commentCount: number;
  };
  
  const PostReactions: React.FC<PostReactionsProps> = ({ reactionCounts, commentCount }) => {
    return (
        <div style={{ display: "flex", border: "1px solid black", gap: "12px", padding: "8px" }}>
            <p>共感：{reactionCounts.EMPATHY}</p>
            <p>草：{reactionCounts.LOL}</p>
            <p>爆笑：{reactionCounts.BIGLOL}</p>
            <p>コメント数：{commentCount}</p>
        </div>
    );
  };
  
  export default PostReactions;
  