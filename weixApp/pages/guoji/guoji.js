var app = getApp()
Page({
  onLoad: function(option){
    console.log(option);
    this.setData({ 
        varietyId: option.varietyId 
    }) 
  }
})