var sendRrquest = function (url,data,method) {
    if(method.toUpperCase() == 'POST'){
        url = url+ json2Form(data);
    }
    var promise = new Promise(function (resolve, reject) {
       //网络请求
       wx.request({
           url: url,
           data: data,
           method: method,
           header: {
            'Content-Type': 'application/x-www-form-urlencoded'
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

module.exports.sendRrquest = sendRrquest 