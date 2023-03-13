import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { Allocation } from '../../core/models/allocation/allocation.interface';
import { RequestsTable } from '../../core/models/allocation/requests.response';
import { RequestsService } from '../../core/services/requests/requests.service';
import { itemsPerPage } from '../../utils/constants/constants';
import * as moment from 'moment';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})
export class RequestsComponent {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'location',
    'floor',
    'wing',
    'desk',
    'projectName',
    'description',
    'status',
    'priority',
    'requestedDate',
    'action',
  ];

  moment: any = moment;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Allocation> = new MatTableDataSource();
  pageSizes = itemsPerPage.PageSize;
  pageSize: number;
  totalData: number;
  pageIndex: number;
  searchKeyword: string = '';

  constructor(public reqService: RequestsService) {}

  getTableData(pageNumber: Number, pageSize: Number, searchKeyword: String) {
    return this.reqService.getRequests(pageNumber, pageSize, searchKeyword);
  }

  ngAfterViewInit() {
    this.fetchRequests(this.searchKeyword);
  }

  filterRequests(event: Event) {
    this.searchKeyword = (event.target as HTMLInputElement).value;
    this.fetchRequests(this.searchKeyword);
  }

  getServerData(event: any) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.fetchRequests(this.searchKeyword);
  }

  fetchRequests(searchKey: String) {
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
