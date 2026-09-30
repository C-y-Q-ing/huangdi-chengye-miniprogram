// 安全提醒：真实 API Key 已脱敏，运行前请替换为你在智谱开放平台申请的密钥
const AI_KEY = "sk-你的智谱API密钥"; // 请替换成你自己的密钥
const AI_BASE_URL = "https://open.bigmodel.cn/api/paas/v4/chat/completions";

function aiTalk(content){
  return new Promise(resolve=>{
    wx.request({
      url:AI_BASE_URL,
      method:"POST",
      header:{
        "Authorization":"Bearer "+AI_KEY,
        "Content-Type":"application/json"
      },
      data:{
        model:"glm-4-flash",
        messages:[
          {
            role:"system",
            content:"你是专业脐橙产销+种植技术专家，解答种植问题分人工、物理、化学方案，分析生长数据如实判断光照水分温度养分是否充足，简洁易懂贴合农户使用。"
          },
          {role:"user",content:content}
        ],
        temperature:0.5
      },
      success:res=>{
        if(res.data.choices){
          resolve(res.data.choices[0].message.content)
        }else{
          resolve("AI服务繁忙，请稍后重试")
        }
      },
      fail:()=>resolve("网络请求失败")
    })
  })
}

function aiPhotoRec(base64Str){
  return new Promise(resolve=>{
    wx.request({
      url:AI_BASE_URL,
      method:"POST",
      header:{
        "Authorization":"Bearer "+AI_KEY,
        "Content-Type":"application/json"
      },
      data:{
        model:"glm-4-flash",
        messages:[
          {
            role:"user",
            content:[
              {"type":"text","text":"识别这张脐橙果树或果实图片，判断病害名称、症状、危害，或者判断果实成熟等级，给出完整治理方案"},
              {"type":"image_url","image_url":{"url":"data:image/jpeg;base64,"+base64Str}}
            ]
          }
        ]
      },
      success:res=>{
        if(res.data.choices){
          resolve(res.data.choices[0].message.content)
        }else resolve("识别失败")
      },
      fail:()=>resolve("识别请求异常")
    })
  })
}

function buildGrowReport(monitorData){
  let text = `
请依据以下脐橙田间监测数据生成标准化生长报告
1.当日光照情况：${monitorData.lightData}
2.土壤水分状态：${monitorData.waterData}
3.田间环境温度：${monitorData.tempData}
4.近期施肥管理：${monitorData.fertData}
5.果树整体长势：${monitorData.growData}
6.图像识别病虫害结果：${monitorData.illData}
报告分为：光照评估、水分评估、温度评估、养分评估、长势评价、病虫害分析、农事执行建议七个部分
`
  return aiTalk(text)
}

module.exports = {
  aiTalk,
  aiPhotoRec,
  buildGrowReport
};