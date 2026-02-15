import { useMutation } from '@tanstack/react-query';
import { useActor } from '../useActor';

export function useSubmitAdmission() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (data: { name: string; email: string; program: string; motivation: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitAdmissionRequest(data.name, data.email, data.program, data.motivation);
    },
  });
}
