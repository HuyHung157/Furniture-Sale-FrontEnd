import { Observable, Subscription } from 'rxjs';

export class SubscriptionCollection {
  private subscriptionRefs: Subscription[] = [];

  public clear(): void {
    this.subscriptionRefs.forEach((s) => s.unsubscribe());
  }

  public add<T>(observable: Observable<T>, handler: (data: T) => void): void {
    const subscription: Subscription = observable.subscribe((data) => {
      handler(data);
    });
    this.subscriptionRefs.push(subscription);
  }

  public addItems(subscriptions: Subscription[]): void {
    this.subscriptionRefs.push(...subscriptions);
  }
}
