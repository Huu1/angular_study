import { Component, OnInit } from '@angular/core';

export interface Route{
  link:string,
  title:string
}

@Component({
  selector: 'app-home-continer',
  templateUrl: './home-continer.component.html',
  styleUrls: ['./home-continer.component.less']
})
export class HomeContinerComponent implements OnInit {

  constructor() { }

  routes:Route[]=[
    {
      link:'/heroes',
      title:'我的英雄'
    }
  ]
  ngOnInit(): void {
  }

}
