Page({
    data: {
      title: '',
      price: '',
      unitIndex: 0,
      unitList: ['千克', '件'],
      imgPath: '',
      desc: ''
    },
  
    onTitleInput(e) {
      this.setData({ title: e.detail.value });
    },
    onPriceInput(e) {
      this.setData({ price: e.detail.value });
    },
    onUnitChange(e) {
      this.setData({ unitIndex: e.detail.value });
    },
    onDescInput(e) {
      this.setData({ desc: e.detail.value });
    },
  
    chooseImage() {
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          this.setData({ imgPath: res.tempFilePaths[0] });
        }
      });
    },
  
    submitGoods() {
      const { title, price, unitIndex, imgPath, desc, unitList } = this.data;
      if (!title || !price || !imgPath) {
        wx.showToast({ title: '请填写完整信息', icon: 'none' });
        return;
      }
  
      // 模拟上传图片到云存储（如果有云开发）
      // 这里用本地存储模拟，实际项目建议用云开发上传
      const goods = {
        id: Date.now(), // 用时间戳做唯一ID
        title,
        price: parseFloat(price),
        unit: unitList[unitIndex],
        img: imgPath,
        desc,
        type: "卖家发布",
        canBuy: true,
        sellerId: wx.getStorageSync('userInfo').id // 关联卖家
      };
  
      // 保存到本地缓存，模拟后台数据
      let goodsList = wx.getStorageSync('sellerGoods') || [];
      goodsList.push(goods);
      wx.setStorageSync('sellerGoods', goodsList);
  
      wx.showToast({ title: '发布成功', icon: 'success' });
      wx.navigateBack();
    }
  });