const IS_USE_REAL_API = false
const REAL_BASE_URL = ""

function httpRequest(url,data,method="GET"){
  return new Promise(resolve=>{
    if(!IS_USE_REAL_API){
      resolve({code:200,msg:"请求成功",data:[]})
      return
    }
    wx.request({
      url:REAL_BASE_URL+url,
      data:data,
      method:method,
      header:{
        token:wx.getStorageSync("userToken")||""
      },
      success:res=>resolve(res.data),
      fail:err=>resolve(err)
    })
  })
}

module.exports = httpRequest