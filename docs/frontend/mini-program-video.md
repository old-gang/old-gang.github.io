---
title: 微信小程序中视频的播放与暂停
abbrlink: 3c948b41
date: 2022-08-09 21:44:23
tags: web前端
---

# 微信小程序中视频的播放与暂停

## 在微信小程序中实现视频的播放与暂停

#### 需求：

- 视频列表中只能有一个视频在播放
- 点击视频实现播放与暂停功能
- 加载完成显示图片，点击后变为视频播放
- 从上次播放的位置进行播放

#### 思路：

- 定义一个标记变量，控制视频的播放与暂停

  - true => 本次问播放
  - false => 本次为暂停

- 每次点击后，更新data中视频的id值

- 声明一个数组，用于存放播放视频的id和播放时间

  ```js
    {
        vid:xxx,
        currentTime:xxx  
    }
  ```



事件的流程图

![视频的播放与暂停](https://chu-image-host.oss-cn-beijing.aliyuncs.com/img/%E8%A7%86%E9%A2%91%E7%9A%84%E6%92%AD%E6%94%BE%E4%B8%8E%E6%9A%82%E5%81%9C.jpg)

#### 代码实现：

静态

```html
<!-- 使用scroll-view组件 -->  
<scroll-view class="scroll_video" enable-flex scroll-y>
    <view class="scroll_videoList_item" wx:for="{{videoList}}" wx:key="index">
      <!-- 注意这个id是标签属性，
        点击视频标签，事件的回调 event属性会获取到这个id值
        item.data.vid == vid => 点击获取到id
		bindtimeupdate：视频的进度条发生变化时触发
			通过event.detail.currentTime获取播放的时间(详见官网)
       -->
      <video 
        src="{{item.data.urlInfo.url}}" 
        id="{{item.data.vid}}" 
        class="scroll_video_item" 
        wx:if="{{vid == item.data.vid ? isPlay? true : false :false}}"
        bindtap="clickVideo"
        poster="{{item.data.coverUrl}}"
        bindtimeupdate="handlerUpdate"
      ></video>
      <!-- 视频加载的时候使用图片代替，点击时切换为视频 -->
      <image 
        id="{{item.data.vid}}" 
        class="scroll_img_item" 
        src="{{item.data.coverUrl}}" 
        bindtap="clickVideo"
        wx:else
      ></image>
    </view>
  </scroll-view>
```

逻辑：

```js
 //页面中使用到的数据
data: {
    // 保存点击的nav id
    clickId: '',
    // 保存视频的数据
    videoList: [],
    // 保存点击的视频的id
    vid: '',
    // 控制视频是否播放
    isPlay: true,   //为true =>这一次为播放,为false => 这一次为暂停
  },
      
  //视频的播放与暂停
 clickVideo(event) {
    // 获取用户点击视频的id
    // console.log(event.currentTarget.id);
    let vid = event.currentTarget.id
    // 创建视频的上下文与video组件进行一一关联
    if (!this.player) {
      // 没有视频的上下文，创建一个
      this.player = wx.createVideoContext(vid)
      // 播放视频
      this.player.play()
      // 存储这次点击的视频的id
      this.setData({
        vid
      })
    } else {
      // 有视频上下文了
      if (vid != this.data.vid) {
        // 说明再次点击的是其他的视频
        // 暂停上一个视频 -> 创建一个新的视频上下文 -> 播放这个视频
        this.player.pause()
        this.player = wx.createVideoContext(vid)
        this.player.play()
        this.setData({
          isPlay: true,//只要id不同，都是暂停上一次，播放这一次!!!
          vid
        })
      } else {
        // 说明第二次点击的是正在播放的视频
        if(this.data.isPlay){
          // 上一次的为播放，这一次需要暂停
          this.player.pause()
          // 修改状态
          this.setData({
            isPlay:false,
          })
        }else {
          // 上一次为暂停，这一次需要播放
          this.player.play()
          this.setData({
            isPlay:true,
          })
        }
      }
    }
  },
      
  // 视频播放的时间
  handlerUpdate(event) {
    const { videoUpdataTime } = this.data
    // 定义一个存储视频id和时间的对象
    const updateTime = {
      vid: event.currentTarget.id,
      currentTime: event.detail.currentTime,
    }
    // 如果数组里有时间，则更新时间，如果没有事件，则添加这个对象
    let updateItem = videoUpdataTime.find(item => item.vid == updateTime.vid)
    if (updateItem) {
      // 有，更新时间
      updateItem.currentTime = event.detail.currentTime
    } else {
      // 没有，添加整个对象
      videoUpdataTime.push(updateTime)
    }
    // 更新数据
    this.setData({
      videoUpdataTime,
    })
  },
```



#### 总结：

- 没有思路的时候，可以画一个流程图，不要空想 :cry:
- 多看文档！多看文档！多看文档！重要的事情说三遍
- 需要注意的是，如果在微信开发者工具中测试有bug，但是代码检查不出问题，试试真机测试，会有意想不到的结果 :smile:
