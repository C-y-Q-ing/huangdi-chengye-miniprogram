Page({
    data: { myGoods: [] },
    onShow() { this.load(); },
    load() {
      let list = wx.getStorageSync("sellerGoods") || [];
      this.setData({ myGoods: list });
    },
    goPublish() { wx.navigateTo({ url: "/pages/publishGoods/publishGoods" }); },
    goSellerOrder() { wx.navigateTo({ url: "/pages/sellerOrder/sellerOrder" }); },
    delGoods(e) {
      let id = e.currentTarget.dataset.id;
      let list = this.data.myGoods.filter(i => i.id != id);
      wx.setStorageSync("sellerGoods", list);
      this.load();
    }
  });