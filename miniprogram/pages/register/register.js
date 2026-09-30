Page({
    data:{
      nickname:"",
      phone:"",
      pwd:"",
      repwd:"",
      userAvatar:"/static/default.png"
    },
    changeAvatar(){
      wx.chooseMedia({
        count:1,
        mediaType:['image'],
        sourceType:['album'],
        success:res=>{
          this.setData({userAvatar:res.tempFiles[0].tempFilePath})
        }
      })
    },
    setNick(e){this.setData({nickname:e.detail.value})},
    setPhone(e){this.setData({phone:e.detail.value})},
    setPwd(e){this.setData({pwd:e.detail.value})},
    setRePwd(e){this.setData({repwd:e.detail.value})},
    regBtn(){
      if(!this.data.nickname||!this.data.phone||!this.data.pwd){
        wx.showToast({title:"信息不能为空",icon:"none"})
        return
      }
      if(this.data.pwd != this.data.repwd){
        wx.showToast({title:"两次密码不一致",icon:"none"})
        return
      }
      let userInfo = {
        nickName:this.data.nickname,
        avatar:this.data.userAvatar,
        phone:this.data.phone,
        role:"buyer"
      }
      wx.setStorageSync("userInfo",userInfo)
      wx.setStorageSync("isLogin",true)
      getApp().globalData.isLogin = true
      getApp().globalData.userInfo = userInfo
      wx.showToast({title:"注册成功"})
      setTimeout(()=>wx.navigateBack(),1000)
    },
    toLogin(){
      wx.navigateBack()
    }
  })