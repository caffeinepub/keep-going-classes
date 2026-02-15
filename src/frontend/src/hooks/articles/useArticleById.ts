import { useQuery } from '@tanstack/react-query';
import { useActor } from '../useActor';
import type { Article } from '../../backend';

export function useArticleById(id: bigint) {
  const { actor, isFetching } = useActor();

  return useQuery<Article>({
    queryKey: ['article', id.toString()],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getArticleById(id);
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}
