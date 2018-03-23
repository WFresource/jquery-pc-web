/**
 * 左侧导航菜单
 */
var menus = [{
    title: 'a&b',
    iconName: 'iconfont icon-yunyinggailan',
    children: [{
        title: 'a',
        path: '/a',
        iconName: 'iconfont icon-yunyinggailan',
    }, {
        title: 'b',
        path: '/b',
        iconName: 'iconfont icon-yunyinggailan',
    }]
}, {
    title: 'c',
    iconName: 'iconfont icon-yunyinggailan',
    children: [{
        title: 'c',
        path: '/dynamic',
        iconName: 'iconfont icon-yunyinggailan',
    }, {
        title: 'tablediy',
        path: '/tablediy',
        iconName: 'iconfont icon-yunyinggailan',
    }]
}];

module.exports = {
    menus: menus
};
