Page({
    data: {
      orderList: [],
      totalPrice: 0
    },
  
    onShow() {
      this.getCartOrders();
    },
  
    getCartOrders() {
      const cartList = wx.getStorageSync('cartList') || [];
      let orderList = [];
      let totalPrice = 0;
  
      cartList.forEach(item => {
        const subTotal = (item.price * item.num).toFixed(2);
        orderList.push({
          ...item,
          subTotal: subTotal,
          status: "待发货"
        });
        totalPrice += parseFloat(subTotal);
      });
  
      this.setData({
        orderList,
        totalPrice: totalPrice.toFixed(2)
      });
    },
  
    submitOrder() {
      if (this.data.orderList.length === 0) {
        wx.showToast({ title: "购物车为空", icon: "none" });
        return;
      }
  
      wx.showModal({
        title: "提示",
        content: "确定提交订单？",
        success: (res) => {
          if (res.confirm) {
            wx.setStorageSync('cartList', []);
            wx.showToast({ title: "下单成功", icon: "success" });
            this.getCartOrders();
          }
        }
      });
    }
  });