Page({
    data: {
      keyword: '',
      goodsList: [
        {
          id: 1,
          title: "赣南脐橙",
          price: 6.0,       // 3元/斤 = 6元/kg
          type: "可邮寄下单",
          address: "江西赣州",
          canBuy: true,      // 允许下单
          isLocal: false,
          img: "/static/images/orange_gannan.jpg"
        },
        {
          id: 2,
          title: "黄地脐橙-现场采摘",
          price: 10.0,      // 5元/斤 = 10元/kg
          type: "现场采摘·不可线上下单",
          address: "黄地村果园",
          canBuy: false,     // 禁止线上下单
          isLocal: true,
          img: "/static/images/orange_huangdi_pick.jpg"
        },
        {
          id: 3,
          title: "黄地脐橙-邮寄发货",
          price: 12.0,      // 6元/斤 = 12元/kg
          type: "产地邮寄·现摘现发",
          address: "黄地村果园",
          canBuy: true ,     // 允许下单
          isLocal: true,
          img: "/static/images/orange_huangdi_send.jpg"
        }
      ]
    },
  
    // 搜索
    handleSearch(e) {
      this.setData({
        keyword: e.detail.value
      });
    },
  
    // 跳转到详情
    goDetail(e) {
      const id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: `/pages/goodsDetail/goodsDetail?id=${id}`
      });
    },
  
    // 首页快速加购
    addToCart(e) {
      const id = parseInt(e.currentTarget.dataset.id);
      const goods = this.data.goodsList.find(item => item.id === id);
      if (!goods || !goods.canBuy) return;
  
      let cartList = wx.getStorageSync('cartList') || [];
      const existIndex = cartList.findIndex(item => item.id === id);
  
      if (existIndex > -1) {
        cartList[existIndex].num += 1;
      } else {
        cartList.push({
          id: goods.id,
          title: goods.title,
          price: goods.price,
          num: 1,
          spec: "中果" // 默认选中中果
        });
      }
  
      wx.setStorageSync('cartList', cartList);
      wx.showToast({
        title: '已加入购物车',
        icon: 'success'
      });
    }
  });