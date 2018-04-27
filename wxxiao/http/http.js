var sendRrquest = function (url,data,params,method) {
  console.log(wx.getStorageSync('token'));
    url = url+ jsonRestFull(data);
    console.log(url);
    var promise = new Promise(function (resolve, reject) {
       //网络请求
       wx.request({
           url: url,
           data: params,
           method: method,
           header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer'+wx.getStorageSync('token')
           },
           success: function(res) {
            resolve(res);
           },
           fail: function(res) {
                reject({error:'网络错误',code:0}); 
           },
           complete: function(res) {
           }
       })
    });
    return promise;
};

function json2Form(json) {
    var str = []; 
    for(var p in json){
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
    }
    var new_str = '?'+ str.join("&");
    return new_str;
  }

function jsonRestFull(json) {
  var str = [];
  for(var p in json) {
    str.push(encodeURIComponent(p) + "/" + encodeURIComponent(json[p])); 
  }
  var new_str = '/'+ str.join("/");
    return new_str;
}

module.exports.sendRrquest = sendRrquest 