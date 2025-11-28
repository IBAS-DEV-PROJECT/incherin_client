import { api } from '../http';

// 서버 DTO 원본 반환
export const fetchUser = async id => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};

export const updateUser = async ({ id, payload }) => {
  const res = await api.patch(`/users/${id}`, payload);
  return res.data;
};
