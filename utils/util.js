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



// let API = "https://zhaoduishou.oss-cn-beijing.aliyuncs.com/";  //正式
let API = "https://zhaoduishoustg.oss-cn-beijing.aliyuncs.com/"; //测试


// let apiS = "https://app.tiaozhanmeiyitian.com";  //正式 
let apiS = "https://appstg.tiaozhanmeiyitian.com"; //测试   (index 页面也要改)



wx.showLoading({
  title: '加载中~',
  mask: true
})
//有权限的请求
function Request(url, data, method, successFn, failFn, completeFn) {
  if (url == '/api/uploadHeaderImg') {
    wx.showLoading({
      title: '正在上传',
      mask: true
    })

    wx.uploadFile({
      url: apiS + url,
      filePath: data,
      name: 'img',
      header: {
        "Content-Type": "multipart/form-data",
        "token": wx.getStorageSync('token'),
      },
      method: method,
      success: function (res) {
        wx.hideLoading()
        let data=JSON.parse(res.data)
        if (data.code == 2000) {
          successFn(res);

        } else if (data.code == 40101) {
          wx.showToast({
            title: '身份验证失败',
            icon: 'none',
            duration: 1500,
            mask: true
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '加载失败',
          icon: 'none',
          duration: 1500,
          mask: true
        })
        failFn(res);
      },
      complete: function () {
        wx.stopPullDownRefresh(); //停止下拉刷新
        wx.hideNavigationBarLoading() //完成停止加载
        completeFn();
      }
    })
  } else if (url == '/api/PersonalprofileImg'||url == '/api/uploadWonderImgs') {
    wx.showLoading({
      title: '正在上传',
      mask: true
    })
    wx.uploadFile({
      url: apiS + url,
      filePath: data,
      name: 'files',
      header: {
        "Content-Type": "multipart/form-data",
        "token": wx.getStorageSync('token'),
      },
      method: method,
      success: function (res) {
        wx.hideLoading()

        if (JSON.parse(res.data).code == 2000 || JSON.parse(res.data).code == 4003) {
          successFn(res);

        } else if (JSON.parse(res.data).code == 40101) {
          wx.showToast({
            title: '身份验证失败',
            icon: 'none',
            duration: 1500,
            mask: true
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '加载失败',
          icon: 'none',
          duration: 1500,
          mask: true
        })
        failFn(res);
      },
      complete: function () {
        wx.stopPullDownRefresh(); //停止下拉刷新
        wx.hideNavigationBarLoading() //完成停止加载
        completeFn();
      }
    })
  } else if (url == '/api/ComplainIstrueImgs') {
    wx.showLoading({
      title: '正在上传',
      mask: true
    })

    wx.uploadFile({
      url: apiS + url,
      filePath: data,
      name: 'files',
      header: {
        "Content-Type": "multipart/form-data",
        "token": wx.getStorageSync('token'),
      },
      method: method,
      success: function (res) {
        wx.hideLoading()
        if (res.data.code == 2000) {
          successFn(res);

        } else if (res.data.code == 40101) {
          wx.showToast({
            title: '身份验证失败',
            icon: 'none',
            duration: 1500,
            mask: true
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '加载失败',
          icon: 'none',
          duration: 1500,
          mask: true
        })
        failFn(res);
      },
      complete: function () {
        wx.stopPullDownRefresh(); //停止下拉刷新
        wx.hideNavigationBarLoading() //完成停止加载
        completeFn();
      }
    })
  } else if (url == '/api/uploadSiteImg') {
    wx.showLoading({
      title: '正在上传',
      mask: true
    })

    wx.uploadFile({
      url: apiS + url,
      filePath: data,
      name: 'files',
      header: {
        "Content-Type": "multipart/form-data",
        "token": wx.getStorageSync('token'),
      },
      method: method,
      success: function (res) {
        wx.hideLoading()
        if (JSON.parse(res.data).code == 2000) {
          successFn(res);
        } else if (JSON.parse(res.data).code == 40101) {
          wx.showToast({
            title: '身份验证失败',
            icon: 'none',
            duration: 1500,
            mask: true
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '加载失败',
          icon: 'none',
          duration: 1500,
          mask: true
        })
        failFn(res);
      },
      complete: function () {
        wx.stopPullDownRefresh(); //停止下拉刷新
        wx.hideNavigationBarLoading() //完成停止加载
        completeFn();
      }
    })
  } else if (url == '/api/feedBackImgs') {
    wx.showLoading({
      title: '正在上传',
      mask: true
    })

    wx.uploadFile({
      url: apiS + url,
      filePath: data,
      name: 'files',
      header: {
        "Content-Type": "multipart/form-data",
        "token": wx.getStorageSync('token'),
      },
      method: method,
      success: function (res) {
        wx.hideLoading()
        if (JSON.parse(res.data).code == 2000) {
          successFn(res);
        } else if (JSON.parse(res.data).code == 40101) {
          wx.showToast({
            title: '身份验证失败',
            icon: 'none',
            duration: 1500,
            mask: true
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '加载失败',
          icon: 'none',
          duration: 1500,
          mask: true
        })
        failFn(res);
      },
      complete: function () {
        wx.stopPullDownRefresh(); //停止下拉刷新
        wx.hideNavigationBarLoading() //完成停止加载
        completeFn();
      }
    })
  } else {
    wx.request({
      url: apiS + url,
      header: {
        "enctype": "multipart/form-data",
        "token": wx.getStorageSync('token'),
      },
      data: data,
      method: method,
      success: function (res) {
        if (res.data.code == 40101) {
          wx.showToast({
            title: '身份验证失败',
            icon: 'none',
            duration: 1500,
            mask: true
          })
        } else if (res.data.code == 4001||res.data.code == 4000) {
          // wx.showToast({
          //   title: '登录超时',
          //   icon: 'none',
          //   duration: 1500,
          //   mask: true
          // })
          wx.navigateTo({
            url: '/pages/authorization/authorization'
          })
         
          wx.hideLoading()
        } else {
          successFn(res);
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '加载失败',
          icon: 'none',
          duration: 1500,
          mask: true
        })
        failFn(res);
      },
      complete: function () {
        wx.stopPullDownRefresh(); //停止下拉刷新
        wx.hideNavigationBarLoading() //完成停止加载
        completeFn();
      }
    })
  }

}

//无权限的请求

function request(url, data, method, successFn, failFn, completeFn) {

  
  wx.request({
    url: apiS + url,
    data: data,
    method: method,
    header: {
      "enctype": "multipart/form-data"
    },
    success: function (res) {

      if (res.data.code == 2000 || res.data.code == undefined) {
        successFn(res);

      } else {
        if (res.data.msg) {
          let str = String(res.data.msg)
          wx.showToast({
            title: str,
            icon: 'none',
            duration: 1500,
            mask: true
          })
        } else {
          wx.showToast({
            title: '加载失败',
            icon: 'none',
            duration: 1500,
            mask: true
          })
        }

      }
    },
    fail: function (res) {
      wx.showToast({
        title: '加载失败',
        icon: 'none',
        duration: 1500,
        mask: true
      })
      failFn(res);
    },
    complete: function (res) {
      wx.hideNavigationBarLoading() //完成停止加载
      completeFn(res);
    }
  })
}




//首次注册上传头像

function imgRequest(url, data,formData, method, successFn, failFn, completeFn) {

  if (url == '/api/uploadHeaderImgWX') {
   
    wx.uploadFile({
      url: apiS + url,
      filePath: data,
      name: 'img',
      formData:formData,
      header: {
        "Content-Type": "multipart/form-data",
      },
      method: method,
      success: function (res) {
        if (res.data.code == 2000) {
          successFn(res);

        } else if (res.data.code == 40101) {
          wx.showToast({
            title: '身份验证失败',
            icon: 'none',
            duration: 1500,
            mask: true
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '加载失败',
          icon: 'none',
          duration: 1500,
          mask: true
        })
        failFn(res);
      },
      complete: function () {
        wx.stopPullDownRefresh(); //停止下拉刷新
        wx.hideNavigationBarLoading() //完成停止加载
        completeFn();
      }
    })
  }
 
}


function imgRequestTwo(url, data,formData, method, successFn, failFn, completeFn) {

  if (url == '/api/smallAppUpload') {
   
    wx.uploadFile({
      url: apiS + url,
      filePath: data,
      name: 'img',
      formData:formData,
      header: {
        "Content-Type": "multipart/form-data",
        "token": wx.getStorageSync('token'),
      },
      method: method,
      success: function (res) {
        let data=JSON.parse(res.data)
        if (data.code == 2000) {
          successFn(res);
        } else if (data.code == 40101) {
          wx.showToast({
            title: '身份验证失败',
            icon: 'none',
            duration: 1500,
            mask: true
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '加载失败',
          icon: 'none',
          duration: 1500,
          mask: true
        })
        failFn(res);
      },
      complete: function () {
        wx.stopPullDownRefresh(); //停止下拉刷新
        wx.hideNavigationBarLoading() //完成停止加载
        completeFn();
      }
    })
  }
 
}




module.exports = {
  formatTime: formatTime,
  imgRequestTwo:imgRequestTwo,
  request: request,
  Request: Request,
  imgRequest:imgRequest,
  apiS: apiS,
  API: API,
}