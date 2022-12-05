import { User } from 'models/users/user.class';
import api from './api';
import EntitiesService from './entities.service';

export default class UsersService extends EntitiesService<User> {
  get endpoint() {
    return '/users';
  }

  async updateUserAvatar(file: File) {
    const formData = new FormData();

    formData.append('file', file as Blob, file?.name);

    const response = await api.post<User>(`${this.endpoint}/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async deleteAvatar() {
    const response = await api.delete(`${this.endpoint}/avatar`);
    return response.data;
  }

  async updateUser(user: User) {
    const response = await api.patch<User>(`${this.endpoint}/${user.id}`, user);
    return response.data;
  }
}
