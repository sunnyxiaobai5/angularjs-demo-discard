angular.module("yn.utils").factory('Common', [
    '$http', '$q', function($http, $q) {
        return {
            loadScript: function(url, callback) {
                var head = document.getElementsByTagName("head")[0];
                var script = document.createElement("script");
                script.setAttribute("type", "text/javascript");
                script.setAttribute("src", url);
                script.setAttribute("async", true);
                script.setAttribute("defer", true);
                head.appendChild(script);
                //fuck ie! duck type
                if (document.all) {
                    script.onreadystatechange = function() {
                        var state = this.readyState;
                        if (state === 'loaded' || state === 'complete') {
                            callback && callback();
                        }
                    }
                }
                else {
                    //firefox, chrome
                    script.onload = function() {
                        callback && callback();
                    }
                }
            },
            loadCss: function(url) {
                var ele = document.createElement('link');
                ele.href = url;
                ele.rel = 'stylesheet';
                if (ele.onload == null) {
                    ele.onload = function() {
                    };
                }
                else {
                    ele.onreadystatechange = function() {
                    };
                }
                angular.element(document.querySelector('body')).prepend(ele);
            }
        }
    }
]);