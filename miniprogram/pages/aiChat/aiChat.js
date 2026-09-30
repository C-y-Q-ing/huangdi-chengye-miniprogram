Page({
    data:{
      inputText:'',
      chatList:[],
      scrollId:'',
      isLoading:false,
      API_KEY:"sk-你的智谱API密钥",
      timeoutId:null
    },
    handleInput(e){
      this.setData({inputText:e.detail.value})
    },
    chooseImage(){
      const that=this;
      wx.chooseMedia({
        count:1,
        mediaType:['image'],
        sourceType:['camera','album'],
        success(res){
          that.handleImageSend(res.tempFiles[0].tempFilePath)
        }
      })
    },
    handleImageSend(imgPath){
      const that=this;
      const newList=[...that.data.chatList,{type:'user-image',content:imgPath},{type:'ai',content:"小橙子正在思考中..."}];
      that.setData({chatList:newList,scrollId:`msg-${newList.length-1}`,isLoading:true});
      wx.getFileSystemManager().readFile({
        filePath:imgPath,
        encoding:"base64",
        success(res){that.sendImageToAI(res.data)},
        fail(){
          that.replaceLoadingMessage("图片读取失败，请重试");
          that.setData({isLoading:false})
        }
      })
    },
    sendImageToAI(base64Str){
      const that=this;
      const {API_KEY}=that.data;
      that.setData({timeoutId:setTimeout(()=>{
        that.replaceLoadingMessage("回复超时，再问一次试试~");
        that.setData({isLoading:false})
      },15000)});
      wx.request({
        url:"https://open.bigmodel.cn/api/paas/v4/chat/completions",
        method:"POST",
        header:{
          "Authorization":`Bearer ${API_KEY}`,
          "Content-Type":"application/json"
        },
        data:{
          model:"glm-4v-flash",
          messages:[
            {role:"system",content:"脐橙专家，看图给出病害诊断+治疗方案+预防办法"},
            {role:"user",content:[{type:"text",text:"看图诊断脐橙病害，治疗+预防"},{type:"image_url",image_url:{url:"data:image/jpeg;base64,"+base64Str}}]}
          ],
          temperature:0.6
        },
        success(res){
          clearTimeout(that.data.timeoutId);
          if(res.data.choices&&res.data.choices.length>0){
            that.replaceLoadingMessage(res.data.choices[0].message.content)
          }else{
            that.replaceLoadingMessage("暂时无法识别")
          }
        },
        fail(){
          clearTimeout(that.data.timeoutId);
          that.replaceLoadingMessage("网络不好，信号断了")
        },
        complete(){that.setData({isLoading:false})}
      })
    },
    sendMessage(){
      const {inputText,chatList,isLoading,API_KEY}=this.data;
      if(!inputText.trim()||isLoading)return;
      const newList=[...chatList,{type:'user',content:inputText},{type:'ai',content:"小橙子正在思考中..."}];
      this.setData({chatList:newList,inputText:'',isLoading:true,scrollId:`msg-${newList.length-1}`});
      this.setData({timeoutId:setTimeout(()=>{
        this.replaceLoadingMessage("回复超时，再问一次试试~");
        this.setData({isLoading:false})
      },15000)});
      const context=[{role:"system",content:"脐橙专家，所有提问必须同时回复：当下治疗办法+后期预防措施，简短通俗"}];
      chatList.slice(-6).forEach(item=>{
        if(item.type==='user')context.push({role:'user',content:item.content});
        if(item.type==='ai')context.push({role:'assistant',content:item.content})
      });
      context.push({role:"user",content:inputText});
      const _this=this;
      wx.request({
        url:"https://open.bigmodel.cn/api/paas/v4/chat/completions",
        method:"POST",
        header:{
          "Authorization":`Bearer ${API_KEY}`,
          "Content-Type":"application/json"
        },
        data:{model:"glm-4-flash",messages:context,temperature:0.6},
        success(res){
          clearTimeout(_this.data.timeoutId);
          if(res.data.choices&&res.data.choices.length>0){
            _this.replaceLoadingMessage(res.data.choices[0].message.content)
          }else{
            _this.replaceLoadingMessage("小橙子没听懂，换个问法")
          }
        },
        fail(){
          clearTimeout(_this.data.timeoutId);
          _this.replaceLoadingMessage("网络不好，信号断了")
        },
        complete(){_this.setData({isLoading:false})}
      })
    },
    replaceLoadingMessage(text){
      const list=this.data.chatList;
      if(list.length>0&&list[list.length-1].content==="小橙子正在思考中..."){
        list.pop();
      }
      list.push({type:'ai',content:text});
      this.setData({chatList:list,scrollId:`msg-${list.length-1}`})
    }
  })