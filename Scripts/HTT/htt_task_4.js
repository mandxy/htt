//2020.12.05 移除报错模块 时段奖励、视频签到奖励，阅读时长奖励请自行点击领取

//2020.12.13, hahahrfool: edit

const Notice = 1; //设置运行多少次才通知。
const log = 1; //设置0关闭日志,1开启日志

//====================================

const $iosrule = iosrule(); //声明必须
const httid = "A";
const huitoutiao = "惠头条";

//++++++++++++++++++++++++++++++++-

const htt_videoname = "htt_videoname" + httid;
const htt_video = $iosrule.read(htt_videoname);

const htt_dongfangname = "htt_dongfangname" + httid;
const htt_dongfang = $iosrule.read(htt_dongfangname);
const htt_smvideoname = "htt_smvideoname" + httid;
const htt_smvideo = $iosrule.read(htt_smvideoname);

const htt_signurlckname = "htt_signurlckname" + httid;
const htt_signurlck = $iosrule.read(htt_signurlckname);

const htt_signbdname = "htt_signbdname" + httid;
const htt_signbd = $iosrule.read(htt_signbdname);
var htt_num = 0;
var htt_result = "";

//++++++++++++++++++++++++++++++++

htt_coinall();

//++++++++++++++++++++++++++++++++

function htt_read_dongfang() {
  var result1 = "【阅读奖励】";
  var result2 = "";
  var tt = huitoutiao;
  const llUrl1 = {
    url:
      "https://api.cashtoutiao.com/frontend/read/sych/duration?" +
      htt_signurlck,
    headers: {
      "Content-Type": "application/json",
      "User-Agent":
        "Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
    },
    body: htt_find(htt_dongfang),
    timeout: 60,
  };

  $iosrule.post(llUrl1, function (error, response, data) {
    if (log == 1) console.log("阅读" + data);
    var obj = JSON.parse(data);

    if (obj.statusCode == 200) {
      if (data.indexOf("失败") < 0) {
        result2 =
          "💰[金币]" +
          obj.incCredit +
          " [今日阅读时长]" +
          formatSeconds(obj.todayDuration);
      } else {
        result2 = obj.msg;
        if (result2.indexOf("稍后") > 0)
          result2 = "阅读间隔不达标，自动跳过。✌🏻️";
        result1 = "【阅读奖励失败】";
      }

      htt_msg(result1 + "\n" + result2 + "\n");
    }
  });
}

function htt_read_video() {
  var result1 = "【看视频奖励】";
  var result2 = "";
  var tt = huitoutiao;

  const llUrl1 = {
    url:
      "https://api.cashtoutiao.com/frontend/read/sych/duration?" +
      htt_signurlck,
    headers: {
      "Content-Type": "application/json",
      "User-Agent":
        "Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
    },
    body: htt_find(htt_video),
    timeout: 60,
  };

  $iosrule.post(llUrl1, function (error, response, data) {
    if (log == 1) console.log("视频" + data);
    var obj = JSON.parse(data);

    if (obj.statusCode == 200) {
      if (data.indexOf("失败") < 0) {
        result2 =
          "💰[金币]" +
          obj.incCredit +
          " [今日看视频时长]" +
          formatSeconds(obj.todayDuration);
      } else {
        result2 = obj.msg;
        if (result2.indexOf("稍后") > 0)
          result2 = "视频间隔不达标，自动跳过。✌🏻️";
        result1 = "【看视频奖励失败】";
      }
    } else result2 = "请求失败*";
    htt_msg(result1 + "\n" + result2 + "\n");
  });
}

function htt_read_smvideo() {   //hahahrfool: since it's the last one called, we should call done() here.
  var result1 = "【看小视频奖励】";
  var result2 = "";
  var tt = huitoutiao;

  const llUrl1 = {
    url:
      "https://api.cashtoutiao.com/frontend/read/sych/duration?" +
      htt_signurlck,
    headers: {
      "Content-Type": "application/json",
      "User-Agent":
        "Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
    },
    body: htt_find(htt_smvideo),
    timeout: 60,
  };

  $iosrule.post(llUrl1, function (error, response, data) {

    if(error != null){
        console.log("htt error: "+error);
        $done()
        return;
    }

    if (log == 1) console.log("小视频" + data);
    var obj = JSON.parse(data);

    if (obj.statusCode == 200) {

      if (data.indexOf("失败") < 0) {
        result2 =
          "💰[金币]" +
          obj.incCredit +
          " [今日看小视频时长]" +
          formatSeconds(obj.todayDuration);


      } else {
        result2 = obj.msg;
        if (result2.indexOf("稍后") > 0)
          result2 = "小视频间隔不达标，自动跳过。✌🏻️";
        result1 = "【看小视频奖励失败】";


      }
    } else result2 = "请求失败*";

    
    htt_msg(result1 + "\n" + result2 + "\n");


    $done()

  });
}

