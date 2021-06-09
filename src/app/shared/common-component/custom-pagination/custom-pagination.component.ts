import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { CustomPaginator } from './customPaginatorConfiguration';

@Component({
  selector: 'custom-pagination',
  templateUrl: './custom-pagination.component.html',
  styleUrls: ['./custom-pagination.component.scss'],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }
  ]
})
export class CustomPaginationComponent implements OnChanges {
  @Input()
  public length = 0;
  @Input()
  public pageIndex = 0;
  @Input()
  public pageSize = 50;
  @Input()
  public pageSizeOptions: number[];
  @Input()
  public pageNumberMaxBlockCount = 7; // Should be an ODD number, minimum should be 7

  @Output()
  public page: EventEmitter<PageEvent> = new EventEmitter();

  private readonly MINIMUM_BLOCK_COUNT = 7;

  public get maxPage(): number {
    return Math.ceil(this.length / this.pageSize);
  }

  public get pageNumbers(): number[] {
    const maxPage = this.maxPage;
    const maxBlock = this.pageNumberMaxBlockCount;
    const availableBlock = Math.min(maxBlock, maxPage);

    if (maxPage <= availableBlock) {
      return Array(availableBlock).fill(0).map((v, i) => i + 1);
    }

    const index = this.pageIndex + 1;
    const midCount = Math.floor(maxBlock / 2);
    let data = [];

    if (index < midCount || index > maxPage - midCount + 1) {
      data.push(null);
      for (let i = midCount; i > 0; i--) {
        data.unshift(i);
        data.push(maxPage - i + 1);
      }
    } else {
      data.push(index);
      for (let i = 1; data.length < maxBlock; i++) {
        data.unshift(index - i);
        data.push(index + i);
      }
      data = data.filter(v => v > 0 && v <= maxPage);
      if (data[0] === 1) {
        data = data.filter(v => v <= index + 1);
        data.push(null);
        for (let i = maxBlock - data.length - 1; i >= 0; i--) {
          data.push(maxPage - i);
        }
      } else if (data[data.length - 1] === maxPage) {
        data = data.filter(v => v >= index - 1);
        data.unshift(null);
        for (let i = maxBlock - data.length; i > 0; i--) {
          data.unshift(i);
        }
      } else {
        data.shift();
        data.shift();
        data.unshift(1, null);
        data.pop();
        data.pop();
        data.push(null, maxPage);
      }
    }
    return data;
  }

  public get isPreviousPageDisabled(): boolean {
    return this.pageIndex === 0;
  }

  public get isNextPageDisabled(): boolean {
    return this.pageIndex === this.maxPage - 1 || this.maxPage === 0;
  }

  public isPageNumberClickable(pageNumber: number): boolean {
    return pageNumber !== null && this.pageIndex !== pageNumber - 1;
  }

  public isPageNumberActive(pageNumber: number): boolean {
    return pageNumber !== null && this.pageIndex === pageNumber - 1;
  }

  public nextPage() {
    const pageEvent: PageEvent = {
      previousPageIndex: this.pageIndex,
      pageIndex: this.pageIndex + 1,
      pageSize: this.pageSize,
      length: this.length,
    };
    this.page.next(pageEvent);
  }

  public previousPage() {
    const pageEvent: PageEvent = {
      previousPageIndex: this.pageIndex,
      pageIndex: this.pageIndex - 1,
      pageSize: this.pageSize,
      length: this.length,
    };
    this.page.next(pageEvent);
  }

  public selectPage(pageNumber: number) {
    if (!this.isPageNumberClickable(pageNumber)) {
      return;
    }
    const pageEvent: PageEvent = {
      previousPageIndex: this.pageIndex,
      pageIndex: pageNumber - 1,
      pageSize: this.pageSize,
      length: this.length,
    };
    this.page.next(pageEvent);
  }

  public changePageOption(pageEvent: PageEvent) {
    pageEvent.pageIndex = this.pageIndex;
    pageEvent.previousPageIndex = this.pageIndex;
    pageEvent.length = this.length;
    this.page.next(pageEvent);
  }

  ngOnChanges(changes: SimpleChanges): void {
    let maxBlockCount = changes.pageNumberMaxBlockCount?.currentValue;
    if (!isNaN(maxBlockCount) && maxBlockCount > 0) {
      maxBlockCount = maxBlockCount % 2 ? maxBlockCount : maxBlockCount + 1;
      this.pageNumberMaxBlockCount = Math.max(this.MINIMUM_BLOCK_COUNT, maxBlockCount);
    }
  }
}
