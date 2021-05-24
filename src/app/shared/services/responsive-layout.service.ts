import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subscribable } from '../common-component/base-component/subscribable';

export enum Layouts {
  MOBILE,
  DESKTOP,
  DESKTOP_WIDE
}

const LayoutQueries = new Map<Layouts, string | string[]>([
  [Layouts.MOBILE, '(max-width: 768px)'],
  [Layouts.DESKTOP, ['(min-width: 767px)', '(max-width: 1279px)']],
  [Layouts.DESKTOP_WIDE, '(min-width: 1280px)']
]);

@Injectable({
  providedIn: 'root'
})
export class ResponsiveLayoutService extends Subscribable {
  private _currentLayout: BehaviorSubject<Layouts>;

  constructor(private breakpointObserver: BreakpointObserver) {
    super();
    this._currentLayout = new BehaviorSubject<Layouts>(Layouts.DESKTOP);
    this.initLayoutObservation();
  }

  private initLayoutObservation() {
    this.observeLayout(Layouts.MOBILE);
    this.observeLayout(Layouts.DESKTOP);
    this.observeLayout(Layouts.DESKTOP_WIDE);
  }

  private observeLayout(layout: Layouts) {
    this.subscribe(
      this.breakpointObserver.observe(LayoutQueries.get(layout)),
      result => {
        const matched =
          result.matches &&
          Object.values(result.breakpoints).every(
            breakpointMatched => breakpointMatched
          );
        if (matched) {
          this._currentLayout.next(layout);
        }
      }
    );
  }

  public getCurrentLayout(): Observable<Layouts> {
    return this._currentLayout.asObservable();
  }

  public isMobileLayout(): Observable<boolean> {
    return this._currentLayout
      .asObservable()
      .pipe(map(currentLayout => currentLayout === Layouts.MOBILE));
  }

  public isCommonDesktopLayout(): Observable<boolean> {
    return this.isMobileLayout().pipe(map(isMobile => !isMobile));
  }
}
