
require('./a.less')
var x=require('./x')

function a() {
    console.log("a.js",x.x(),$("#aa"))
    $("#aa").text(1111)

}

module.exports = {

    init:function () {
        a()
    }
}


