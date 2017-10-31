var app=getApp()

/* 获取位置并通过回调函数将位置信息返回
  -回调函数返回两个值：
    第一个 latitude 纬度
    第二个 longitude 经度
*/

function getCurrentLocation(callback) {
  //纬度
  var latitude = 40.1246996852
  //经度
  var longitude = 116.673182721
  //调用微信api加载位置信息
  wx.getLocation({
    success: function (res) {
      latitude = res.latitude
      longitude = res.longitude
    },

    complete: function () {
      callback && callback(latitude, longitude)
    }

  })
}
//=====================

// 获取城市名
function getCityName(callback) {
  //根据位置信息调取baidu API获取城市名
  getCurrentLocation(function (latitude, longtitude) {
    var baiduApi = "https://api.map.baidu.com/geocoder/v2/"
    var cityName = "北京"
    wx.request({
      url: baiduApi,
      data: {
        "location": latitude + "," + longtitude,
        "output": "json",
        "pois": 1,
        "ak": "FE682f52d5170f3f11d267ec0b9ae2f1"
      },
      success: function (res) {
        // console.log(JSON.stringify(res)+"aaaaaaaaaaaa")
        cityName = res.data.result.addressComponent.city
      },
      complete: function () {
        callback && callback(cityName)
      }

    })
    //============request

  })
  //======getcurrentloation

}
//==========function


/* 根据城市名来加载天气信息
    cityName
    callback
*/

function getWeather(cityName, callback) {
  //判断cityName是否存在
  if (!cityName) {
    getCityName(function (cityname) {
      loadWeather(cityname, callback)
    })
  } else {
    loadWeather(cityName, callback)
  }

}
//=======function


/*
  根据城市名加载天气信息，并通过回调函数返回
  回调函数会返回一个对象，对象的数据格式：
    状态 status
    城市 city
    日期 date
    更新时间 upTime
    温度 temp
    描述 desc
    各种指数 suggestion
 */

function loadWeather(cityName, callback) {
  //根据城市名来加载天气信息
  var weAPI = "https://free-api.heweather.com/v5/weather"
  //发送请求
  wx.request({
    url: weAPI,
    data: {
      city: cityName,
      key: "e89507ba43dc4befb6be471af22372e9"
    },
    success: function (res) {
      /*
        提取数据
        状态 status
        城市 city
        日期 date
        更新时间 upTime
        温度 temp
        描述 desc
        各种指数 suggestion
      */
      // console.log(res.data.HeWeather5[0])
      var wt = res.data.HeWeather5[0]
      //创建一个对象，来保存信息
      var wData = {
        status: "error"
      }
      //判断数据是否加载成功
      if (wt.status == "ok") {
        //解析数据
        wData = {
          status: "ok",
          city: wt.basic.city,
          date: formatDate(),
          upTime: wt.basic.update.loc.slice(-5),
          temp: wt.now.tmp,
          desc: wt.now.cond.txt,
          suggestion: wt.suggestion
        }
      }
      //console.log(wData);
      //返回数据
      callback && callback(wData)

    }

  })
  //=========request

}
//========loadWeather

//创建一个数组，保存星期
var dayArr = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

//创建一个函数，对指定的日期进行格式化
//需要一个日期对象作为参数，返回一个字符串
//例如10月22日 周日
function formatDate(dt) {
  //判断dt是否存在
  if (!dt) {
    dt = new Date()
  }
  //获取月份
  var m = dt.getMonth() + 1
  //获取日期
  var d = dt.getDate()
  //获取星期
  var day = dt.getDay()

  return m + "月" + d + "日" + dayArr[day]

}

//暴露接口
module.exports = { getWeather: getWeather }










