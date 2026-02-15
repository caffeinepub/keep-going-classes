import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../useActor';
import type { Article } from '../../backend';

export function useAllArticles() {
  const { actor, isFetching } = useActor();

  return useQuery<Article[]>({
    queryKey: ['allArticles'],
    queryFn: async () => {
      if (!actor) return [];
      const published = await actor.getAllPublishedArticles();
      return published;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateArticle() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { title: string; content: string; author: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createArticle(data.title, data.content, data.author);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allArticles'] });
      queryClient.invalidateQueries({ queryKey: ['publishedArticles'] });
    },
  });
}

export function useUpdateArticle() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: bigint; title: string; content: string; author: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateArticle(data.id, data.title, data.content, data.author);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allArticles'] });
      queryClient.invalidateQueries({ queryKey: ['publishedArticles'] });
    },
  });
}

export function useDeleteArticle() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteArticle(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allArticles'] });
      queryClient.invalidateQueries({ queryKey: ['publishedArticles'] });
    },
  });
}

export function useSetArticlePublished() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: bigint; published: boolean }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.setArticlePublished(data.id, data.published);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allArticles'] });
      queryClient.invalidateQueries({ queryKey: ['publishedArticles'] });
    },
  });
}
