Page({
    goToAI(e) {
      const question = e.currentTarget.dataset.question;
      // 跳转到AI助手并自动发送问题
      wx.navigateTo({
        url: `/pages/aiChat/aiChat?question=${encodeURIComponent(question)}`
      });
    }
  });