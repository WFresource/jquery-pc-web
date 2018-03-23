var _api = '/dsj/dev/api';
var _root = '/dsj/dev/';


if (__DEV__) {
    _root = '/'
    _api = '/mock/5a703b3633891f26f5707dd0/api'
}


module.exports = {
    _API_: {
        login: _api + "/user/doLogin",
        logout: _api + "/user/doLogout",
        userInfo: _api + "/user/doGetUserInfo"
    },
    _ROOT_: _root,
    _DEBUG_: true


}
