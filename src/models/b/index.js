require('./b.less')

function b() {
    console.log("b.js")
}

module.exports = {

    init:function () {
        b()
    }
}