Page({
    data: {
      isLogin: false,
      userInfo: null,
      roleName: "普通用户"
    },
  
    onShow() {
      let login = wx.getStorageSync("isLogin")
      let info = wx.getStorageSync("userInfo")
      let name = "普通买家"
  
      // 把 ?. 换成兼容写法
      if (info && info.role === "seller") {
        name = "入驻卖家"
      }
      if (info && info.role === "planter") {
        name = "种植户"
      }
  
      this.setData({
        isLogin: login,
        userInfo: info,
        roleName: name
      })
    },
  
    toLogin() {
      wx.navigateTo({ url: "/pages/login/login" })
    },
  
    toSet() {
      wx.navigateTo({ url: "/pages/userSet/userSet" })
    },
  
    toOrder() {
      if (!this.data.isLogin) {
        wx.navigateTo({ url: "/pages/login/login" })
        return
      }
      wx.navigateTo({ url: "/pages/order/order" })
    },
  
    toSeller() {
      if (!this.data.isLogin) {
        wx.navigateTo({ url: "/pages/login/login" })
        return
      }
      let u = wx.getStorageSync("userInfo")
      u.role = "seller"
      wx.setStorageSync("userInfo", u)
      this.onShow()
      wx.navigateTo({ url: "/pages/sellerCenter/sellerCenter" })
    },
  
    toPlant() {
      if (!this.data.isLogin) {
        wx.navigateTo({ url: "/pages/login/login" })
        return
      }
      let u = wx.getStorageSync("userInfo")
      u.role = "planter"
      wx.setStorageSync("userInfo", u)
      this.onShow()
      wx.navigateTo({ url: "/pages/plantManage/plantManage" })
    },
  
    toAiChat() {
      wx.navigateTo({ url: "/pages/aiChat/aiChat" })
    }
  })