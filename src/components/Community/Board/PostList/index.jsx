import React, { useState, useEffect, useRef } from 'react';
import { getPostList, getPostCategoryList } from '../../../../api/apiPost';
import PostCard from '../PostCard';

const PostList = ({ selectedCategory, postType, onPostClick }) => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cursor, setCursor] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const observerRef = useRef(null);

    useEffect(() => {
        setPosts([]); 
        setCursor(null);
        setHasMore(true);
    }, [selectedCategory, postType]);

    useEffect(() => {
        const fetchPosts = async () => {
            if (!hasMore || loading) return;
            setLoading(true);
            try {
                const size = 30; // 한 번에 불러올 게시글 수 임시 설정..
                let response;
                if (selectedCategory) {
                    response = await getPostCategoryList(postType, selectedCategory, cursor, size);
                } else {
                    response = await getPostList(postType, cursor, size);
                }
                setPosts((prevPosts) => [...prevPosts, ...response.result.posts]);
                setHasMore(response.result.posts.length === size);
                if (response.result.posts.length > 0) {
                    setCursor(response.result.nextCursor);
                }
            } catch (error) {
                console.error('게시글 불러오기 실패:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [cursor, selectedCategory, postType, hasMore, loading]);

    useEffect(() => {
        if (!hasMore || loading) return;
        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setCursor(cursor); 
            }
        });
        if (observerRef.current && posts.length > 0) {
            observerRef.current.observe(document.getElementById('scrollObserver'));
        }
        return () => observerRef.current && observerRef.current.disconnect();
    }, [posts, hasMore, loading, cursor]);

    return (
        <>
            {posts.map((post) => (
                <PostCard
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
            {loading && <p>로딩 중...</p>}
            <div id="scrollObserver" style={{ height: '20px', visibility: 'hidden' }}></div>
        </>
    );
};
export default PostList;
