import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

interface Item {
  routeLink: string,
  title: string,
  id: number
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  items= [
    {
      routeLink: 'heroes',
      id: 1,
      title: '英雄列表'
    },
    {
      routeLink: 'test1',
      id: 2,
      title: '测试1'
    },
  ]
  ngOnInit(): void {
  }
  goMoudle(val): void {
    this.router.navigate([val]);
  }
}
