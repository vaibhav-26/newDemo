import { Allocation } from './allocation.interface';

export interface RequestsTable {
  data: Allocation[];
  metadata: [
    {
      total: number;
      page: number;
      per_page: number;
    }
  ];
}
