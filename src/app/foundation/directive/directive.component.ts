import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directive',
  templateUrl: './directive.component.html',
  styleUrls: ['./directive.component.less']
})
export class DirectiveComponent implements OnInit {

  // 属性型指令测试
  // ng generate directive highlight

  constructor() { }

  ngOnInit(): void {
  }
  color:string

}
