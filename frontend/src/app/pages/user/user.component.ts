import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { User } from '../../core/models/user/user.interface';
import { UserTable } from '../../core/models/user/user.response';
import { UserService } from '../../core/services/user/user.service';
import { itemsPerPage } from '../../utils/constants/constants';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'userName',
    'email',
    'role',
  ];

  // displayedColumns: any = [
  //   { title: 'First Name', field: 'firstName' },
  //   { title: 'Last Name', field: 'lastName' },
  //   { title: 'User Name', field: 'userName' },
  //   { title: 'Email', field: 'email' },
  //   { title: 'Role', field: 'role' },
  // ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<User>();
  pageSizes = itemsPerPage.PageSize;
  pageSize: number;
  totalData: number;
  pageIndex: number;
  UsrData: User[];
  searchKeyword: string = '';

  constructor(public usrService: UserService) {}

  getTableData(pageNumber: Number, pageSize: Number, searchKey: String) {
    return this.usrService.getUsers(pageNumber, pageSize, searchKey);
  }

  ngAfterViewInit() {
    this.fetchUsers(this.searchKeyword);
  }

  filterUser(event: Event) {
    this.searchKeyword = (event.target as HTMLInputElement).value;
    this.fetchUsers(this.searchKeyword);
  }

  getServerData(event: any) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.fetchUsers(this.searchKeyword);
  }

  fetchUsers(searchKey: String) {
    this.dataSource.paginator = this.paginator;
    this.getTableData(
      this.paginator.pageIndex + 1,
      this.paginator.pageSize,
      searchKey
    ).subscribe((data: any) => {
      this.dataSource = data?.data;
      this.pageIndex = data?.metadata[0]?.page - 1;
      this.pageSize = data?.metadata[0]?.per_page;
      this.totalData = data?.metadata[0]?.total;
    });
  }
}
