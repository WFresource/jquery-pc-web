<-- 运行部署 -->

第一次开启加载

**npm install**

项目运行

**npm run dev**

项目打包

**npm run build**



<---------------------------------------实现添加 d 页面步骤 begin --------------------------------------->

**1、models: 添加目录**

/*     名称需要按这个标准 单页面
		
------------src/models
    
        -------d      页面目录
            |
            |---index.js *必有
            |
            |---d.html *必有 且 名称与页面目录一致
            |
            |---xxx.js
            |
            |---xxx.less ： id级别设置，防止冲突
*/

**2、routers模块设置**

/*   添加设置需要的模块路由

------------src/routes.js

在routes字段里面添加 d 模块的路由（不分次序）

    {
    
        model: 'd',      //*必有      名称与页面目录一致
        
        route: '/xxx'      //*必有    d 页面路由
    }
*/

**3、菜单添加目录**

/*   添加设置需要的模块路由

------------src/menus.js

在menus字段里面添加导航到 d 模块的菜单

    {
        title: 'd的标题',    //*必有    //菜单标题
        
        path: '/xxx',        //*必有     //与设置的d页面路由一致
        
        iconName: 'iconfont icon-yemian',   //*必有         //图标
        
    }
    
*/
<---------------------------------------实现添加 d 页面步骤 end --------------------------------------->

<---------------------------------------路由切换涉及的API begin --------------------------------------->
/*

**$.pathChange(path);**//路由切换

**$.setKey(key,value);**//传参

**$.getKey(key,value);**//获得传参

**$.setObject(key,object);**//传对象参数

**$.getObject(key,object);** //获得传参

<---------------------------------------路由切换涉及的API end --------------------------------------->

<---------------------------------------config begin --------------------------------------->

module.exports = {

    _API_: {
    
        login: _api + "/user/doLogin",//登录：返回 {code: '1',msg:'xxxx',data:{token:'xxx'}}
        
        logout: _api + "/user/doLogout",//注销登录
        
        userInfo: _api + "/user/doGetUserInfo"  //获取用户信息:返回 {code: '1',msg:'xxxx',data:{realName:'xxx'}}
    },
    
    _ROOT_: _root,//根目录
    
    _DEBUG_: true  //是否开启后端DEBUG
    
}


<---------------------------------------config end --------------------------------------->


<---------------------------------------前端设计 begin --------------------------------------->

	1:ui：使用jquery，bootstrap ;

	2:菜单：单独的菜单json，暂时不做任何的动态处理，根据json加载左侧菜单导航（限两级）；

	3:模块文件夹：单独的models文件夹，存放所有 页面文件；

	4:ajax封装，消息头传递debug参数
	
        beforeSend:function(request){
            request.setRequestHeader("token",string );//非登录的url
            request.setRequestHeader("IS_DEBUG",boolean );
        }
        
	返回数据：
        {
            code: '1', // 成功'1'; 失败'-1'
            data: [],
            msg: '',
            debug: [{
                log:'保存成功了',
                flag:'1'
            },{
                log:'获取时间失败了',
                flag:'0'
            }]
        }


	4:登录验证操作

<---------------------------------------前端设计 end --------------------------------------->
