import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class MessageService {

  private subject = new Subject<any>();

  sendMessage(message: any): void {
    this.subject.next( { ded: message});
  }
  /*sendMessage2(request: any): void {
    this.subject.next({inf: request});
  }*/

  clearMessage(): void {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

}
