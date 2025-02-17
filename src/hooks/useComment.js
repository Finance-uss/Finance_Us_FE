import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getComment, addComment, editComment, deleteComment, addLikeComment, getLikeComment } from "../api/apiComment";

const useComment = (postId) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComment(postId),
    select: (data) => data.result,
  });
  const commentCount = data?.commentCount || 0;
  const addCommentMutation = useMutation({
    mutationFn: ({ content, parentCommentId }) => addComment(postId, content, parentCommentId),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", postId]);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const editCommentMutation = useMutation({
    mutationFn: ({ commentId, content }) => editComment(commentId, content),
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

  const likeCommentMutation = useMutation({
    mutationFn: (commentId) => addLikeComment(commentId),
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
    likeComment: likeCommentMutation.mutate,
  };
};

export default useComment;
