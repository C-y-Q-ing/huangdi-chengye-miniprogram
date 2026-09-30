Page({
    data: {
      cartList: [],
      totalPrice: 0
    },
  
    onShow() {
      this.getCartList();
    },
  
    getCartList() {
      const cartList = wx.getStorageSync('cartList') || [];
      let totalPrice = 0;
      cartList.forEach(item => {
        // 关键：确保num是数字，避免字符串运算
        const num = Number(item.num);
        totalPrice += item.price * num;
      });
      this.setData({
        cartList,
        totalPrice: totalPrice.toFixed(2)
      });
    },
  
    // 加减数量（关键！step必须是数字，不拼接）
    changeCartNum(e) {
      const { id, spec, step } = e.currentTarget.dataset;
      let cartList = wx.getStorageSync('cartList') || [];
      const index = cartList.findIndex(item => item.id === id && item.spec === spec);
      if (index === -1) return;
  
      const item = cartList[index];
      // 关键：确保step是数字
      const stepNum = parseInt(step);
      item.num = Number(item.num) + stepNum;
  
      // 周边：可以到0，自动删除
      if (item.isShopMall) {
        if (item.num <= 0) {
          cartList.splice(index, 1);
        }
      } else {
        // 脐橙：最小1
        if (item.num < 1) item.num = 1;
      }
  
      wx.setStorageSync('cartList', cartList);
      this.getCartList();
    },
  
    // 手动删除
    deleteItem(e) {
      const { id, spec } = e.currentTarget.dataset;
      let cartList = wx.getStorageSync('cartList') || [];
      cartList = cartList.filter(item => !(item.id === id && item.spec === spec));
      wx.setStorageSync('cartList', cartList);
      this.getCartList();
    },
  
    goCheckout() {
      if (this.data.cartList.length === 0) {
        wx.showToast({ title: "购物车为空", icon: "none" });
        return;
      }
      wx.navigateTo({ url: "/pages/order/order" });
    }
  });