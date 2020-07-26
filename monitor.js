var fs = require('fs');
var events = require('events');
var spawn = require('child_process').spawn;
var Twit = require('twit');
var _ = require('underscore');

var monitor_is_initialized = false;

function Monitor(credentials) {
  var T = new Twit({
    consumer_key: credentials.consumer_key,
    consumer_secret: credentials.consumer_secret,
    access_token: credentials.access_token,
    access_token_secret: credentials.access_token_secret
  });


  var self = this;

  this.T = T;

  // The events we emit.
  var Event = {
    NewMatchingTweet: 'NewMatchingTweet'
  };

  var eventEmitter = new events.EventEmitter();

  this.newTweet = eventEmitter;

  this.mostRecentTweet = {};

  this.watchTwitter = function watchTwitter(account, pattern, interval) {
    setInterval(function() {
      self.pollTwitter(account, pattern);
    }, interval);
  };

  this.pollTwitter = function pollTwitter(account, pattern) {
    console.log('Polling twitter [account]:', account);
    var path = 'statuses/user_timeline';

    var options = {
      'screen_name': account,
      'trim_user': 'true',
      'exclude_replies': 'true'
    };


    // If we've already gotten a list of tweets,
    // we only want to get the ones *after* the one we have stored.
    if (self.mostRecentTweet[account]) {
      options.since_id = self.mostRecentTweet[account];
    }

    T.get(path, options, function(err, data, response) {
      data = self.stripData(data);
      data = self.matchPattern(data, pattern);

      if (data.length > 0) {
        // cannot use the for loop all time
        // during initialization, the options.since_id is undefined, so this for() will post all messages
        if (monitor_is_initialized) {
          for (var i=data.length-1; i>=0; i--) {
            self.newMatchingTweet(account, data[i]);
          }
        } else {
            self.newMatchingTweet(account, data[0]);
        }

      }
    });
  };

  this.newMatchingTweet = function newMatchingTweet(account, tweet) {
    var didFindNewerTweet = tweet.id > (self.mostRecentTweet[account] || 0);

    if (monitor_is_initialized) {
      if (didFindNewerTweet) {
        self.mostRecentTweet[account] = tweet.id;
        self.emitNotificationForNewTweet(account, tweet);
      }
    } else {
      console.log('Monitor Initialized with tweet\n', tweet);
      self.mostRecentTweet[account] = tweet.id;
      monitor_is_initialized = true;
    }

  };

  this.stripData = function stripData(data) {
    return _.map(data, function(d) {
        return {text: d.text, id: d.id, created_at: d.created_at, source: d.source};
      });
  };

  this.matchPattern = function matchPattern(data, pattern) {
    return _.filter(data, function(d) {
      return d.text.match(pattern);
    });
  };

  this.emitNotificationForNewTweet = function emitNotificationForNewTweet(account, tweet) {
    tweet.account = account;
    self.emit(account, tweet);
  };
}

Monitor.prototype = new events.EventEmitter;
Monitor.prototype.start = function(account, pattern, interval) {
  var regex = new RegExp(pattern);
  this.watchTwitter(account, regex, interval);
};

module.exports = Monitor;
