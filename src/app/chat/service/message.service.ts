import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Message, Thread, User } from "./models";
import { filter, scan, publishReplay, refCount, map } from 'rxjs/operators';

// messages的初始值
let initialMessages: Message[] = [];

interface IMessageOperation extends Function {
  (messages: Message[]): Message[];
}
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  // 一个subject 用来发出单个的message对象 且每条只发一次
  newMessages: Subject<Message> = new Subject<Message>();

  // newMessages发出单个的对象 而 messages发出一组message对象
  messages: Observable<Message[]>;

  create: Subject<Message> = new Subject<Message>();

  updates: Subject<any> = new Subject<any>()

  constructor() {
    this.messages = this.updates.pipe(
      scan((messages: Message[], operation: IMessageOperation) => {
        return operation(messages)
      }, initialMessages),
      publishReplay(1),
      refCount()
    )

    this.create.pipe(
      map((message: Message): IMessageOperation => {
        return (messages: Message[]) => {
          return messages.concat(message)
        }
      })
    )
  }

  public addMessage(message: Message): void {
    this.newMessages.next(message)
  }

  messagesForThreadUser(thread: Thread, user: User): Observable<Message> {
    return this.newMessages
      .pipe(
        filter((message: Message) => {
          //筛选条件为 这个thread中其他user的信息
          return (message.thread.id === thread.id) && (message.author.id !== user.id)
        })
      )
  }



}
