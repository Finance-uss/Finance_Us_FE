import React from 'react';
import image from '../../../../assets/icons/common/Community/exam.png';
import PostCard from '../PostCard';

const posts = [
    { postId: 1, category: '자유', postName: '멍청비용 또생겼다', preview: '멍청비용 때문에 미치겠음\n이거 진짜 고쳐야 되는데', image, likes: 10, comments: 5 },
    { postId: 2, category: '정보', postName: '멍청비용 또생겼다', preview: '멍청비용 때문에 미치겠음\n이거 진짜 고쳐야 되는데', image, likes: 15, comments: 8 },
    { postId: 3, category: '낭비했어요', postName: '멍청비용 또생겼다', preview: '멍청비용 때문에 미치겠음\n이거 진짜 고쳐야 되는데', image, likes: 7, comments: 2 },
    { postId: 4, category: '절약했어요', postName: '멍청비용 또생겼다', preview: '멍청비용 때문에 미치겠음\n이거 진짜 고쳐야 되는데', image, likes: 12, comments: 4 },
    { postId: 5, category: '자유', postName: '멍청비용 멍청멍청', preview: '멍청비용 때문에 미치겠음\n이거 진짜 고쳐야 되는데', image, likes: 12, comments: 4 },
    { postId: 6, category: '칼럼', postName: '멍청비용 멍청멍청', preview: '멍청비용 때문에 미치겠음\n이거 진짜 고쳐야 되는데', image, likes: 12, comments: 4 },
    { postId: 7, category: '강연', postName: '멍청비용 멍청멍청', preview: '멍청비용 때문에 미치겠음\n이거 진짜 고쳐야 되는데', image, likes: 12, comments: 4 },
    { postId: 8, category: '홍보', postName: '멍청비용 멍청멍청', preview: '멍청비용 때문에 미치겠음\n이거 진짜 고쳐야 되는데', image, likes: 12, comments: 4 }
  ];

const PostList = ({selectedCategory, onPostClick}) => {
    const filteredPosts = selectedCategory
    ? posts.filter(post => post.category === selectedCategory)
    : posts;

    return (
        <>
          {filteredPosts.map(post => (
            <PostCard
              key={post.postId}
              id={post.postId}
              category={post.category}
              postName={post.postName}
              preview={post.preview}
              image={post.image}
              likes={post.likes}
              comments={post.comments}
              onPostClick={onPostClick}
            />
          ))}
        </>
      );
};
export default PostList;
