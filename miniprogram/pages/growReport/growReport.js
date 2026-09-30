Page({
    data: {
      recentRecords: []
    },
  
    onShow() {
      // 读取最近3条种植记录
      const allRecords = wx.getStorageSync('plantRecords') || [];
      const recentRecords = allRecords.slice(0, 3);
      this.setData({ recentRecords });
    }
  });