import { Subject } from 'rxjs';
import { IActionDispatcherBaseData } from './action-dispatcher-base-data.model';

export abstract class ActionDispatcherBase<TActionType> {
  private emitter = new Subject<IActionDispatcherBaseData<TActionType>>();

  signal = this.emitter.asObservable();

  send(action: TActionType, payload?: any) {
    this.emitter.next({ action, payload });
  }
}
