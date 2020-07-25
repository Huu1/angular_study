import { Component, OnInit, } from '@angular/core';

import { MapService } from '../map.service';

@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.less']
})
export class MapContainerComponent implements OnInit {

  constructor(public mapService: MapService) { }

  ngOnInit(): void {
  }

  checkOptionsOne = [
    { label: '2G', value: 2, checked: true },
    { label: '3G', value: 3, checked: true },
    { label: '4G', value: 4, checked: true }
  ]
  log(e) {
    let arr = []
    e.forEach(item => {
      if (item.checked) {
        arr.push(item.value)
      }
    })
    console.log(e);
    console.log(arr);
    this.mapService.checkValue = arr
    this.mapService.setCheck(1)
  }
  switch(e) {
    this.mapService.currentIndex = e
    this.mapService.setIndex(e)
  }
  checkCity(e) {
    this.mapService.setCity(e)
  }
  checkVal() {
    // this.mapService.setCheck(1)
  }
}
