import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/utils/constants/api.constants';
import { RequestsTable } from '../../models/allocation/requests.response';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  constructor(private http: HttpClient) {}

  public getRequests(
    pageNumber: Number,
    pageSize: Number,
    searchKeyword: String
  ): Observable<RequestsTable> {
    const url = `${API.GET_ALL_REQUESTS}?page=${pageNumber}&per_page=${pageSize}&key=${searchKeyword}`;
    return this.http.get<RequestsTable>(url);
  }
}
