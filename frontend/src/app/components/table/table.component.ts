import { Constructor } from '@angular/cdk/table';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() dataSource: any = '';
  @Input() displayedColumns: any = '';
  @Input() pageSizes: any = '';
  @Input() totalData: any = '';
  @Input() page: any = '';
}
