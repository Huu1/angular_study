import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  public index$ = new BehaviorSubject(0)
  public setIndex(state: number) {
    this.index$.next(state)
  }
  public city$ = new BehaviorSubject(0)
  public setCity(state: number) {
    this.city$.next(state)
  }
  public check$ = new BehaviorSubject(0)
  public setCheck(state: number) {
    this.check$.next(state)
  }
  public currentIndex: number = 1
  public checkValue=[]
  constructor() { }
}
