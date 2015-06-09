angular.module("yn.utils").service("ynModal",["$http","$rootScope","$compile",function($http, $rootScope, $compile){

    var ynModal = {
        showModal:function(content, modalConfig, scope){
        	//弹出框的域对象
        	var modalScope;
        	
            var id = (modalConfig && modalConfig.id) ? modalConfig.id : Math.floor(Math.random() * 100000000000000001),
                defaultConfig = {id: id, title: "弹出框",backdropOpacity:".2"},
                configSettings = {},
                backdropDomEl = null;
            //设置参数--用于生成artDialog的配置
            angular.extend(configSettings, defaultConfig, modalConfig);
            
        	/**
        	 * 检测域对象不存在或者不是作用域Scope的实例
        	 */
            if(!scope){
            	modalScope = $rootScope.$new();
            }else if(!scope.$new && !scope.$watch && !scope.$digest && !scope.$destroy){
        		modalScope = $rootScope.$new();
                angular.forEach(scope, function(value, key){
                	modalScope[key] = value;
                });
        	}else{
        		modalScope = scope;
        	}
        	
            var ynModal = dialog(configSettings);
            if(/\.html$|\.htm$/.test(content)){
                $http.get(content).success(function(data, status){
                    if(status == 200){
                        backdropDomEl = $compile($(data))(modalScope);
                        ynModal.content(backdropDomEl);
                    }
                });
            }else{
                backdropDomEl = $compile($(content))(modalScope);
                ynModal.content(backdropDomEl);
            }
            ynModal.showModal();
        }
    }

    return ynModal;

}]);