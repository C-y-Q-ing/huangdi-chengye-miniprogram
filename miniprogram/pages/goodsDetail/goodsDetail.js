Page({
    data: {
      goodsInfo: {},
      buyNum: 1,
      spec: "",
      isShopMall: false
    },
  
    onLoad(options) {
      const id = options.id;
      const isShopMall = options.isShopMall === "true";
      this.setData({ isShopMall });
  
      // 脐橙商品（按千克卖）
      const orangeGoods = [
        {
          id: 1,
          title: "赣南脐橙",
          price: 6.0,
          type: "可邮寄下单",
          address: "江西赣州",
          canBuy: true,
          unit: "千克",
          img: "/static/images/orange_gannan.jpg",
          desc: "江西品种，引种至厦门本地生态果园，山泉水灌溉，自然成熟。果肉细嫩化渣，甜度高、酸度低。"
        },
        {
          id: 2,
          title: "黄地脐橙 – 现场采摘",
          price: 10.0,
          type: "现场采摘·不可线上下单",
          address: "黄地村果园",
          canBuy: false,
          unit: "千克",
          img: "/static/images/orange_huangdi_pick.jpg",
          desc: "厦门黄地村生态种植，纯净水灌溉，无农药，昼夜温差大糖分足。现摘现吃，体验从枝头到舌尖的新鲜！果大形正、橙香浓郁、甜酸适口，每一口都是阳光的味道。"
        },
        {
          id: 3,
          title: "黄地脐橙 – 邮寄发货",
          price: 12.0,
          type: "产地邮寄·现摘现发",
          address: "黄地村果园",
          canBuy: true,
          unit: "千克",
          img: "/static/images/orange_huangdi_send.jpg",
          desc: "同款黄地脐橙，当天采摘、当天打包，支持顺丰/京东等多种快递发货（福建省内次日达）。精选果径70-85mm中大果，果皮光滑、无磕碰、无烂果。下单时请备注规格。"
        }
      ];
  
      // 周边商城商品（按件卖，无重量）
      const shopGoods = [
        {
          id: 101,
          title: "橙小满/橙点点毛线公仔",
          price: 39.9,
          type: "IP形象周边",
          canBuy: true,
          unit: "件",
          img: "/static/images/shop/chenxiaoman_plush.jpg",
          desc: "原创IP毛绒公仔，采用柔软毛线编织。圆滚滚的橙子造型，搭配可爱的表情，既是抱枕也是玩偶。适合放在沙发上、车里，或者送给孩子做伴手礼，让温暖从果园传递到家中。"
        },
        {
          id: 102,
          title: "橙小满钥匙扣挂件",
          price: 12.9,
          type: "IP形象周边",
          canBuy: true,
          unit: "件",
          img: "/static/images/shop/keyring.jpg",
          desc: "原创IP公仔钥匙扣，精选IP经典形象，亚克力材质双面印刷，耐磨不掉色。挂在书包、钥匙或手机上，每天都能看到黄地村的阳光橙意。"
        },
        {
          id: 103,
          title: "IP形象帆布袋/帆布包",
          price: 29.9,
          type: "IP形象周边",
          canBuy: true,
          unit: "件",
          img: "/static/images/shop/tote_bag.jpg",
          desc: "原创IP系列帆布包，采用加厚棉麻的帆布，承重可达10公斤。包内设有小口袋，方便放手机和钥匙。日常上学、买菜、逛街都很实用。"
        },
        {
          id: 104,
          title: "脐橙IP手机壳",
          price: 19.9,
          type: "IP形象周边",
          canBuy: true,
          unit: "件",
          img: "/static/images/shop/phone_case.jpg",
          desc: "适配iPhone及主流安卓机型（下单前请备注型号）。全系列IP图案可选，四角气囊防摔设计，液态硅胶材质，手感顺滑不沾指纹。"
        },
        {
          id: 105,
          title: "IP表情包贴纸套装",
          price: 9.9,
          type: "IP形象周边",
          canBuy: true,
          unit: "件",
          img: "/static/images/shop/sticker.jpg",
          desc: "包含不同表情的脐橙IP贴纸。防水覆膜，可贴在行李箱、水杯、笔记本、滑板上。价格实惠，适合凑单或作为采摘活动的小赠品。"
        },
        {
          id: 106,
          title: "脐橙IP抱枕/靠垫",
          price: 49.9,
          type: "IP形象周边",
          canBuy: true,
          unit: "件",
          img: "/static/images/shop/pillow.jpg",
          desc: "全系列IP方形抱枕，选用超柔面料，填充优质PP棉，回弹性好。办公室靠腰、沙发抱枕、车内护颈都很合适。"
        },
        {
          id: 107,
          title: "主题笔记本/便签本",
          price: 15.9,
          type: "IP形象周边",
          canBuy: true,
          unit: "件",
          img: "/static/images/shop/notebook.jpg",
          desc: "线圈笔记本，封面采用全系列IP插画，每本附赠一张脐橙主题插画。可做课堂笔记、日记或手账。适合随手记录待办事项。"
        },
        {
          id: 108,
          title: "黄地脐橙礼盒包装（空盒）",
          price: 12.0,
          type: "脐橙文创周边",
          canBuy: true,
          unit: "件",
          img: "/static/images/shop/gift_box.jpg",
          desc: "单独出售的礼盒空盒，专为黄地脐橙设计。橙色主调，印有IP中的精选图案。适合企业团购或个人送礼。买好脐橙后自己装盒，体面又有心意。如需定制祝福语贴纸，可联系客服。"
        },
        {
          id: 109,
          title: "脐橙造型马克杯",
          price: 25.9,
          type: "脐橙文创周边",
          canBuy: true,
          unit: "件",
          img: "/static/images/shop/mug.jpg",
          desc: "陶瓷马克杯，杯身印有原创IP造型。喝水时仿佛捧着一颗新鲜的脐橙。微波炉可用，不烫手。"
        }
      ];
  
      const goodsList = isShopMall ? shopGoods : orangeGoods;
      const goods = goodsList.find(item => item.id == id);
  
      const spec = isShopMall ? "默认规格" : "中果";
  
      this.setData({
        goodsInfo: goods,
        spec: spec,
        buyNum: 1
      });
    },
  
    // 选择规格（只有脐橙能选，周边禁止）
    selectSpec(e) {
      if (this.data.isShopMall) return;
      this.setData({ spec: e.currentTarget.dataset.spec });
    },
  
    // 修改购买数量
    changeNum(e) {
      const step = parseInt(e.currentTarget.dataset.step);
      let newNum = this.data.buyNum + step;
      if (newNum < 1) newNum = 1;
      this.setData({ buyNum: newNum });
    },
  
    // 加入购物车
    addToCart() {
      const { goodsInfo, buyNum, spec, isShopMall } = this.data;
      if (!goodsInfo.canBuy) return;
  
      let cartList = wx.getStorageSync('cartList') || [];
      const existIndex = cartList.findIndex(item =>
        item.id === goodsInfo.id && item.spec === spec
      );
  
      if (existIndex > -1) {
        cartList[existIndex].num = buyNum;
      } else {
        cartList.push({
          id: goodsInfo.id,
          title: goodsInfo.title,
          price: goodsInfo.price,
          num: buyNum,
          spec: spec,
          unit: goodsInfo.unit,
          isShopMall: isShopMall
        });
      }
  
      wx.setStorageSync('cartList', cartList);
      wx.showToast({ title: '已加入购物车', icon: 'success' });
    },
  
    // 立即购买
    buyNow() {
      this.addToCart();
      wx.navigateTo({ url: '/pages/order/order' });
    }
  })