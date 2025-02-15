import React, { useState, useEffect } from 'react';
import { getPostList, getPostCategoryList } from '../../../../api/apiPost'; 
import PostCard from '../PostCard';  

const PostList = ({ selectedCategory, postType, onPostClick }) => {

    const [posts, setPosts] = useState([]);  
    const [loading, setLoading] = useState(false);  
    const [cursor, setCursor] = useState(null);  
    const [hasMore, setHasMore] = useState(true); 

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true); 
            try {
                let response;
                const limit = 10; 
                if (selectedCategory) {
                    response = await getPostCategoryList(postType, selectedCategory, cursor, limit);
                } else {
                    response = await getPostList(postType, cursor, limit);
                }

                setPosts(prevPosts => [...prevPosts, ...response.result.posts]); 
                setHasMore(response.result.hasMore);  
                if (response.result.posts.length > 0) {
                    setCursor(response.result.posts[response.result.posts.length - 1].postId);  
                }
            } catch (error) {
                console.error('게시글 불러오기 실패:', error);
            } finally {
                setLoading(false);  
            }
        };

        fetchPosts(); 
    }, [selectedCategory, postType, cursor]);  

    if (loading) {
        return <p>로딩 중...</p>; 
    }

    return (
        <>
            {posts.map(post => (
                <PostCard
                    key={post.postId}
                    id={post.postId}
                    category={post.category}
                    postName={post.title}
                    preview={post.content}
                    image={post.imageUrl}
                    likes={post.likes}
                    comments={post.comments}
                    onPostClick={onPostClick}
                />
            ))}
            {hasMore && !loading && (
                <button onClick={() => setCursor(posts[posts.length - 1].postId)}>Load More</button> 
            )}
        </>
    );
};
export default PostList;
