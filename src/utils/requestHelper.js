
module.exports = {
    async sendAsync(req) {
        return new Promise((resolve, reject) => {
            getApp().$api.request({
                method: req.method || "GET",
                url: "https://www.sunfengfeng.com" + req.url,
                data: req.data,
                header: {
                    "content-type": "application/json"
                },
                success(res){
                    resolve(res)
                },
                fail(err) {
                    // reject(err)
                    wx.showToast({
                        title: err,
                        icon: 'none',
                        duration: 2000
                    })
                }
            });
        })
    },
    async request(req) {
        getApp().$api.request({
            method: req.method || "GET",
            url: "https://www.sunfengfeng.com" + req.url,
            data: req.data,
            header: {
                "content-type": "application/json"
            },
            success(res){
                req.success && req.success(res)
            },
            fail(err) {
                wx.showToast({
                    title: err,
                    icon: 'none',
                    duration: 2000
                })
            }
        });
    }
}