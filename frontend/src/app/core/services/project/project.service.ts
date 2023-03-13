import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API } from "src/app/utils/constants/api.constants";
import { Project } from "../../models/project/project.interface";
import { ProjectTable } from "../../models/project/project.response";

@Injectable({
  providedIn: "root",
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  public getProjects(
    pageNumber: Number,
    pageSize: Number,
    searchKeyword: String
  ): Observable<ProjectTable> {
    const url = `${API.PROJECT.GET_ALL_PROJECTS}?page=${pageNumber}&per_page=${pageSize}&key=${searchKeyword}`;
    return this.http.get<ProjectTable>(url);
  }

  public removeProject(id: string) {
    const url = `${API.PROJECT.REMOVE_PROJECT}`;
    return this.http.delete(url, { body: { id } });
  }
}
