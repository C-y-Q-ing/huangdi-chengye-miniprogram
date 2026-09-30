Page({
    data:{
      username:"",
      pwd:""
    },
    setUser(e){
      this.setData({username:e.detail.value})
    },
    setPwd(e){
      this.setData({pwd:e.detail.value})
    },
    loginBtn(){
      if(!this.data.username||!this.data.pwd){
        wx.showToast({title:"请填写完整信息",icon:"none"})
        return
      }
      let userInfo = {
        nickName:this.data.username,
        avatar:"/static/default.png",
        role:"buyer"
      }
      wx.setStorageSync("userInfo",userInfo)
      wx.setStorageSync("isLogin",true)
      getApp().globalData.isLogin = true
      getApp().globalData.userInfo = userInfo
      wx.showToast({title:"登录成功"})
      setTimeout(()=>wx.navigateBack(),1000)
    },
    toRegister(){
      wx.navigateTo({url:"/pages/register/register"})
    }
  })