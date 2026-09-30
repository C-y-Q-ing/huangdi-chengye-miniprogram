Page({
    data: {
      goodsList: [
        // IP形象周边
        {
          id: 101,
          title: "橙小满毛绒公仔",
          price: 39.9,
          desc: "软萌3DIP形象，治愈系陪伴",
          img: "/static/images/shop/chenxiaoman_plush.jpg",
          canBuy: true
        },
        {
          id: 102,
          title: "脐橙IP钥匙扣挂件",
          price: 12.9,
          desc: "亚克力材质，多款式可选",
          img: "/static/images/shop/keyring.jpg",
          canBuy: true
        },
        {
          id: 103,
          title: "IP形象帆布袋",
          price: 29.9,
          desc: "大容量环保袋，橙意满满",
          img: "/static/images/shop/tote_bag.jpg",
          canBuy: true
        },
        {
          id: 104,
          title: "脐橙IP手机壳",
          price: 19.9,
          desc: "软壳防摔，适配主流机型",
          img: "/static/images/shop/phone_case.jpg",
          canBuy: true
        },
        {
          id: 105,
          title: "IP表情包贴纸套装",
          price: 9.9,
          desc: "防水不干胶，多款趣味表情",
          img: "/static/images/shop/sticker.jpg",
          canBuy: true
        },
        {
          id: 106,
          title: "脐橙IP抱枕靠垫",
          price: 49.9,
          desc: "超柔面料，居家办公好物",
          img: "/static/images/shop/pillow.jpg",
          canBuy: true
        },
        {
          id: 107,
          title: "主题笔记本套装",
          price: 15.9,
          desc: "IP精美封面，书写流畅",
          img: "/static/images/shop/notebook.jpg",
          canBuy: true
        },
        // 脐橙文创周边
        {
          id: 108,
          title: "黄地脐橙礼盒空盒",
          price: 12.0,
          desc: "精美外包装，送礼有面",
          img: "/static/images/shop/gift_box.jpg",
          canBuy: true
        },
        {
          id: 109,
          title: "脐橙造型马克杯",
          price: 25.9,
          desc: "创意造型陶瓷杯，日常使用",
          img: "/static/images/shop/mug.jpg",
          canBuy: true
        },
        // 新增IP周边
        {
          id: 110,
          title: "橙小满冰箱贴",
          price: 8.9,
          desc: "磁吸款，IP形象超萌",
          img: "/static/images/shop/magnet.jpg",
          canBuy: true
        }
      ]
    },
  
    // 加入购物车
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
          spec: "默认规格"
        });
      }
  
      wx.setStorageSync('cartList', cartList);
      wx.showToast({
        title: '已加入购物车',
        icon: 'success'
      });
    },
  
    // 跳转到商品详情页
    goDetail(e) {
      const id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: `/pages/goodsDetail/goodsDetail?id=${id}&isShopMall=true`
      });
    }
  })