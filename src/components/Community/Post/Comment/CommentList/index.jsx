import React, { useEffect, useState } from 'react';
import CommentInput from '../CommentInput';
import * as S from "../../../../../styles/Community/PostDetail/Comment/style";
import Comment from './Comment';
import Reply from './Reply';
import useComment from '../../../../../hooks/useComment';

const CommentList = () => {
  const postId = 1;
  const {
    comments,
    replyTo,
    handleGetComment,
    handleAddComment,
    handleReplyClick,
    handleAddReply,
    handleLike,
    handleEditComment, 
  } = useComment(postId);

  const [editingCommentId, setEditingCommentId] = useState(null); 
  const [editingContent, setEditingContent] = useState('');

  useEffect(() => {
    handleGetComment();
  }, [handleGetComment]);

  const handleEditClick = (commentId, content) => {
    setEditingCommentId(commentId);
    setEditingContent(content);
  };

  const handleEditSubmit = (content) => {
    if (content.trim()) {
      handleEditComment(editingCommentId, content); 
      setEditingCommentId(null);
      setEditingContent('');
    }
  };

  return (
    <>
      {comments.map((comment) => (
        <S.CommentListContainer key={comment.id}>
          <Comment
            comment={comment}
            onReplyClick={handleReplyClick}
            onLike={() => handleLike(comment.id, false)}
            onEditClick={() => handleEditClick(comment.id, comment.comment)}
          />

          {comment.replies.length > 0 && (
            <S.Replies>
              {comment.replies.map((reply) => (
                <Reply
                  key={reply.id}
                  reply={reply}
                  onReplyClick={handleReplyClick}
                  onLike={() => handleLike(comment.id, true, reply.id)}
                />
              ))}
            </S.Replies>
          )}
        </S.CommentListContainer>
      ))}

      <CommentInput
        onSubmit={replyTo ? handleAddReply : handleAddComment}
        replyTo={replyTo?.userName || null}
      />
    </>
  );
};

export default CommentList;
