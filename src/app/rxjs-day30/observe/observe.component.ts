import { Component, OnInit } from '@angular/core';
import { Observable, of ,interval} from 'rxjs';
import { map, filter, scan ,} from 'rxjs/operators'
@Component({
  selector: 'app-observe',
  templateUrl: './observe.component.html',
  styleUrls: ['./observe.component.less']
})
export class ObserveComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let ob = interval(1000)
    // console.log('start');

    ob.subscribe(res => {
      console.log(res);
    })
    // console.log('end');
    // let newOb = this._map(ob, item => {
    //   item + 'hello'
    // })
    // newOb.subscribe(console.log)

  }
  _map(soucrce, callback) {
    return Observable.create(observer => {
      return soucrce.subscribe(value => {
        try {
          observer.next(callback(value))
        } catch (error) {
          observer.error(error)
        }
      },
        err => { observer.error(err) },
        () => { observer.complete() })
    })
  }

}
