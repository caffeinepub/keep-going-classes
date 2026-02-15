import { useQuery } from '@tanstack/react-query';
import { useActor } from '../useActor';
import type { Article } from '../../backend';

export function usePublishedArticles() {
  const { actor, isFetching } = useActor();

  return useQuery<Article[]>({
    queryKey: ['publishedArticles'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPublishedArticles();
    },
    enabled: !!actor && !isFetching,
  });
}
