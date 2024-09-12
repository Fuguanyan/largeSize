//mapData数据结构
export interface MapdataType {
    name: string;
    value: [number, number, number]; //x,y,value  第一个x 第二个y  第三个value
}
export const optionHandle = (regionCode: string,
    list: object[],
    mapData: MapdataType[]) => {
    let top = 45;
    let zoom = ["china"].includes(regionCode) ? 1.05 : 1;
    return {
        backgroundColor: "rgba(0,0,0,0)",
        tooltip: {
            show: false,
        },
        legend: {
            show: false,
        },
       
        geo: {
            map: regionCode,
            aspectScale: 1,
            zoom: zoom,
            layoutCenter: ['50%', '50%'],
            layoutSize: '100%',
            show: true,
            roam: false,
            top: top,
            label: {
              show: false, // 各个省市县的名字
              color: '#fff',
            },
            itemStyle: {
              // 每块的样式
              areaColor: {
                type: 'linear',
                x: 1200,
                y: 0,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: '#1048A8',
                  },
                  {
                    offset: 1,
                    color: '#1048A8',
                  },
                ],
                global: true, // 缺省为 false
              },
              borderColor: '#1B89C3',
              borderWidth: 0.8,
            },
            emphasis: {
              itemStyle: {
                show: false,
                color: '#fff',
                areaColor: 'rgba(0,254,233,0.6)',
              },
              label: {
                show: true,
                color: '#fff',
              },
            },


        },
        series: [
            {
                type: "map",
                map: regionCode,
                // name: "MAP",
                
                coordinateSystem: "geo",
                geoIndex: 1,
                top: top,
                zlevel: -1,
                aspectScale: 1,
                zoom:zoom,
                layoutCenter: ['50%', '52%'],
                layoutSize: '100%',
                roam: false,
                silent: true,
                tooltip: {
                    show: true,
                    formatter: function (params: any) {
                        if (params.data) {
                            return params.name + "：" + params.data["value"];
                        } else {
                            return params.name;
                        }
                    },
                    backgroundColor: "rgba(0,0,0,.6)",
                    borderColor: "rgba(147, 235, 248, .8)",
                    textStyle: {
                        color: "#FFF",
                    },
                },
                label: {
                    show: false,
                    color: "#000",
                    // position: [-10, 0],
                    formatter: function (val: any) {
                        // console.log(val)
                        if (val.data !== undefined) {
                            return val.name.slice(0, 2);
                        } else {
                            return "";
                        }
                    },
                    rich: {},
                },
                emphasis: {
                    label: {
                        show: false,
                    },
                    itemStyle: {
                        // areaColor: "rgba(56,155,183,.7)",
                        areaColor:{
                            type: "radial",
                            x: 0.5,
                            y: 0.5,
                            r: 0.8,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: "rgba(147, 235, 248, 0)", // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: "rgba(56,155,183, .8)", // 100% 处的颜色
                                },
                            ],
                            globalCoord: false, // 缺为 false
                        },
                        borderWidth: 1,
                    },
                },
                itemStyle: {
                    borderWidth: 1,
                    borderColor: '#1B89C3',
                    shadowColor: '#1048A8',
                    shadowOffsetY: 5,
                    shadowBlur: 15,
                    areaColor: '#041633',
                  },
            },
            {
                data: mapData,
                type: "effectScatter",
                coordinateSystem: "geo",
                symbolSize: function (val: any) {
                    return 4;
                    // return val[2] / 50;
                },
                legendHoverLink: true,
                showEffectOn: "render",
                rippleEffect: {
                    // period: 4,
                    scale: 6,
                    color: "rgba(255,255,255, 1)",
                    brushType: "fill",
                },
                tooltip: {
                    show: true,
                    formatter: function (params: any) {
                        if (params.data) {
                            return params.name + "：" + params.data["value"][2];
                        } else {
                            return params.name;
                        }
                    },
                    backgroundColor: "rgba(0,0,0,.6)",
                    borderColor: "rgba(147, 235, 248, .8)",
                    textStyle: {
                        color: "#FFF",
                    },
                },
                label: {
                    formatter: (param: any) => {
                        return param.name.slice(0, 2);
                    },

                    fontSize: 11,
                    offset: [0, 2],
                    position: "bottom",
                    textBorderColor: "#fff",
                    textShadowColor: "#000",
                    textShadowBlur: 10,
                    textBorderWidth: 0,
                    color: "#FFF",
                    show: true,
                },
                // colorBy: "data",
                itemStyle: {
                    color: "rgba(255,255,255,1)",
                    borderColor: "rgba(2255,255,255,2)",
                    borderWidth: 4,
                    shadowColor: "#000",
                    shadowBlur: 10,
                },
            },
        ],
        //动画效果
        // animationDuration: 1000,
        // animationEasing: 'linear',
        // animationDurationUpdate: 1000
    };
}

