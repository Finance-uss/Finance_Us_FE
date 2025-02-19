import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getComment, addComment, editComment, deleteComment, addLikeComment } from "../Comment/commentAPI";

const useComment = (postId) => {
  const queryClient = useQueryClient(); 

  const { data, isLoading, isError } = useQuery({
    queryKey: ["comments", postId], 
    queryFn: () => getComment(postId),
    select: (data) => data.result,
  });
  const commentCount = data?.commentCount || 0;     
  const addCommentMutation = useMutation({
    mutationFn: ({ content, parentCommentId = null }) =>
      addComment(postId, content, parentCommentId), 
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", postId]); 
    },
    onError: (error) => {
      console.error("댓글 추가 오류:", error);
    },
  });
  
  const editCommentMutation = useMutation({
    mutationFn: ({ commentId, content }) => {
      return editComment(commentId, content); 
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", postId]);
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", postId]); 
    },
  });
 

  return {
    comments: data?.commentsList || [],
    commentCount,
    isLoading,
    isError,
    addComment: addCommentMutation.mutate, 
    editComment: editCommentMutation.mutate,
    deleteComment: deleteCommentMutation.mutate,
  };
};

export default useComment;
