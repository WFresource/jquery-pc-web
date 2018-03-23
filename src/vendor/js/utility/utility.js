var DEBUG = _DSJ_CONFIG_._DEBUG_;

function fetch(type, url, data, callback) {
    if (typeof data === "function") {
        callback = data;
        data = {};
    }

    var der = $.Deferred();
    $.ajax({
        beforeSend: function (request) {
            request.setRequestHeader("IS_DEBUG", DEBUG);
        },
        type: type,
        url: url,
        data: data,
        dataType: "json",
        cache: false,
        // contentType: "application/json;charset=UTF-8",
        success: function (rs, status, xhr) {
            if (DEBUG) {
                console.info(rs.debug);
            }
            console.log(status, xhr)
            console.log(xhr.getResponseHeader("Content-Type"));
            if (rs.mess === undefined) rs.mess = null;
            if (rs.code === -1) {

                if (__DEV__) {
                    location.href = "/login.html"
                } else {
                    location.href = "/dsj/dev/login.html"
                }


            } else if (rs.code === "1") {
                if (typeof callback === 'function') {
                    callback.call(this, rs.mess, rs.data);
                }
                der.resolveWith(this, [rs.mess, rs.data]);
            } else {

                der.rejectWith(this, [rs.mess]);
            }
        },
        error: function () {
            console.log("error")
            der.rejectWith(this);
        }
    });

    return der.promise();
}

$.extend({
    restGet: function () {
        return fetch.apply(this, ['GET'].concat(Array.prototype.slice.call(arguments, 0)));
    },
    restPost: function () {
        return fetch.apply(this, ['POST'].concat(Array.prototype.slice.call(arguments, 0)));
    },
    /**
     * 数组格式转树状结构
     * @param   {array}     array
     * @param   {String}    id
     * @param   {String}    pid
     * @param   {String}    children
     * @return  {Array}
     */
    arrayToTree: function (ar, id, pid, children) {
        var data = _.cloneDeep(ar)
        var result = []
        var hash = {}
        if (data.length == 0) return result;

        _.forEach(data, function (item, index) {

            hash[data[index][id]] = data[index]
        });

        _.forEach(data, function (item) {
            var hashVP = hash[item[pid]]
            if (hashVP) {
                !hashVP[children] && (hashVP[children] = [])
                hashVP[children].push(item)
            } else {
                result.push(item)
            }
        })


        return result
    }
});