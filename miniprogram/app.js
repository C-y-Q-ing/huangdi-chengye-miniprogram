App({
    globalData: {
      userInfo: null,
      isLogin: false,
      userRole: "buyer" // buyer买家 seller卖家 planter种植户
    },
    onLaunch() {
      let loginState = wx.getStorageSync("isLogin")
      let user = wx.getStorageSync("userInfo")
      if (loginState && user) {
        this.globalData.isLogin = true
        this.globalData.userInfo = user
        this.globalData.userRole = user.role
      }
    }
  })