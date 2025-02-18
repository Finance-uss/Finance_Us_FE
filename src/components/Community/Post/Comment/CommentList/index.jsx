import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CommentInput from "../CommentInput";
import * as S from "../../../../../styles/Community/PostDetail/Comment/style";
import Comment from "./Comment";
import Reply from "./Reply";
import useComment from "../../../../../hooks/useComment";

const CommentList = () => {
  const {postId} = useParams();
  const {
    comments,
    isLoading,
    isError,
    addComment,
    editComment,
    deleteComment,
    likeComment,
  } = useComment(postId);

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [replyingTo, setReplyingTo] = useState(null); 

  if (isLoading) return <p>댓글을 불러오는 중...</p>;
  if (isError) return <p>댓글을 불러오는 데 실패했습니다.</p>;

  const handleReplyClick = (parentCommentId, userName) => {
    console.log("Replying to comment ID:", parentCommentId);
    setReplyingTo({ parentCommentId, userName });
  };

  return (
    <>
      {comments
        .slice()
        .sort((a, b) => a.commentId - b.commentId)  // commentId로 오름차순 정렬
        .map((comment) => (
          <S.CommentListContainer key={comment.commentId}>
            <Comment
              comment={comment}
              onLike={() => likeComment(comment.commentId)}
              onEditClick={() => {
                setEditingCommentId(comment.commentId);
                setEditingContent(comment.comment);
              }}
              onDelete={() => deleteComment(comment.commentId)}
              onReplyClick={handleReplyClick} 
            />

            {comment.replies?.length > 0 && (
              <S.Replies>
                {comment.replies.map((reply) => (
                  <Reply
                    key={reply.commentId}
                    reply={reply}
                    onLike={() => likeComment(reply.commentId)}
                  />
                ))}
              </S.Replies>
            )}
          </S.CommentListContainer>
        ))}

        <CommentInput 
          onSubmit={(content) => {
            console.log("댓글 작성 요청:", { content, parentCommentId: replyingTo?.parentCommentId });
            addComment({ content, parentCommentId: replyingTo?.parentCommentId }); 
            setReplyingTo(null);
          }}
          content={editingContent}
          isEditing={editingCommentId !== null}
          onCancel={() => setEditingCommentId(null)}
          replyTo={replyingTo} 
        />

    </>
  );
};

export default CommentList;
