Page({
    data: {
      records: []
    },
  
    onShow() {
      // 读取本地存储的种植记录
      const records = wx.getStorageSync('plantRecords') || [];
      this.setData({ records });
    },
  
    // 跳转到种植记录页面
    toPlantRecord() {
      wx.navigateTo({
        url: '/pages/plantRecord/plantRecord'
      });
    },
  
    // 跳转到病虫害防治页面
    toPestControl() {
      wx.navigateTo({
        url: '/pages/pestControl/pestControl'
      });
    },
  
    // 跳转到监控数据页面
    toMonitorData() {
      wx.navigateTo({
        url: '/pages/monitorData/monitorData'
      });
    },
  
    // 跳转到生长报告页面
    toGrowReport() {
      wx.navigateTo({
        url: '/pages/growReport/growReport'
      });
    }
  });