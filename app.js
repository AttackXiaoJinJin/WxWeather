App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    //先获取用户的位置信息
    wx.getLocation({
      success: function(res) {
        // 经度
        console.log(res.latitude);
        //纬度
        console.log(res.longitude);
      },
    })

    var api ="https://free-api.heweather.com/v5/weather?city=%E8%8B%8F%E5%B7%9E&key=e89507ba43dc4befb6be471af22372e9";
    wx.request({
      // 发送请求的地址
      url: api, 
      //参数
      data:{},
 
      //设置请求的header
      //header:{}
      //OPTIONS,GET,HEAD,PUT,DELETE,TRACE,CONNECT
      method:'GET',
      success:function(res){

      },
      fail:function(){

      },
      complete:function(){

      }

    })
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  },
  //还可以添加一些属性
  //可以在项目的任意位置访问
  hello:"你好"



})
