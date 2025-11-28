import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchUser } from '../../services/api/user';
import { mapUser } from '../../utils/mappers/user';

export const userKeys = {
  all: ['user'],
  detail: id => ['user', 'detail', id],
};

export const useUserQuery = (id, options = {}) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => fetchUser(id), // DTO 원본
    select: mapUser, // ✅ 변환 레이어 적용 지점
    placeholderData: keepPreviousData,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 1,
    ...options,
  });
};
