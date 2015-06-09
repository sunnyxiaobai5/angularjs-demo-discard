angular.module("yn.utils").service("ynNotification",["$sce","ynModal",function($sce,ynModal){
	var ynNotification = {
			/**
			 * type:用于指定弹出框类型和控制图标样式,有三个值:warinng,error,sucess
			 * hint:弹出框的内容提要部分
			 * message:弹出框的内容详细部分
			 * okCallBack:点击确定按钮之后的回调
			 */
		confirm:function(type,hint,message,okCallBack){
			toastr.clear();
			var tmplPath = basePath + "/static/yineng/components/9-ynNotification/template/ynNotification.html";
			
			if(!okCallBack){
				okCallBack = function(){}
			}
			
			var confirmConfig = {
				title:"提示",
				button:[{
					value: '确定',
					autofocus: true,
					callback: okCallBack
				}, {
					value: '取消',
					callback: function() {}
				}]
			}
			
			message = $sce.trustAsHtml(message);
			ynModal.showModal(tmplPath,confirmConfig,{type:type,hint:hint,message:message});
		},
		/**
		 * type:用于指定弹出框类型和控制图标样式,有三个值:warinng,error,sucess
		 * hint:弹出框的内容提要部分
		 * message:弹出框的内容详细部分
		 * okCallBack:点击确定按钮之后的回调
		 */
		alert:function(type,hint,message,okCallBack){
			toastr.clear();
			var tmplPath = basePath + "/static/yineng/components/9-ynNotification/template/ynNotification.html";
			
			if(!okCallBack){
				okCallBack = function(){}
			}
			
			var confirmConfig = {
				title:"提示",
				button:[{
					value: '确定',
					autofocus: true,
					callback: okCallBack
				}]
			}
			
			message = $sce.trustAsHtml(message);
			ynModal.showModal(tmplPath,confirmConfig,{type:type,hint:hint,message:message});
		},
		/**
		 * type:用于指定弹出框类型和控制图标样式,有三个值:info,error,sucess
		 * message:提示框的内容部分
		 */
		notify:function(type,message){
			var loadingOptions = {
				"positionClass": "toast-top-center",
				"iconClasses": {
					info: 'toast-loading'
				}
			};
			var tipOptions = {
					"positionClass": "toast-top-center"
				};
			if(type){
				toastr.remove();
				if(type=="info"){
					toastr.options = loadingOptions;
					toastr.info(message);
				}
				if(type=="success"){
					toastr.options = tipOptions;
					toastr.success(message);
				}
				if(type=="error"){
					toastr.options = tipOptions;
					toastr.error(message);
				}
			}
		},
		notifyClear:function(){
			toastr.clear();
		},
        notifys:function(type,message,callBack){
            var loadingOptions = {
                "positionClass": "toast-top-center",
                "iconClasses": {
                    info: 'toast-loading'
                }
            };
            var tipOptions = {
                "positionClass": "toast-top-center"
            };
            if(type){
                toastr.remove();
                if(type=="info"){
                    toastr.options = loadingOptions;
                    toastr.info(message);
                    callBack();
                }
                if(type=="success"){
                    toastr.options = tipOptions;
                    toastr.success(message);
                    callBack();
                }
                if(type=="error"){
                    toastr.options = tipOptions;
                    toastr.error(message);
                    callBack();
                }
            }
        }
	};
	return ynNotification;
}]);