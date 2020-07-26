var express = require('express');
const qrTerm = require('qrcode-terminal')
const {
  Wechaty,
  Room,
  ScanStatus,
  log,
}               = require('wechaty')
const { PuppetPadplus } = require('wechaty-puppet-padplus')
var Monitor = require('./monitor.js');

var credentials = require('./credentials.js'); // SECRET
var env_settings = require('./environment_settings.json')[process.env.NODE_ENV || 'DEV']; // this stores the DEV & PROD settings
var common_settings = require('./environment_settings.json')['COMMON'];
console.log('[Environment]:', process.env.NODE_ENV);
console.log('[Settings]:', env_settings);
console.log('[Common]: ', common_settings);

const PORT = process.env.PORT || 3000;
// heroku website return something
var app = express();
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
app.get('/',(req,res) => {return res.send(common_settings.app_return_URL);});

const bot = new Wechaty({
  puppet: new PuppetPadplus({
     token: credentials.puppet_padplus_token,
  }),
  name: common_settings.wechat_login_name,
})


bot
.on('scan', (qrcode, status) => {
  qrTerm.generate(qrcode, { small: true })
  const qrcodeImageUrl = [
    'https://wechaty.github.io/qrcode/',
    encodeURIComponent(qrcode),
  ].join('')
  console.log(`[${status}] ${qrcodeImageUrl}\nScan QR Code above to log in: `)
})
.on('logout'  , user => log.info('Bot', `"${user.name()}" logged OUT`))
.on('error'   , e => log.info('Bot', 'error: %s', e))
.on('login', user => {
  console.log(`${user} logged IN`)
})
bot.start() // await

var m = new Monitor(credentials);
// console.log(m); // this prints Twitter account info

m.start(common_settings.twitter_user_id, '', env_settings .pooling_frequency * 1000); // polling every 30 seconds
m.on(common_settings.twitter_user_id, function(tweet) {
  console.log('Received a new tweet:\n', tweet);
  sayTweetInRoom(tweet.text.toString(), env_settings.chatroom_id + '@chatroom')
});


async function sayTweetInRoom(tweetText, roomID) {
  log.info('Running', 'sayTweetInRoom()')
  // .on('message', async function(msg) {
  //  console.log(msg.toString())
  // })
  try {
    // wait the bot for logging in
    while (!bot.logonoff()) {
      await new Promise(r => setTimeout(r, 100))
    }
    const room = await bot.Room.find({ id: roomID })
    if (!room) {
      log.info('Bot', 'ERROR: room not found')
      return
    }
    log.info('Found [Room ID]:', await room.id)
    log.info('[Room Topic]:', await room.topic())
    await room.say(tweetText)
  } catch (e) {
    log.error(e)
  }
  return 0
}
