import { Component, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { MapService } from '../map.service';
import { Expression } from '@angular/compiler';
@Component({
  selector: 'app-map-insantance',
  templateUrl: './map-insantance.component.html',
  styleUrls: ['./map-insantance.component.less']
})
export class MapInsantanceComponent implements OnInit {

  constructor(public mapService: MapService) { }
  map
  sData = {
    "type": "FeatureCollection",
    "features": [{
      "type": "Feature",
      "properties": {
        "description": "<strong>Make it Mount Pleasant</strong><p>Make it Mount Pleasant is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>",
        "icon": "theatre",
        "value": 2
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-77.038659, 38.931567]
      }
    }, {
      "type": "Feature",
      "properties": {
        "description": "<strong>Seersucker Bike Ride and Social</strong><p>Feeling dandy? Get fancy, grab your bike, and take part in this year's Seersucker Social bike ride from Dandies and Quaintrelles. After the ride enjoy a lawn party at Hillwood with jazz, cocktails, paper hat-making, and more. 11:00-7:00 p.m.</p>",
        "icon": "bicycle",
        "value": 4
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-77.003168, 38.943951]
      }
    }, {
      "type": "Feature",
      "properties": {
        "description": "<strong>Capital Pride Parade</strong><p>The annual Capital Pride Parade makes its way through Dupont this Saturday. 4:30 p.m. Free.</p>",
        "icon": "bicycle",
        "value": 4
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-77.043444, 38.909664]
      }
    },]
  }
  sData2 = {
    "type": "FeatureCollection",
    "features": [{
      "type": "Feature",
      "properties": {
        "description": "<strong>Capital Pride Parade</strong><p>The annual Capital Pride Parade makes its way through Dupont this Saturday. 4:30 p.m. Free.</p>",
        "icon": "theatre",
        "value": 2
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-77.031706, 38.914581]
      }
    }, {
      "type": "Feature",
      "properties": {
        "description": "<strong>A Little Night Music</strong><p>The Arlington Players' production of Stephen Sondheim's <em>A Little Night Music</em> comes to the Kogod Cradle at The Mead Center for American Theater (1101 6th Street SW) this weekend and next. 8:00 p.m.</p>",
        "icon": "music",
        "value": 3
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-77.020945, 38.878241]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "description": "<strong>Seersucker Bike Ride and Social</strong><p>Feeling dandy? Get fancy, grab your bike, and take part in this year's Seersucker Social bike ride from Dandies and Quaintrelles. After the ride enjoy a lawn party at Hillwood with jazz, cocktails, paper hat-making, and more. 11:00-7:00 p.m.</p>",
        "icon": "bicycle",
        "value": 4
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-77.052477, 38.943951]
      }
    }]
  }
  // 过滤条件
  public fillColor(expression) {
    return [
      'match',
      ['get', expression],
      1, 'blue',
      2, 'skyblue',
      '#000' // 默认值
    ];
  }
  ngOnInit(): void {
    // this.mapService.currentIndex=1
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2Vla2VyeHUiLCJhIjoiY2pyMWdzMmdwMG9pYzN5b3hoZnRyZTZieCJ9.rwJxZqZEjpCWiCj9-ICNhA';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-100.486052, 37.830348],
      zoom: 2
    });
    this.map.on('load', () => {
      // 地图加载成功后 获取一个默认城市数据
      this.getData(1)
      this.getStationData(1)
    });
    // 地图图层切换
    this.mapService.index$.subscribe(e => {
      // e 城市代码
      if (!this.map.isStyleLoaded()) {
        alert('加载中')
        return
      }
      // 获取选中城市的所有source 
      let arr = []
      arr = this.map.getStyle().layers.filter(item => {
        if (item.source) {
          if (item.source.includes('states') || item.source.includes('station')) {
            return item
          }
        }
      })
      // 隐藏/显示图层  根据图层id最后一位 
      switch (e) {
        case 1:
          this.checkIndex(arr, e)
          break;
        case 2:
          this.checkIndex(arr, e)
          break;
        case 3:
          this.checkIndex(arr, e)
          break;
        case 9:
          this.checkIndex(arr, e)
        default:

          break;
      }
    })
    // 城市切换
    this.mapService.city$.subscribe(e => {
      if (e == 0) return
      if (e == 1) {
        this.checkCity(e)
      }
      if (e == 2) {
        this.checkCity(e)
      }
    })
    // 站点下 2、3G工参选择
    this.mapService.check$.subscribe(e => {
      // 初次进入 退出
      if (e == 0) return
      // 获取当前选中城市的的站点图层
      let arr = this.map.getStyle().layers.filter(item => {
        if (item.source) {
          return item.source.includes('stations')
        }
      })
      // 根据选中数据 筛选
      if (this.mapService.checkValue && this.mapService.checkValue.length == 0) {
        // 筛选条件为空时 ，随便给个100，防止报错  
        this.checkValue(arr, [100])
      } else {
        // 设置筛选条件
        this.checkValue(arr, this.mapService.checkValue)
      }
    })
  }
  checkIndex(arr, code) {
    arr.forEach(item => {
      let lastCode = item.id.charAt(item.id.length - 1)
      if (lastCode != code) {
        this.map.setLayoutProperty(item.id, 'visibility', 'none');
      } else {
        this.map.setLayoutProperty(item.id, 'visibility', 'visible');
      }
    })
  }
  checkCity(e) {
    // 这里站点和其余图层分开处理     currentIndex：9  为站点
    if (this.mapService.currentIndex != 9) {
      // 当前城市source存在
      if (this.map.getSource(`states_${e}`)) {
        // 遍历当前城市所有图层
        for (let i = 1; i < 4; i++) {
          // 全部移除
          this.map.removeLayer(`state${e}${i}`)
        }
        // 移除当前城市source  
        // ps：source可以不移除 但是没又找到更好的条件，判断当前城市图层隐藏还是显示
        this.map.removeSource(`states_${e}`)

      } else { //当前城市图层不存在
        // 数当前城市据是否存在
        if (this[`data${e}`]) {
          // 直接添加scource 和图层
          this.layerAdd(e)
        } else {
          // 获取当前城市的数据
          this.getData(e)
        }
      }
      // 这里是站点的处理
    } else {
      // 同上 找当前source 并移除所有图层
      if (this.map.getSource(`stations_${e}`)) {
        let arr = this.map.getStyle().layers.filter(item => {
          // source名称包括stations 为站点的
          if (item.source && item.source.includes(`stations_${e}`)) {
            return item
          }
        })
        arr.forEach(item => {
          this.map.removeLayer(item.id)
        });
        this.map.removeSource(`stations_${e}`)
      } else {
        if (this[`stationData${e}`]) {
          this.layerStationAdd(e)
        } else {
          this.getStationData(e)
        }
      }
    }
  }
  checkValue(arr, dataList) {
    arr.forEach(item => {
      this.map.setFilter(item.id, ["match",
        [
          "get",
          "value"
        ],
        dataList,
        true,
        false])
    });
  }
  getData(pro) {
    setTimeout(() => {
      pro == 1 ? this[`data${pro}`] = {
        "type": "FeatureCollection",
        "features": [{
          "type": "Feature",
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [-80.519, 40.6388],
                [-80.5191, 40.5902],
                [-80.5191, 39.958],
                [-80.5193, 39.7214],
                [-79.4767, 39.7211],
                [-79.4869, 39.2059],
                [-79.2144, 39.3634],
                [-79.0911, 39.4725],
                [-78.9568, 39.4402],
                [-78.7967, 39.6056],
                [-78.6547, 39.5346],
                [-78.4733, 39.5159],
                [-78.397, 39.6165],
                [-78.2666, 39.6189],
                [-78.1719, 39.6957],
                [-77.8786, 39.5634],
                [-77.7359, 39.3913],
                [-77.7195, 39.3213],
                [-77.8283, 39.1325],
                [-78.347, 39.466],
                [-78.3404, 39.3536],
                [-78.4194, 39.2575],
                [-78.4039, 39.1677],
                [-78.6805, 38.9253],
                [-78.788, 38.8851],
                [-78.8693, 38.763],
                [-78.994, 38.8501],
                [-79.2106, 38.4929],
                [-79.3127, 38.412],
                [-79.4998, 38.4977],
                [-79.6491, 38.5915],
                [-79.6897, 38.4315],
                [-79.7889, 38.2687],
                [-79.9163, 38.1864],
                [-80.0091, 37.9907],
                [-80.1622, 37.8751],
                [-80.2961, 37.6917],
                [-80.2589, 37.5955],
                [-80.2998, 37.5083],
                [-80.4756, 37.423],
                [-80.552, 37.4736],
                [-80.9005, 37.315],
                [-81.2251, 37.2349],
                [-81.3627, 37.3381],
                [-81.5613, 37.2066],
                [-81.6782, 37.2015],
                [-81.8535, 37.2877],
                [-81.9966, 37.4767],
                [-81.968, 37.538],
                [-82.1341, 37.5536],
                [-82.3017, 37.6808],
                [-82.3406, 37.786],
                [-82.5022, 37.9331],
                [-82.5494, 38.0686],
                [-82.6366, 38.138],
                [-82.5745, 38.2645],
                [-82.5935, 38.4218],
                [-82.324, 38.4493],
                [-82.2935, 38.5754],
                [-82.1727, 38.6297],
                [-82.2173, 38.7957],
                [-82.1442, 38.8419],
                [-82.0902, 38.9753],
                [-82.006, 39.0294],
                [-81.8445, 38.9288],
                [-81.764, 39.0142],
                [-81.7564, 39.1776],
                [-81.6834, 39.2711],
                [-81.4561, 39.4093],
                [-81.3449, 39.3468],
                [-81.2214, 39.3862],
                [-81.0236, 39.5526],
                [-80.8804, 39.6207],
                [-80.8702, 39.7631],
                [-80.7401, 39.9708],
                [-80.7373, 40.0801],
                [-80.5999, 40.3177],
                [-80.5992, 40.4826],
                [-80.664, 40.5903],
                [-80.519, 40.6388]
              ]
            ]
          },
          "properties": {
            "STATE_ID": 1,
            "user": 1,
            "flow": 2,
            "STATE_NAME": "West Virginia",
            'title1': "用户数 1500",
            'title2': "流量 1500",
            'title3': "收入 200",
          },
          "id": 1
        }, {
          "type": "Feature",
          "geometry": {
            "type": "MultiPolygon",
            "coordinates": [[[-90.6428, 42.5085], [-90.0737, 42.5083], [-88.7693, 42.4919], [-87.8032, 42.4926], [-87.0199, 42.4935], [-87.2078, 41.761], [-87.5237, 41.7599], [-87.5263, 40.492], [-87.5316, 39.3479], [-87.5857, 39.2004], [-87.6587, 39.136], [-87.5134, 38.956], [-87.4959, 38.7854], [-87.7562, 38.4625], [-87.8335, 38.3196], [-87.985, 38.228], [-88.037, 37.9563], [-88.095, 37.8937], [-88.028, 37.7992], [-88.1572, 37.6333], [-88.082, 37.4728], [-88.2792, 37.4533], [-88.477, 37.3857], [-88.5158, 37.2841], [-88.4252, 37.1538], [-88.5232, 37.0658], [-88.9314, 37.2274], [-89.0299, 37.2111], [-89.1738, 37.0663], [-89.1329, 36.9821], [-89.2921, 36.9922], [-89.3796, 37.0407], [-89.5185, 37.2863], [-89.4209, 37.3939], [-89.5165, 37.5356], [-89.512, 37.6855], [-89.6679, 37.7586], [-89.7961, 37.8595], [-89.8985, 37.8709], [-90.0595, 38.0156], [-90.2426, 38.1121], [-90.3532, 38.2129], [-90.3708, 38.3336], [-90.1794, 38.6267], [-90.213, 38.712], [-90.1133, 38.8493], [-90.2502, 38.9193], [-90.4717, 38.9592], [-90.5776, 38.8684], [-90.663, 38.9263], [-90.727, 39.2512], [-91.0383, 39.4484], [-91.3678, 39.729], [-91.4338, 39.8419], [-91.4194, 39.9277], [-91.495, 40.0369], [-91.5065, 40.2363], [-91.4194, 40.3783], [-91.3757, 40.3919], [-91.3487, 40.6097], [-91.1239, 40.6692], [-91.0901, 40.8246], [-90.9629, 40.925], [-90.9463, 41.0945], [-91.1142, 41.25], [-91.0483, 41.4098], [-90.8576, 41.4528], [-90.6558, 41.4621], [-90.3432, 41.5878], [-90.3156, 41.7344], [-90.188, 41.8032], [-90.1412, 42.0089], [-90.2095, 42.1527], [-90.3911, 42.2255], [-90.4779, 42.3841], [-90.6428, 42.5085]]]
          },
          "properties": {
            "STATE_ID": 2,
            "STATE_NAME": "Florida",
            "user": 2,
            "flow": 1,
            'title1': "用户数 1500",
            'title2': "流量 1500",
            'title3': "收入 200",
          },
          "id": 2
        }]
      } : this[`data${pro}`] = {
        "type": "FeatureCollection",
        "features": [{
          "type": "Feature",
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [-90.6428, 42.5085],
                [-90.0737, 42.5083],
                [-88.7693, 42.4919],
                [-87.8032, 42.4926],
                [-87.0199, 42.4935],
                [-87.2078, 41.761],
                [-87.5237, 41.7599],
                [-87.5263, 40.492],
                [-87.5316, 39.3479],
                [-87.5857, 39.2004],
                [-87.6587, 39.136],
                [-87.5134, 38.956],
                [-87.4959, 38.7854],
                [-87.7562, 38.4625],
                [-87.8335, 38.3196],
                [-87.985, 38.228],
                [-88.037, 37.9563],
                [-88.095, 37.8937],
                [-88.028, 37.7992],
                [-88.1572, 37.6333],
                [-88.082, 37.4728],
                [-88.2792, 37.4533],
                [-88.477, 37.3857],
                [-88.5158, 37.2841],
                [-88.4252, 37.1538],
                [-88.5232, 37.0658],
                [-88.9314, 37.2274],
                [-89.0299, 37.2111],
                [-89.1738, 37.0663],
                [-89.1329, 36.9821],
                [-89.2921, 36.9922],
                [-89.3796, 37.0407],
                [-89.5185, 37.2863],
                [-89.4209, 37.3939],
                [-89.5165, 37.5356],
                [-89.512, 37.6855],
                [-89.6679, 37.7586],
                [-89.7961, 37.8595],
                [-89.8985, 37.8709],
                [-90.0595, 38.0156],
                [-90.2426, 38.1121],
                [-90.3532, 38.2129],
                [-90.3708, 38.3336],
                [-90.1794, 38.6267],
                [-90.213, 38.712],
                [-90.1133, 38.8493],
                [-90.2502, 38.9193],
                [-90.4717, 38.9592],
                [-90.5776, 38.8684],
                [-90.663, 38.9263],
                [-90.727, 39.2512],
                [-91.0383, 39.4484],
                [-91.3678, 39.729],
                [-91.4338, 39.8419],
                [-91.4194, 39.9277],
                [-91.495, 40.0369],
                [-91.5065, 40.2363],
                [-91.4194, 40.3783],
                [-91.3757, 40.3919],
                [-91.3487, 40.6097],
                [-91.1239, 40.6692],
                [-91.0901, 40.8246],
                [-90.9629, 40.925],
                [-90.9463, 41.0945],
                [-91.1142, 41.25],
                [-91.0483, 41.4098],
                [-90.8576, 41.4528],
                [-90.6558, 41.4621],
                [-90.3432, 41.5878],
                [-90.3156, 41.7344],
                [-90.188, 41.8032],
                [-90.1412, 42.0089],
                [-90.2095, 42.1527],
                [-90.3911, 42.2255],
                [-90.4779, 42.3841],
                [-90.6428, 42.5085]
              ]
            ]
          },
          "properties": {
            "STATE_ID": 1,
            "STATE_NAME": "Illinois",
            "user": 2,
            "flow": 1,
          },
          "id": 1
        }, {
          "type": "Feature",
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [-96.7802, 46.877],
                [-96.834, 47.0098],
                [-96.8548, 47.6069],
                [-97.0549, 47.9466],
                [-97.1498, 48.1835],
                [-97.1478, 48.614],
                [-97.1014, 48.6822],
                [-97.2342, 48.9483],
                [-97.2287, 49.0006],
                [-95.748, 48.9995],
                [-95.1537, 48.9989],
                [-95.1533, 49.3844],
                [-94.9574, 49.3701],
                [-94.8256, 49.2944],
                [-94.6843, 48.884],
                [-94.6944, 48.7822],
                [-94.5921, 48.7191],
                [-94.2645, 48.6989],
                [-94.2444, 48.6534],
                [-93.844, 48.6294],
                [-93.7944, 48.516],
                [-93.4694, 48.5452],
                [-93.3475, 48.6266],
                [-92.985, 48.6237],
                [-92.7282, 48.5393],
                [-92.656, 48.4367],
                [-92.5073, 48.4479],
                [-92.37, 48.2201],
                [-92.289, 48.343],
                [-92.0552, 48.3592],
                [-92.0066, 48.2654],
                [-91.7152, 48.1993],
                [-91.712, 48.1147],
                [-91.4296, 48.0486],
                [-91.2501, 48.0841],
                [-91.0827, 48.1808],
                [-90.8856, 48.2457],
                [-90.7616, 48.0983],
                [-90.3823, 48.0932],
                [-90.1326, 48.1118],
                [-89.8991, 47.9881],
                [-89.8205, 48.0147],
                [-89.4834, 48.0137],
                [-89.9571, 47.2911],
                [-90.6547, 47.3098],
                [-91.5002, 46.9133],
                [-92.0203, 46.704],
                [-92.0895, 46.7492],
                [-92.2916, 46.638],
                [-92.294, 46.0744],
                [-92.3504, 46.0164],
                [-92.6399, 45.9335],
                [-92.8692, 45.7176],
                [-92.885, 45.5788],
                [-92.7734, 45.5682],
                [-92.6466, 45.4418],
                [-92.762, 45.2882],
                [-92.7506, 44.9373],
                [-92.8081, 44.7509],
                [-92.4937, 44.566],
                [-92.3476, 44.5572],
                [-92.2211, 44.4404],
                [-91.9282, 44.3355],
                [-91.8752, 44.2006],
                [-91.5826, 44.0274],
                [-91.4323, 43.9967],
                [-91.2441, 43.7747],
                [-91.2651, 43.61],
                [-91.2177, 43.5005],
                [-92.0346, 43.5007],
                [-93.0724, 43.4996],
                [-94.2771, 43.5001],
                [-95.7907, 43.4999],
                [-96.4533, 43.5004],
                [-96.453, 44.1379],
                [-96.4531, 45.3008],
                [-96.4891, 45.3571],
                [-96.6806, 45.4105],
                [-96.8568, 45.6054],
                [-96.5831, 45.82],
                [-96.5637, 45.9352],
                [-96.6017, 46.3312],
                [-96.7181, 46.4419],
                [-96.7995, 46.6752],
                [-96.7802, 46.877]
              ]
            ]
          },
          "properties": {
            "STATE_ID": 2,
            "STATE_NAME": "Minnesota",
            "user": 1,
            "flow": 1,
          },
          "id": 2
        }]
      }
      this.layerAdd(pro)
    }, 2000)
  }
  /**
   * 
   * @param pro 省份
   * layer的id最后一位 为次图层标识 用于切换图层
   */
  layerAdd(pro) {
    // 每个城市 一个source 四个图层 
    this.map.addSource(`states_${pro}`, {
      "type": "geojson",
      "data": this[`data${pro}`]
    });
    for (let i = 1; i < 4; i++) {
      let name = ''
      switch (i) {
        case 1:
          name = 'STATE_ID'
          break;
        case 2:
          name = 'user'
          break;
        case 3:
          name = 'flow'
          break;
        default:
          name = 'STATE_ID'
          break;
      }
      this.map.addLayer({
        "id": `state${pro}${i}`,
        "type": "fill",
        "source": `states_${pro}`,
        "layout": {
          //当前的index$
          'visibility': this.mapService.currentIndex == i ? 'visible' : 'none',
        },
        "paint": {
          "fill-color": this.fillColor(name),
          "fill-opacity": ["case", ["boolean", ["feature-state", "hover"], false],
            1,
            0.5
          ]
        },
      });
      this.eventAdd(pro,i)
    }
  }
  // 站点数据格式和其余有区别 分开添加
  getStationData(pro) {
    setTimeout(() => {
      this[`stationData${pro}`] = pro == 1 ? this.sData : this.sData2
      this.layerStationAdd(pro)
    }, 2000);
  }
  layerStationAdd(pro) {
    this.map.addSource(`stations_${pro}`, {
      "type": "geojson",
      "data": this[`stationData${pro}`]
    });
    this.map.addLayer({
      "id": `state${pro}9`,
      "type": "symbol",
      "source": `stations_${pro}`,
      "layout": {
        "icon-image": "{icon}-15",
        "icon-allow-overlap": true,
        'visibility': this.mapService.currentIndex == 9 ? 'visible' : 'none',
      }
    });
  }
  eventAdd(pro,i) {
    let hoveredStateId = null
    this.map.on('click', `state${pro}${i}`, (e) => {
      let coordinates = e.features[0].geometry.coordinates[0][1].slice();
      let title = e.features[0].properties.title2;

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      new mapboxgl.Popup({
        closeButton: false,
      })
        .setLngLat(coordinates)
        .setHTML(`<div class='title'>${title}</div>      
          `)
        .addTo(this.map);
    });
    this.map.on("mousemove", `state${pro}${i}`, (e) => {
      if (e.features.length > 0) {
        if (hoveredStateId) {
          this.map.setFeatureState({ source: `states_${pro}`, id: hoveredStateId }, { hover: false });
        }
        hoveredStateId = e.features[0].id;
        this.map.setFeatureState({ source: `states_${pro}`, id: hoveredStateId }, { hover: true });
      }
    });
    this.map.on("mouseleave", `state${pro}${i}`, () => {
      if (hoveredStateId) {
        this.map.setFeatureState({ source: `states_${pro}`, id: hoveredStateId }, { hover: false });
      }
      hoveredStateId = null;
    });
  }
}
