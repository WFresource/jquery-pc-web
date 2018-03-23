
function init() {
    var columns = [{
        field: 'id',
        title: '编号',
        width: 200,
        sortable: true
    },{
        field: 'name',
        title: '名称',
        sortable: true
    },{
        field: 'price',
        title: '价格',
        width: 200,
        sortable: true
    },{
        field: 'events',
        title: '操作',
        width: 200,
        formatter:function (value, row) {
            var str = '<button class="btn btn-primary">编辑</button><button style="margin-left: 10px;" class="btn btn-danger">删除</button>';
            return str;
        }
    }];

    $.tableList('b_example', '/mock/5a703b3633891f26f5707dd0/api/table/list', {}, columns, 'price', function(){
        console.log('表格加载成功');
    });

}

module.exports ={
    init:function () {
        init()
    }
};
