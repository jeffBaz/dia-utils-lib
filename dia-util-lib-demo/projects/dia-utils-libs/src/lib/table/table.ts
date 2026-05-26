import {
  Component,
  OnInit,
  Input,
  OnChanges,
  AfterViewInit,
  ViewChild,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageEvent, MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ITableState } from '../common/ITableState';
import { ITableColumnDefinitionModel } from '../common/ITableColumnDefinitionModel';

@Component({
  selector: 'dia-table',
  standalone: true,
  templateUrl: './table.html',
  styleUrls: ['./table.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class Table implements OnChanges, OnInit, AfterViewInit {
  @Input()
  source: any[] = [];
  @Input()
  pageSize = 10;
  @Input()
  selected: ((row?: any) => boolean) | undefined;
  @Input()
  noPagination = false;
  @Input()
  loading = false;
  @Input()
  dynamicColumns: ITableColumnDefinitionModel[] = [];
  @Input()
  filterValue: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Output()
  rowClicked = new EventEmitter<any>();
  @Output()
  rowDblClicked = new EventEmitter<any>();
  @Output()
  sourceChange = new EventEmitter<any>();
  @Output()
  paginationChanged = new EventEmitter<ITableState>();
  @Output()
  sortChanged = new EventEmitter<ITableState>();
  @Input()
  isTitleOnTop = false;
  @Input()
  requestCount = 0;
  @Input()
  isElasticSearch = false;
  @Input()
  trServ: any;
  @Input()
  tdTemplate: any;

  titleOnTop = '';
  public dataIsReady = false;
  public colsDefIsReady = false;
  public pageEvent!: PageEvent;
  public displayedColumns: string[] = [];
  public datasource = new MatTableDataSource<any>([]);

  constructor() {}

  ngOnInit() {
    // We register event listeners after view gets initialized to avoid early resolution issues
  }

  ngAfterViewInit() {
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;

    if (this.paginator) {
      this.paginator.page.subscribe(_ => this.paginationChanged.emit(this.getCurrentState()));
    }
    if (this.sort) {
      this.sort.sortChange.subscribe(_ => this.sortChanged.emit(this.getCurrentState()));
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['filterValue'] &&
      changes['filterValue'].currentValue !== undefined &&
      changes['filterValue'].currentValue !== changes['filterValue'].previousValue
    ) {
      if (this.datasource.data.length > 0) {
        this.datasource.filter = JSON.stringify(this.filterValue);
      }
    }

    if (changes['source'] && changes['source'].currentValue !== undefined && !this.isElasticSearch) {
      if (this.paginator) {
        this.paginator.length = this.datasource.data.length;
        this.paginator.pageIndex = 0;
      }
      this.datasource.paginator = this.paginator;

      if (
        this.datasource.paginator &&
        this.datasource.paginator.pageIndex >= this.getA(this.source).length / 10
      ) {
        this.datasource.paginator.pageIndex = 0;
      }
      this.dataIsReady = true;
      this.datasource = new MatTableDataSource(this.getA(this.source));
      if (this.filterValue) {
        this.updateFilterPredicate();
      }
      setTimeout(() => {
        this.datasource.paginator = this.paginator;
      }, 0);
    } else if (changes['source'] && changes['source'].currentValue !== undefined && this.isElasticSearch) {
      if (this.paginator) {
        this.paginator.length = this.requestCount;
      }
      this.datasource = new MatTableDataSource(this.getA(this.source).slice(0, 100));
    }

    if (changes['dynamicColumns'] && changes['dynamicColumns'].currentValue) {
      this.colsDefIsReady = true;
      this.displayedColumns = this.dynamicColumns
        .filter(it => !it.hide)
        .map(row => row.columnDef || '');
    }

    if (changes['isTitleOnTop'] && changes['isTitleOnTop'].currentValue) {
      if (this.isTitleOnTop) {
        this.titleOnTop = 'titleUpperTable';
      } else {
        this.titleOnTop = '';
      }
    }
  }

  gets(obs: any): any {
    if (obs) {
      return obs;
    } else {
      return {};
    }
  }

  getA(obs: any): any[] {
    if (obs) {
      return obs;
    } else {
      return [];
    }
  }

  updateFilterPredicate() {
    this.datasource.filterPredicate = (data: any, filtersJson: string) => {
      const matchFilter: boolean[] = [];
      const filters = this.filterValue;
      if (!Array.isArray(filters)) {
        return true;
      }
      filters.forEach((filter: any) => {
        if (filter.id === 'all') {
          const val = JSON.stringify(data);
          matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase().trim()));
        } else {
          const val = data[filter.id] === null || data[filter.id] === undefined ? '' : String(data[filter.id]);
          matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase().trim()));
        }
      });
      return matchFilter.every(Boolean);
    };
  }

  filterdishit(data: any, filter: string): boolean {
    if (data !== undefined && data !== null) {
      if (typeof data === 'string') {
        return data.indexOf(filter) !== -1;
      }
      if (typeof data === 'number') {
        const flag = (data + '').indexOf(filter) !== -1;
        try {
          const date = new Date(data);
          const day = date.getDate();
          const monthIndex = date.getMonth();
          const year = date.getFullYear();
          const minutes = date.getMinutes();
          const hours = date.getHours();
          const seconds = date.getSeconds();
          const myFormattedDate =
            day +
            '/' +
            (monthIndex + 1) +
            '/' +
            year +
            ' ' +
            hours +
            ':' +
            minutes +
            ':' +
            seconds;
          return myFormattedDate === '1/1/1970 1:1:52'
            ? flag
            : myFormattedDate.indexOf(filter) !== -1;
        } catch {
          return flag;
        }
      }
    }
    return false;
  }

  getClass(arr: string[]) {
    return arr.join(' ') + ' ' + this.titleOnTop;
  }

  _onRowClicked(row: any) {
    this.rowClicked.emit(row);
  }

  _onRowDblClicked(row: any) {
    this.rowDblClicked.emit(row);
  }

  oncellclick(column: ITableColumnDefinitionModel, row: any) {
    if (column && column.onclick) {
      column.onclick(row);
    }
  }

  oncheckclick(column: ITableColumnDefinitionModel, row: any) {
    if (column && column.checkbox) {
      column.checkbox(row);
    }
  }

  itemBeenRead(item: any) {
    if (item) {
      item.new = false;
    }
  }

  mapTimestampToDate(timestamp: number): string | null {
    if (timestamp) {
      const dateObject = new Date(+timestamp);
      return (
        (dateObject.getDate() < 10
          ? '0' + dateObject.getDate()
          : dateObject.getDate()) +
        '/' +
        (dateObject.getMonth() + 1 < 10
          ? '0' + (dateObject.getMonth() + 1)
          : dateObject.getMonth() + 1) +
        '/' +
        (dateObject.getFullYear() + '').slice(-2)
      );
    }
    return null;
  }

  mapTimestampToTime(timestamp: number): string | undefined {
    if (timestamp) {
      const dateObject = new Date(+timestamp);
      return (
        (dateObject.getHours() < 10
          ? '0' + dateObject.getHours()
          : dateObject.getHours()) +
        ':' +
        (dateObject.getMinutes() < 10
          ? '0' + dateObject.getMinutes()
          : dateObject.getMinutes())
      );
    }
    return undefined;
  }

  getColumnValue(column: ITableColumnDefinitionModel, row: any) {
    if (!column.cell) {
      return '';
    }
    let val = column.cell(row);
    if (val === undefined || val === null) {
      return val === 0 ? val : '';
    }
    if (column.date) {
      val = this.mapTimestampToDate(column.cell(row));
    }
    if (column.time) {
      if (column.date) {
        const timeSeparator = (this.trServ && typeof this.trServ.instant === 'function')
          ? this.trServ.instant('TIME_SEPARATOR')
          : ' ';
        val += timeSeparator + this.mapTimestampToTime(column.cell(row));
      } else {
        val = this.mapTimestampToTime(column.cell(row));
      }
    }
    if (val === undefined || val === null) {
      return '--';
    }
    return val;
  }

  compareFunction(a: string, b: string) {
    a = a ? a : '';
    b = b ? b : '';
    if (!isNaN(+a) && !isNaN(+b)) {
      return +a < +b ? -1 : 1;
    }
    return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
  }

  compare(a: string, b: string, d: string) {
    return this.compareFunction(a, b) * (d === 'asc' ? 1 : -1);
  }

  string2number(int: any): number {
    if (typeof int === 'number') {
      return int;
    }
    if (typeof int === 'string') {
      const processed = int.replace(/ /g, '');
      return parseFloat(processed);
    }
    return 0;
  }

  compareNumber(a: any, b: any, d: string) {
    return (
      (this.string2number(a) < this.string2number(b) ? -1 : 1) *
      (d === 'asc' ? 1 : -1)
    );
  }

  sortData(sort: Sort) {
    const data = this.datasource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.datasource.data = data;
      return;
    }

    this.datasource.data = data.sort((a, b) => {
      if (a.numeroFL && b.numeroFL) {
        if (a.numeroFL < b.numeroFL) {
          return -1;
        } else if (a.numeroFL > b.numeroFL) {
          return 1;
        }
      }
      return 0;
    });

    for (const element of this.dynamicColumns) {
      if (sort.active === element.columnDef) {
        if (element.isNumeric) {
          this.datasource.data = data.sort((a, b) => {
            return this.compareNumber(
              element.cell ? element.cell(a) : 0,
              element.cell ? element.cell(b) : 0,
              sort.direction
            );
          });
        } else if (element.specificSort) {
          this.datasource.data = data.sort((a, b) => {
            return element.specificSort!(
              element.cell ? element.cell(a) : null,
              element.cell ? element.cell(b) : null,
              sort.direction
            );
          });
        } else {
          this.datasource.data = data.sort((a, b) => {
            return this.compare(
              element.cell ? String(element.cell(a)) : '',
              element.cell ? String(element.cell(b)) : '',
              sort.direction
            );
          });
        }
        break;
      }
    }
  }

  getCurrentState() {
    return {
      page: this.paginator ? this.paginator.pageIndex : 0,
      size: this.paginator ? this.paginator.pageSize : this.pageSize,
      orderBy: this.sort ? this.sort.active : undefined,
      asc: this.sort ? this.sort.direction === 'asc' : undefined,
    } as ITableState;
  }
}
