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

var warnMsg = text => {
  wx.showToast({
    title: text,
    icon: 'none',
    duration: 2000,
    mask:true
})
}

module.exports = {
  formatTime: formatTime,
  warnMsg: warnMsg
}
