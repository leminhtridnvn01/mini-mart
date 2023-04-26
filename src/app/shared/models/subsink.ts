const isFunction = (fn: any) => typeof fn === 'function';

export interface SubscriptionLike {
  unsubscribe(): void;
}

export class SubSink {
  protected subs: Array<SubscriptionLike> = [];

  add(...subscriptions: Array<SubscriptionLike>): void {
    this.subs = this.subs.concat(subscriptions);
  }

  set sink(subscription: SubscriptionLike) {
    this.subs.push(subscription);
  }

  unsubscribe(): void {
    this.subs.forEach(
      (sub) => sub && isFunction(sub.unsubscribe) && sub.unsubscribe()
    );
    this.subs = [];
  }
}
