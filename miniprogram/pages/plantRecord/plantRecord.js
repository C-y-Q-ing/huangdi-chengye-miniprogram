Page({
    data: {
      typeIndex: 0,
      typeList: ['施肥', '浇水', '病虫害防治', '采摘', '其他'],
      date: '',
      content: ''
    },
  
    onTypeChange(e) {
      this.setData({ typeIndex: e.detail.value });
    },
  
    onDateInput(e) {
      this.setData({ date: e.detail.value });
    },
  
    onContentInput(e) {
      this.setData({ content: e.detail.value });
    },
  
    saveRecord() {
      const { typeIndex, typeList, date, content } = this.data;
      if (!date || !content) {
        wx.showToast({ title: '请填写完整信息', icon: 'none' });
        return;
      }
  
      const newRecord = {
        id: Date.now(),
        type: typeList[typeIndex],
        date: date,
        content: content
      };
  
      // 保存到本地存储
      let records = wx.getStorageSync('plantRecords') || [];
      records.unshift(newRecord); // 新记录放前面
      wx.setStorageSync('plantRecords', records);
  
      wx.showToast({ title: '记录已保存', icon: 'success' });
      wx.navigateBack();
    }
  });