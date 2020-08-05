[![Powered by Wechaty](https://img.shields.io/badge/Powered%20By-Wechaty-blue.svg)](https://github.com/chatie/wechaty)
[![Wechaty开源激励计划](https://img.shields.io/badge/Wechaty-开源激励计划-green.svg)](https://github.com/juzibot/Welcome/wiki/Everything-about-Wechaty)
[![node version](https://img.shields.io/badge/node-%3E%3D10-blue.svg)](http://nodejs.cn/download/)
[![node version](https://img.shields.io/badge/wechaty-%3E%3D0.40.5-blue.svg)](https://github.com/Chatie/wechaty)

## Twitter2Wechat
当前，[IFTTT](https://ifttt.com)应用相当广泛，连接了很多日常的应用，但是微信由于各种原因，尚不能接入。

感恩Wechaty API的出现，这个Twitter2Wechat 通过监听Twitter，在探测到有新Tweet发布后，会同步到预设的微信群里。

一个实际的应用是，我们有一个实况足球的小联盟[PESNALeague](https://www.PESNALeague.com)。如果有玩家在YouTube或Twitch上直播比赛对战的话，通过预设的IFTTT,直播的URL会在Twitter发布。之后，通过这个wechaty机器人，实现了在微信群的通告功能。

## 效果预览
<div style="display: flex;justify-content: flex-start">
[ ![](https://github.com/afterever/Twitter2Wechat/blob/master/images/small_Headerline_twitter2wechat.jpg) ](https://github.com/afterever/Twitter2Wechat/blob/master/images/Headerline_twitter2wechat.jpg)
</div>



## 项目说明

本项目是基于[wechaty](https://github.com/Chatie/wechaty)的个人开源项目，更多关于`wechaty`项目说明及api文档可以移步：[wechaty介绍](https://wechaty.js.org/v/zh/)

## 更多功能说明
移步：[https://www.xkboke.com/web-inn/secretary/client.html](https://www.xkboke.com/web-inn/secretary/client.html)

## 配置
`env.js` 文件中填入智能微秘书的apiKey 和 apiSecret [注册地址](https://wechat.aibotk.com/#/signup)

## 运行

克隆本项目，并进入项目根目录

第一步 `npm install`

第二步 `npm run pm2`(如果报错pm2找不到，请执行`npm install pm2 -g` 后重新执行此步骤)


## 高级功能(无法登录微信网页端朋友的福音)

如果你拥有了[wechaty](https://github.com/wechaty/wechaty)发放的ipad token，那么也可以直接使用本项目 （[ipad token 申请地址](https://github.com/juzibot/Welcome/wiki/Everything-about-Wechaty)）

### 提前安装依赖

```
npm i -g node-gyp
```

如果是win平台，还需进行


```
npm i -g windows-build-tools
```

### 配置ipad token
在`env.js`里填入你的ipadtoken即可

## docker 部署 （推荐）

一、创建一个`env.js`，并在`env.js`中填入相关的配置参数如下

```javascript
module.exports = {
    apiKey: '', //智能微秘书平台APIKEY （必填）
    apiSecret: '',//智能微秘书平台APISECRET （必填）
    ipadToken: '', // 如果有wechaty的ipad token可以填到此处，没有的话就不用填写 （非必填）
}

```

二、拉取镜像

```shell script
docker pull aibotk/wechat-assistant
```

三、运行镜像

```shell script
docker run -v 绝对路径/env.js:/home/app/env.js -d  aibotk/wechat-assistant
```
四、登录智能微助手平台扫码登录即可

登录地址：[https://wechat.aibotk.com/](https://wechat.aibotk.com/)


## 提前体验

如果很不幸你的微信无法登录网页端，同时`ipadtoken`还没有申请通过，请不要伤心，你还有我的小助手可以用来抚慰心伤，扫描下方二维码，我的智能微秘书会自动通过你的申请

![](https://user-gold-cdn.xitu.io/2019/2/28/1693401c6c3e6b02?w=430&h=430&f=png&s=53609)


## 捐助
如果您认为这个项目对你有所帮助，是否可以为它捐助一点资金呢？

不管钱多钱少，您的捐助将会激励我持续开发新的功能！🎉

感谢您的支持！

捐助方法如下：




## 更新日志

[更新日志](./CHANGELOG.md)
