import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../useActor';
import type { AdmissionRequest } from '../../backend';

export function useAdmissionRequests() {
  const { actor, isFetching } = useActor();

  return useQuery<AdmissionRequest[]>({
    queryKey: ['admissionRequests'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAdmissionRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDeleteAdmissionRequest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteAdmissionRequest(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admissionRequests'] });
    },
  });
}
