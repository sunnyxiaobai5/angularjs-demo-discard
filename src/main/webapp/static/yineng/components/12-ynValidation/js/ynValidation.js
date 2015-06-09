angular.module("yn.utils").directive("ynValidation",function(){
    return{
        restrict:'A',//只能作为属性使用
        scope:{
            ynValidation:"="
        },
        require:'ngModel',//此指令依赖于ng-model指令，是为了是用当前表单元素的校验状态
        link:function($scope,$element,$attrs,ctrl){
            //整个方法需要设置延迟，目的是为在ngModal模态弹出框全部渲染完成了以后再执行，才能找到带onfocus的确认按钮。
            window.setTimeout(function(){


                var form = $element.closest("form");
                if(!(form.attr("isBind") == "isBind")){
                    //查找所有的带有验证指令的元素
                    var children = form.find("[yn-validation]");
                    //查找模态弹出框的确定按钮
                    var focButton = $(form.parents("tbody")[0]).find("[autofocus]");
                    //如果有
                    if(focButton && focButton.length>0){
                        $(focButton).click(function(){
                            angular.forEach(children,function(child){
                                $(child).keyup();
                            });
                        });
                    }
                    //标记此form已经绑定过全部验证按钮
                    form.attr("isBind","isBind");

                    //普通的按键
                    var button = form.find("[subButt]");
                    if(button.length>0){
                        $(button[0]).click(function(){
                            angular.forEach(children,function(child){
                                $(child).keyup();
                            });
                        });
                    }
                }

                //初始化，如果没有传初始值
                if(!$scope.ynValidation){
                    //后面加入提示信息的默认为block
                    $scope.ynInnerValidation = {
                        type:"block",//可选值为inline和block
                        content:""
                    };

                    $scope.custom = {fun:function(){return true;}};
                    $scope.tipHead = "";
                }else{
                    //如果用户没有输入自定义验证方法
                    if(!$scope.ynValidation.custom){
                        $scope.custom = {fun:function(){return true;}};
                    }else{
                        $scope.custom = $scope.ynValidation.custom;
                    }

                    //初始化是否为输入组
                    $scope.inputGroup = $scope.ynValidation.inputGroup;
                    //初始化提示头
                    $scope.tipHead = $scope.ynValidation.tipHead ? $scope.ynValidation.tipHead : "";
                    //是否是点击判断（类似组织机构这样）
                    $scope.isClick = $scope.ynValidation.isClick;

                    if(!$scope.ynValidation.type){
                        $scope.ynValidation.type = "block";
                    }

                    if(!$scope.ynValidation.content){
                        $scope.ynValidation.content = "";
                    }

                    $scope.ynInnerValidation = $scope.ynValidation;
                }

                $scope.ynValidationType = $scope.ynInnerValidation.type;
                $scope.ynValidationContent = $scope.ynInnerValidation.content;

                //构造提示内容的字段
                $scope.finalTipContent ;
                //默认加入为block
                $scope.tipHtml = '<span class="help-block" style="display:none;font-size:12px"></span>';
                //如果为inline
                if($scope.ynValidationType == "inline"){
                    $scope.tipHtml = '<span class="help-inline" style="display:none;font-size:12px"></span>';
                    $element.addClass("input-inline");
                }

                //判断是否是input-group
                $scope.element = $scope.inputGroup ? $element.closest(".input-group") : $element;

                $scope.element.after($scope.tipHtml);
                //使用jq获得刚刚添加的span元素
                $scope.tipSpan = $scope.element.next('span');

                //检测是否之前下面就有灰色的提示信息
                var emphasisInfo = $scope.element.next().next("[class='help-block']");
                if(emphasisInfo.length > 0){
                    $scope.emphasisInfo = angular.element(emphasisInfo[0]);
                }

                //需要验证的头名
//			$scope.tipHead = "";
                if($element.parent().prev("label") && !$scope.tipHead){
                    $scope.tipHead = $element.parent().prev("label").text();
                    $scope.tipHead = $scope.tipHead.replace(/\n|\*|\t|\r|\ /g,"");
                }

                //错误信息的存储对象
                var error = ctrl.$error;
                //一步步验证错误信息
                $scope.valiByStep = function(){
                    var tipContent = "";
                    //第一步判断是否为空
                    if(error.required){
                        tipContent = $scope.isSelect ? "请选择"+$scope.tipHead+"！" : $scope.tipHead+"不能为空！";
                        return tipContent;
                    }

                    //验证邮箱等格式
                    if(error.email){
                        tipContent = "邮箱格式不正确！";
                        return tipContent;
                    }

                    //第二步判读是否符合自定义正则表达式，必须有ynValidation.content
                    if(error.pattern && $scope.ynValidation && $scope.ynValidation.content){
                        if(0 == $scope.ynValidationContent.indexOf('@')){
                            tipContent = $scope.ynValidation.content.slice(1);
                        }else{
                            tipContent = $scope.ynValidation.content;
                        }
                        return tipContent;
                    }

                    //第三步判断是否超过最大，或最小长度
                    if(error.maxlength || error.minlength){
                        if($attrs['ngMinlength'] && $attrs['ngMaxlength']){
                            tipContent = $scope.ynValidationContent ? $scope.ynValidationContent : "只能输入"+$attrs['ngMinlength']+"-"+$attrs['ngMaxlength']+"个字！";
                            return tipContent;
                        }
                        if(error.maxlength){
                            tipContent = $scope.ynValidationContent ? $scope.ynValidationContent : "只能输入1-"+$attrs['ngMaxlength']+"个字！";
                            return tipContent;
                        }
                        //if(error.minlength){
                        //	tipContent = "只能输入大于"+$attrs['ngMinlength']+"个字符！";
                        //	return tipContent;
                        //}

                    }

                    //第四步，自定义逻辑判断
                    if(!$scope.custom.fun()){
                        tipContent = $scope.custom.content;
                        return tipContent;
                    }

                };

                //是否是选择标签
                $scope.isSelect = $element[0].localName == "select";

                $scope.validate = function(){
                    if(ctrl.$invalid || !$scope.custom.fun()){
                        if($scope.inputGroup){
                            $scope.element.parent("div").addClass("has-error");
                        }
                        $scope.element.closest("div").addClass("has-error");
                        $scope.tipSpan.html($scope.valiByStep());
                        $scope.tipSpan.show();

                        //如果有强调信息，隐藏
                        if($scope.emphasisInfo){
                            $scope.emphasisInfo.hide();
                        }
                    }else{
                        if($scope.inputGroup){
                            $scope.element.parent("div").removeClass("has-error");
                        }
                        $scope.element.closest("div").removeClass("has-error");
                        $scope.tipSpan.html('');
                        $scope.tipSpan.hide();

                        //如果有强调信息，显示
                        if($scope.emphasisInfo){
                            $scope.emphasisInfo.show();
                        }
                    }
                };

                //如果是select标签，绑定改变事件
                if($scope.isSelect){
                    $element.change(function(){
                        window.setTimeout(function(){
                            $scope.validate();
                        },10);
                    });
                }

                //需要观察ng-model的值,进行验证
                if($scope.isClick){
                    var index = 0;
                    $scope.$watch(function(){return ctrl.$modelValue},function(){
                        //加载页面,第一次时不判断
                        if(index > 0){
                            $scope.validate();
                        }
                        if(ctrl.$modelValue != undefined){
                            index ++;
                        }
                    });
                }

                //为当前jq对象绑定keyup事件
                $element.bind('keyup',function(){
                    $scope.validate();
                });


            },10);

        }
    };
});