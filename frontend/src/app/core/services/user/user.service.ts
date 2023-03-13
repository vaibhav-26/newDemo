import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/utils/constants/api.constants';
import { UserTable } from '../../models/user/user.response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public getUsers(
    pageNumber: Number,
    pageSize: Number,
    searchKeyword: String
  ): Observable<UserTable> {
    const url = `${API.GET_ALL_USERS}?page=${pageNumber}&per_page=${pageSize}&key=${searchKeyword}`;
    return this.http.get<UserTable>(url);
  }

  public Login(body: any) {
    const url = API.LOGIN;
    return this.http.post(url, body);
  }

  public VerifyOtp(body: any) {
    const url = API.VERIFYOTP;
    return this.http.post(url, body);
  }

  public resetPassword(body: any) {
    console.log(body);
    const url = API.FORGETPASSWORD;
    return this.http.post(url, body);
  }
}
