//2020.12.05 移除报错模块 时段奖励、视频签到奖励，阅读时长奖励请自行点击领取

//2020.12.13, hahahrfool: bug fix, adapt for ac

const Notice = 1; //设置运行多少次才通知。
const log = 1; //设置0关闭日志,1开启日志

const $ = new Env("htt");

//====================================

const httid = "A";
const huitoutiao = "惠头条";

//++++++++++++++++++++++++++++++++-


const htt_video = process.env.HTT_VIDEONAME

//const htt_dongfangname = "htt_dongfangname" + httid;
const htt_dongfang =process.env.HTT_DONGFANGNAME

//const htt_smvideoname = "htt_smvideoname" + httid;
const htt_smvideo = process.env.HTT_SMVIDEONAME

//const htt_signurlckname = "htt_signurlckname" + httid;
const htt_signurlck = process.env.HTT_SIGNURLCKNAME

//const htt_signbdname = "htt_signbdname" + httid;
const htt_signbd = process.env.HTT_SIGNBDNAME



var htt_num = 0;
var htt_result = "";

const notify = $.isNode() ? require("./sendNotify") : "";

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
    timeout: 5000,
  };

  $.post(llUrl1, function (error, response, data) {
    
    if(error!=null)
    {
     console.log("error "+error)
      return
    }
    
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
    timeout: 5000,
  };

  $.post(llUrl1, function (error, response, data) {
     if(error!=null)
    {
     console.log("error "+error)
      return
    }
    
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
    timeout: 5000,
  };

  $.post(llUrl1, function (error, response, data) {

    if(error != null){
        console.log("htt error: "+error);
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
    timeout: 5000,
  };

  $.post(llUrl1, function (error, response, data) {
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
    
      sendNotifyFuncWrapper(tt, "[签到-时段-视频-阅读]", htt_result);
    
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

function sendNotifyFuncWrapper(x, y, z) {
    notify.sendNotify(x + "\n" + y + "\n" + z);
}

function sign(code) {
  code = unescape(code);
  var c = String.fromCharCode(code.charCodeAt(0) - code.length);
  for (var i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
  }
  return c;
}


// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,o)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let o=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");o=o?1*o:20,o=e&&e.timeout?e.timeout:o;const[r,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:o},headers:{"X-Key":r,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),o=JSON.stringify(this.data);s?this.fs.writeFileSync(t,o):i?this.fs.writeFileSync(e,o):this.fs.writeFileSync(t,o)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let o=t;for(const t of i)if(o=Object(o)[t],void 0===o)return s;return o}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),o=s?this.getval(s):"";if(o)try{const t=JSON.parse(o);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,o]=/^@(.*?)\.(.*?)$/.exec(e),r=this.getval(i),h=i?"null"===r?null:r||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,o,t),s=this.setval(JSON.stringify(e),i)}catch(e){const r={};this.lodash_set(r,o,t),s=this.setval(JSON.stringify(r),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)}):this.isQuanX()?$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:o,body:r}=t;e(null,{status:s,statusCode:i,headers:o,body:r},r)},t=>e(t)):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:o,body:r}=t;e(null,{status:s,statusCode:i,headers:o,body:r},r)},t=>e(t)))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:o,body:r}=t;e(null,{status:s,statusCode:i,headers:o,body:r},r)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:o,body:r}=t;e(null,{status:s,statusCode:i,headers:o,body:r},r)},t=>e(t))}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",o){const r=t=>{if(!t||!this.isLoon()&&this.isSurge())return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,r(o)):this.isQuanX()&&$notify(e,s,i,r(o)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