function htt_readtotal() {
  var result1 = "【收益统计】";
  var result2 = "";
  var tt = huitoutiao;
  const llUrl1 = {
    url:
      "https://api.cashtoutiao.com/frontend/read/detail/today?" + htt_signurlck,
    headers: {
      "Content-Type": "application/json",
      "User-Agent":
        "Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
    },
    body: htt_signbd,
    timeout: 60,
  };

  $iosrule.post(llUrl1, function (error, response, data) {
    var obj = JSON.parse(data);

    if (obj.statusCode == 200) {
      result2 =
        "[总金币]" +
        obj.userDailyReadRecord.durationCredit +
        "💰 " +
        formatSeconds(obj.userDailyReadRecord.totalDuration) +
        "\n" +
        "[观看视频]" +
        obj.userDailyReadRecord.videoDurationCredit +
        "💰" +
        formatSeconds(obj.userDailyReadRecord.videoDuration) +
        "\n" +
        "[观看小视频]" +
        obj.userDailyReadRecord.smallVideoDurationCredit +
        "💰" +
        formatSeconds(obj.userDailyReadRecord.smallVideoDuration) +
        " " +
        "\n" +
        "[分享收益]" +
        obj.userDailyReadRecord.shareClickCredit +
        "💰";
      htt_msg(result1 + "\n" + result2 + "\n");
    }
  });
}

function htt_msg(r) {
  var tt = huitoutiao;
  htt_num++;
  htt_result += r;
  if (log == 1) console.log(htt_num);
  if (htt_num == 7) {
    var loon = $iosrule.read("iosrule");
    if (typeof loon != "undefined") {
      loon = loon.substring(7, loon.length);
      loon++;
      console.log("惠头条第" + loon + "次运行");
      $iosrule.write("iosrule" + loon, "iosrule");
    } else {
      loon = 1;
      $iosrule.write("iosrule" + loon, "iosrule");
    }
    if (loon % Notice == 0) {
      papa(tt, "[签到-时段-视频-阅读]" + "当前运行" + loon + "次", htt_result);
      loon = 0;
      $iosrule.write("iosrule" + loon, "iosrule");
      loon = 0;
      htt_result = "";
      $iosrule.write("iosrule" + loon, "iosrule");
    }
  }
}

function htt_coinall() {
  setTimeout(function () {
    htt_read_dongfang();
  }, 6 * 100);

  setTimeout(function () {
    htt_read_video();
  }, 32 * 1000);

  setTimeout(function () {
    htt_read_smvideo();
  }, 63 * 1000);
}

function htt_find(bd) {
  if (JSON.parse(bd).hasOwnProperty("token")) {
    bd = JSON.parse(bd);
    delete bd["token"];
    bd = JSON.stringify(bd);
    return bd;
  } else return bd;
}

function formatSeconds(value) {
  let result = parseInt(value);
  let h =
    Math.floor(result / 3600) < 10
      ? "0" + Math.floor(result / 3600)
      : Math.floor(result / 3600);
  let m =
    Math.floor((result / 60) % 60) < 10
      ? "0" + Math.floor((result / 60) % 60)
      : Math.floor((result / 60) % 60);
  let s =
    Math.floor(result % 60) < 10
      ? "0" + Math.floor(result % 60)
      : Math.floor(result % 60);

  let res = "";
  if (h !== "00") res += `${h}小时`;
  if (m !== "00") res += `${m}分`;
  res += `${s}秒`;
  return res;
}

function papa(x, y, z) {
  $iosrule.notify(x, y, z);
}

function sign(code) {
  code = unescape(code);
  var c = String.fromCharCode(code.charCodeAt(0) - code.length);
  for (var i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
  }
  return c;
}

function iosrule() {
  const isRequest = typeof $request != "undefined";
  const isSurge = typeof $httpClient != "undefined";
  const isQuanX = typeof $task != "undefined";
  const notify = (title, subtitle, message) => {
    if (isQuanX) $notify(title, subtitle, message);
    if (isSurge) $notification.post(title, subtitle, message);
  };
  const write = (value, key) => {
    if (isQuanX) return $prefs.setValueForKey(value, key);
    if (isSurge) return $persistentStore.write(value, key);
  };
  const read = (key) => {
    if (isQuanX) return $prefs.valueForKey(key);
    if (isSurge) return $persistentStore.read(key);
  };
  const get = (options, callback) => {
    if (isQuanX) {
      if (typeof options == "string") options = { url: options };
      options["method"] = "GET";
      $task.fetch(options).then(
        (response) => {
          response["status"] = response.statusCode;
          callback(null, response, response.body);
        },
        (reason) => callback(reason.error, null, null)
      );
    }
    if (isSurge) $httpClient.get(options, callback);
  };
  const post = (options, callback) => {
    if (isQuanX) {
      if (typeof options == "string") options = { url: options };
      options["method"] = "POST";
      $task.fetch(options).then(
        (response) => {
          response["status"] = response.statusCode;
          callback(null, response, response.body);
        },
        (reason) => callback(reason.error, null, null)
      );
    }
    if (isSurge) $httpClient.post(options, callback);
  };
  const end = () => {
    if (isQuanX) isRequest ? $done({}) : "";
    if (isSurge) isRequest ? $done({}) : $done();
  };
  return { isRequest, isQuanX, isSurge, notify, write, read, get, post, end };
}
