import { Project } from "./project.interface";

export interface ProjectTable {
  data: Project[];
  metadata: [
    {
      total: number;
      page: number;
      per_page: number;
    }
  ];
}

export interface RemoveProject {
  meta: {
    msg: string;
  };
}
