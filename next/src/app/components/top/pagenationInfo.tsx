type PaginationInfoProps = {
    currentIndex: number;
    postsLength: number;
};
  
const PaginationInfo: React.FC<PaginationInfoProps> = ({ currentIndex, postsLength }) => {
    return (
        <p>
            {postsLength > 0 ? `今いるページ：${currentIndex + 1} / ${postsLength}` : '投稿なし'}
        </p>
    );
};

export default PaginationInfo;
  