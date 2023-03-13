import { User } from './user.interface';

export interface UserTable {
  data: User[];
  metadata: [
    {
      total: number;
      page: number;
      per_page: number;
    }
  ];
}
