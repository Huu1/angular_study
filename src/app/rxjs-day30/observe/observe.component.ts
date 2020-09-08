import { Component, OnInit, ViewChildren, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Observable, of, interval, from, fromEvent, concat, merge } from 'rxjs';
import { map, filter, scan, take, takeUntil, concatMap, concatAll, skip, takeLast, startWith, combineLatest, zip, withLatestFrom } from 'rxjs/operators'
@Component({
  selector: 'app-observe',
  templateUrl: './observe.component.html',
  styleUrls: ['./observe.component.less']
})
export class ObserveComponent implements OnInit {

  constructor(private el: ElementRef, private rd2: Renderer2) { }

  div
  @ViewChild('video') video: ElementRef
  @ViewChild('anchor') anchor: ElementRef
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.init()
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
  init() {
    // 监听窗口滚动事件
    let scroll$ = fromEvent(document, 'scroll')
    scroll$.pipe(
      // 原件是否已经滚出窗口
      map(e => this.anchor.nativeElement.getBoundingClientRect().bottom < 0)
    )
      .subscribe(bool => {
        // 固定住原件  小窗
        if (bool) {
          this.video.nativeElement.classList.add('video-fixed');
        } else {
          this.video.nativeElement.classList.remove('video-fixed');
        }
      })


    let mouseDown$ = fromEvent(this.video.nativeElement, 'mousedown')
    let mouseMove$ = fromEvent(document, 'mousemove')
    let mouseUp$ = fromEvent(document, 'mouseup')

    mouseDown$.pipe(
      // 仅对小窗有效
      filter(e => this.video.nativeElement.classList.contains('video-fixed')),
      // 将对原件的鼠标按下事件转换成移动事件（拖拽） 直到鼠标松开为止
      map(e => mouseMove$.pipe(takeUntil(mouseUp$))),
      // 多个observable  摊平
      concatAll(),
      // 修复 闪动
      withLatestFrom(mouseDown$, (move: any, down: any) => {
        return {
          x: this.validValue(
            move.clientX - down.offsetX
            , window.innerWidth - this.video.nativeElement.offsetWidth,
            0
          ),
          y: this.validValue(
            move.clientY - down.offsetY
            , window.innerHeight - this.video.nativeElement.offsetHeight,
            0
          ),
        }
      })
    ).subscribe(res => {
      // 修改原件位置
      this.rd2.setStyle(this.video.nativeElement, 'top', `${res.y}px`)
      this.rd2.setStyle(this.video.nativeElement, 'left', `${res.x}px`)
    })
  }

  // 范围值 判定
  validValue(value, max, min) {
    return Math.min(Math.max(value, min), max)
  }
}
