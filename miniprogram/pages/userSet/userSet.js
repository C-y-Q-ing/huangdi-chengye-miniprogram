Page({
    data:{
      userInfo:{}
    },
    onShow(){
      this.setData({userInfo:wx.getStorageSync("userInfo")||{}})
    },
    changeHead(){
      wx.chooseMedia({
        count:1,
        mediaType:['image'],
        success:res=>{
          let u = this.data.userInfo
          u.avatar = res.tempFiles[0].tempFilePath
          wx.setStorageSync("userInfo",u)
          this.setData({userInfo:u})
        }
      })
    },
    editName(e){
      let u = this.data.userInfo
      u.nickName = e.detail.value
      wx.setStorageSync("userInfo",u)
      this.setData({userInfo:u})
    },
    toLoginPage(){
      wx.navigateTo({url:"/pages/login/login"})
    },
    toRegPage(){
      wx.navigateTo({url:"/pages/register/register"})
    },
    loginOut(){
      wx.clearStorageSync()
      getApp().globalData.isLogin = false
      wx.showToast({title:"已退出登录"})
      setTimeout(()=>wx.navigateBack(),800)
    }
  })