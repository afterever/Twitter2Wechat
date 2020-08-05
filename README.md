[![Powered by Wechaty](https://img.shields.io/badge/Powered%20By-Wechaty-blue.svg)](https://github.com/chatie/wechaty)
[![Wechaty开源激励计划](https://img.shields.io/badge/Wechaty-开源激励计划-green.svg)](https://github.com/juzibot/Welcome/wiki/Everything-about-Wechaty)
[![node version](https://img.shields.io/badge/node-%3E%3D10-blue.svg)](http://nodejs.cn/download/)
[![node version](https://img.shields.io/badge/wechaty-%3E%3D0.40.5-blue.svg)](https://github.com/Chatie/wechaty)

## Twitter2Wechat
当前，[IFTTT](https://ifttt.com)应用相当广泛，连接了很多日常的应用，但是微信由于各种原因，尚不能接入。
感恩Wechaty API的出现，这个Twitter2Wechat 通过监听Twitter，在探测到有新Tweet发布后，会同步到预设的微信群里。
一个实际的应用是，我们有一个实况足球的小联盟[PESNALeague](https://www.PESNALeague.com)。如果有玩家在YouTube或Twitch上直播比赛对战的话，通过预设的IFTTT, 直播的URL会在Twitter发布。
之后，通过这个wechaty机器人，实现了在微信群的通告功能。


## 效果预览
[![Header Picture](https://github.com/afterever/Twitter2Wechat/blob/master/images/small_Headerline_twitter2wechat.jpg)](https://github.com/afterever/Twitter2Wechat/blob/master/images/Headerline_twitter2wechat.jpg)


## 项目说明
本项目是基于[wechaty](https://github.com/Chatie/wechaty)的个人开源项目，更多关于`wechaty`项目说明及api文档可以移步：[wechaty介绍](https://wechaty.js.org/v/zh/)
如果你拥有了[wechaty](https://github.com/wechaty/wechaty)发放的Padplus token，那么也可以直接使用本项目 （[PadPlus token 申请地址](https://github.com/juzibot/Welcome/wiki/Everything-about-Wechaty)）


## 主要程序
```shell script
1. index.js  // 项目主程序
2. twitter_monitor.js  // 通过监听Twitter
3. credentials.js  // 存放所有的authentication keys
```

## 配置
我们提供了credentials_example.js，如下所示。请移步[申请Twitter Developer API](https://developer.twitter.com/en/docs/basics/authentication/overview)四个token填入即可运行。
```shell script
module.exports = {
  // Twitter Devloper Account Credentials
  // Apply here: https://developer.twitter.com/en/docs/basics/authentication/overview
  consumer_key: 'fill_in_your__consumer_keyi',
  consumer_secret: 'fill_in_your__consumer_secret',
  access_token: 'fill_in_your__access_token',
  access_token_secret: 'fill_in_your__access_token_secret',

  // Twitter ID you wanted to monitor
  twitter_user_id: "fill_in_your_twitter_account",

  // WeChaty and Wechat information
  puppet_padplus_token: 'fill_in_your_puppet_padplus_token',
  wechat_chatroom_id : '555456789@chatroom',
}
```


## 核心代码
首先，感谢[Monitor Twitter](https://github.com/matthewpalmer/monitor-twitter)的开发者，我们发展了他们的主程序，实现了对Twitter账号的监听，具体的实现请参考twitter_monitor.js文件。
核心的程序如下图，在每30秒poll一次Twitter的情况下，如果检测到有新Tweet发布，我们抓取Tweet的text()，然后同步发布到微信Wechat预设的房间内。
[![Core Code](https://github.com/afterever/Twitter2Wechat/blob/master/images/core_code.jpg)](https://github.com/afterever/Twitter2Wechat/blob/master/images/core_code.jpg)


## 运行
克隆本项目，并进入项目根目录
第一步 `npm install`
第二步 `node index.js`


## 服务器Heroku 部署 (推荐)
代码写完了，我们需要一个服务器24/7运行，且最好是免费的:)
Wechaty的主要开发者Huan LI (李卓桓)写过一篇[博客文章](https://wechaty.github.io/heroku-deploy-button-for-wechaty-starter-template/)，且附带有[Heroku+Wechaty Getting Started例程](https://github.com/wechaty/heroku-wechaty-getting-started)，对我们的帮助很大。
Heroku免费提供每月500小时的服务器时间，分配到每天，几乎是20小时了，基本上够用了。他们提供的[Node.js Tutorial教程](https://devcenter.heroku.com/articles/getting-started-with-nodejs?singlepage=true)做，也写的非常详尽，一步步照着做完，也就学会了。
在他们的服务器上部署后，只要修改Procfile就可以带参数的运行了。


## 最后
本项目属于个人兴趣开发，开源出来是为了技术交流，请勿使用此项目做违反微信规定或者其他违法事情。
建议使用小号进行测试，有被微信封禁网页端登录权限的风险（客户端不受影响），请确保自愿使用。
如果有更多的问题，请留言，谢谢!


## 更新日志
./CHANGELOG.md (to be added)
