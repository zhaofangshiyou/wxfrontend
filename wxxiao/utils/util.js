const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const warnMsg = text => {
  wx.showToast({
    title: text,
    icon: 'none',
    duration: 2000,
    mask:true
})
}

//判断某个字符串是否为空
const CheckStr = value => {
  if(value == '' || value == null || value== undefined || JSON.stringify(value) == 'null') {
    return false;
  }else{
    return true;
  }
}

//将某个对象里面的null undefined 转化成""
const objectNull = object => {
 for(let key in object) {
   if(object[key] == null || object[key]== undefined || JSON.stringify(object[key]) == 'null') {
    object[key] = "";
   }
 }
 return object;
}

module.exports = {
  formatTime: formatTime,
  warnMsg: warnMsg,
  CheckStr: CheckStr,
  objectNull: objectNull
}
