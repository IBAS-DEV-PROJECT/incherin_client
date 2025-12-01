import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '@shared/api/user';
import { userKeys } from '../queries/useUserQuery';

export const useUserMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateUser, // ({ id, payload })
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: userKeys.detail(variables.id) });
    },
  });
};
