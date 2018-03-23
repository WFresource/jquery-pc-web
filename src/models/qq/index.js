module.exports = {
    init:function () {
        var a = $.getKey('a','success');
        var b = $.getObject('b',{id:'sssss'});
        console.log('拿到传递的参数',a,b)
    }
};