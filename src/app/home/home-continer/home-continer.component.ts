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
    },
    {
      link:'/DirectiveTest',
      title:'属性型指令测试'
    },
    {
      link:'/mapTest',
      title:'地图测试'
    },
    {
      link:'/formTest',
      title:'表单测试'
    },
    {
      link:'/tableTest',
      title:'表格测试'
    },
  ]
  ngOnInit(): void {
  }

}
