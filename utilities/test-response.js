module.exports = class TestResponse {
    statusCode = 0
    status(code) {
        this.statusCode = code
        return this
    }

    data = {}
    // Why we do this is so when we run
    // res.status.json or res.status.send
    // whatever was going to be sent to the
    // user instead gets saved in this res
    // varible as data that we can use to
    // test with.
    json(data) {
        this.data = data
    }

    send(data) {
        this.data = data
    }

    // Added setHeader so it will run with the
    // tests... this may just be set to do nothing.
    header = {}
    setHeader(info) {
        this.header = info
    }

};