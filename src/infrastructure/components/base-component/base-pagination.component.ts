import { Directive, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { CommonConstant } from '../../../app/shared/constants/common.constant';

@Directive()
export abstract class BasePaginationComponent<T> implements OnInit {
  public isLoading = false;
  public firstLoad = false;

  public perPage = CommonConstant.PAGING_PAGE_SIZE;
  public total = 0;

  public dataSource = new MatTableDataSource<T>([]);
  public readonly pageSizeOptions: number[] = CommonConstant.PAGING_OPTIONS;

  public currentPage = 1;

  protected maxPage = 1;

  public ngOnInit(): void {
    this.reload();
  }

  // Reload page
  public reload() {
    this.currentPage = 1;
    this.total = 0;
    this.clear();
    this.loadData();
  }

  // Load data
  protected loadData(): void {
    this.isLoading = true;
    this.internalLoadData().subscribe((paginatedList: any) => {
      this.firstLoad = false;
      if (!paginatedList?.items || !paginatedList?.items?.length) {
        this.emptyResultHandler();
        return;
      }

      // Calculate page count
      this.maxPage = Math.floor((this.total + 10 - 1) / 10);
      this.total = paginatedList?.totalItems;

      this.dataSource.data = [...paginatedList?.items];

      this.afterLoadData();
      this.isLoading = false;
    });
  }

  // Handle mat-paginator change page event
  changePage(pageEvent: PageEvent) {
    this.currentPage = pageEvent.pageIndex + 1;
    this.perPage = pageEvent.pageSize;

    this.loadData();
  }

  protected abstract internalLoadData(): Observable<any>;

  protected afterLoadData() {
    // virtual method
    // Use for formatting data loaded
  }

  // Incase dataitems is empty
  protected emptyResultHandler() {
    this.dataSource.data = [];
    this.maxPage = this.currentPage;
    this.isLoading = false;
  }

  // Clear data source
  protected clear() {
    this.dataSource.data = [];
  }
}
