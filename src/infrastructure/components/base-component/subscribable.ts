import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { SubscriptionCollection } from './subscription-collection';

@Component({
  template: ''
})

export abstract class Subscribable implements OnDestroy {
  protected subscriptionCollection = new SubscriptionCollection();

  public ngOnDestroy(): void {
    this.subscriptionCollection.clear();
    this.onUnsubscribe();
  }

  protected subscribe<T>(
    observable: Observable<T>,
    handler: (data: T) => void
  ): void {
    this.subscriptionCollection.add(observable, handler);
  }

  protected subscribeOne<T>(
    observable: Observable<T>,
    handler: (data: T) => void
  ): void {
    observable.pipe(take(1)).subscribe((data) => handler(data));
  }

  protected addSubscription(...subscriptions: Array<Subscription>): void {
    this.subscriptionCollection.addItems(subscriptions);
  }

  protected onUnsubscribe(): void {
    // virtual method
  }
}