export const regionCodes: any = {
    "中国": {
        "adcode": "100000",
        "level": "country",
        "name": "中华人民共和国"
    },
    "新疆维吾尔自治区": {
        "adcode": "650000",
        "level": "province",
        "name": "新疆维吾尔自治区"
    },
    "湖北省": {
        "adcode": "420000",
        "level": "province",
        "name": "湖北省"
    },
    "辽宁省": {
        "adcode": "210000",
        "level": "province",
        "name": "辽宁省"
    },
    "广东省": {
        "adcode": "440000",
        "level": "province",
        "name": "广东省"
    },
    "内蒙古自治区": {
        "adcode": "150000",
        "level": "province",
        "name": "内蒙古自治区"
    },
    "黑龙江省": {
        "adcode": "230000",
        "level": "province",
        "name": "黑龙江省"
    },
    "河南省": {
        "adcode": "410000",
        "level": "province",
        "name": "河南省"
    },
    "山东省": {
        "adcode": "370000",
        "level": "province",
        "name": "山东省"
    },
    "陕西省": {
        "adcode": "610000",
        "level": "province",
        "name": "陕西省"
    },
    "贵州省": {
        "adcode": "520000",
        "level": "province",
        "name": "贵州省"
    },
    "上海市": {
        "adcode": "310000",
        "level": "province",
        "name": "上海市"
    },
    "重庆市": {
        "adcode": "500000",
        "level": "province",
        "name": "重庆市"
    },
    "西藏自治区": {
        "adcode": "540000",
        "level": "province",
        "name": "西藏自治区"
    },
    "安徽省": {
        "adcode": "340000",
        "level": "province",
        "name": "安徽省"
    },
    "福建省": {
        "adcode": "350000",
        "level": "province",
        "name": "福建省"
    },
    "湖南省": {
        "adcode": "430000",
        "level": "province",
        "name": "湖南省"
    },
    "海南省": {
        "adcode": "460000",
        "level": "province",
        "name": "海南省"
    },
    "江苏省": {
        "adcode": "320000",
        "level": "province",
        "name": "江苏省"
    },
    "青海省": {
        "adcode": "630000",
        "level": "province",
        "name": "青海省"
    },
    "广西壮族自治区": {
        "adcode": "450000",
        "level": "province",
        "name": "广西壮族自治区"
    },
    "宁夏回族自治区": {
        "adcode": "640000",
        "level": "province",
        "name": "宁夏回族自治区"
    },
    "浙江省": {
        "adcode": "330000",
        "level": "province",
        "name": "浙江省"
    },
    "河北省": {
        "adcode": "130000",
        "level": "province",
        "name": "河北省"
    },
    "香港特别行政区": {
        "adcode": "810000",
        "level": "province",
        "name": "香港特别行政区"
    },
    "台湾省": {
        "adcode": "710000",
        "level": "province",
        "name": "台湾省"
    },
    "澳门特别行政区": {
        "adcode": "820000",
        "level": "province",
        "name": "澳门特别行政区"
    },
    "甘肃省": {
        "adcode": "620000",
        "level": "province",
        "name": "甘肃省"
    },
    "四川省": {
        "adcode": "510000",
        "level": "province",
        "name": "四川省"
    },
    "天津市": {
        "adcode": "120000",
        "level": "province",
        "name": "天津市"
    },
    "江西省": {
        "adcode": "360000",
        "level": "province",
        "name": "江西省"
    },
    "云南省": {
        "adcode": "530000",
        "level": "province",
        "name": "云南省"
    },
    "山西省": {
        "adcode": "140000",
        "level": "province",
        "name": "山西省"
    },
    "北京市": {
        "adcode": "110000",
        "level": "province",
        "name": "北京市"
    },
    "吉林省": {
        "adcode": "220000",
        "level": "province",
        "name": "吉林省"
    }
}