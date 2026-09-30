Page({
    data: {
      imgSrc: "",
      resultInfo: ""
    },
    chooseImg: function() {
      var that = this;
      wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sourceType: ['camera', 'album'],
        success: function(res) {
          var path = res.tempFiles[0].tempFilePath;
          that.setData({
            imgSrc: path,
            resultInfo: "正在AI识别中..."
          });
          that.imgToBase64(path);
        }
      });
    },
    imgToBase64: function(path) {
      var that = this;
      wx.getFileSystemManager().readFile({
        filePath: path,
        encoding: "base64",
        success: function(res) {
          // 直接在文件里定义AI识别函数
          function aiPhotoRec(base64Str) {
            return new Promise(function(resolve) {
              wx.request({
                url: "https://open.bigmodel.cn/api/paas/v4/chat/completions",
                method: "POST",
                header: {
                  "Authorization": "Bearer sk-你的智谱API密钥", // 替换成你的API密钥
                  "Content-Type": "application/json"
                },
                data: {
                  model: "glm-4-flash",
                  messages: [
                    {
                      role: "user",
                      content: [
                        { "type": "text", "text": "识别这张脐橙果实/果树图片，判断：1.是否有病虫害；2.成熟度等级；3.是否可采摘；4.给出简单易懂的建议" },
                        { "type": "image_url", "image_url": { "url": "data:image/jpeg;base64," + base64Str } }
                      ]
                    }
                  ]
                },
                success: function(res) {
                  if (res.data.choices) {
                    resolve(res.data.choices[0].message.content);
                  } else {
                    resolve("识别失败");
                  }
                },
                fail: function() {
                  resolve("识别请求异常");
                }
              });
            });
          }
  
          aiPhotoRec(res.data).then(function(resText) {
            that.setData({
              resultInfo: resText
            });
            wx.setStorageSync("nowIllInfo", resText);
          });
        },
        fail: function() {
          that.setData({
            resultInfo: "图片读取失败，请重试"
          });
        }
      });
    }
  });