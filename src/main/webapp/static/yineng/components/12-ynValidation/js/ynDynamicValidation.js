/**
 * Created by YN on 2015/4/10.
 */

angular.module("yn.utils").directive("ynDynamicValidation",function(){
    return{
        restrict:'A',//只能作为属性使用
        scope:{
            ngRequire:"="
        },
        require:'ngModel',//此指令依赖于ng-model指令，是为了是用当前表单元素的校验状态
        link:function($scope,$element,$attrs,ctrl){
            if (!ngModel) {
                return;
            }
            attrs.$observe('ngRequire', function(value){
                if(value=="true"){
                    $element.attr('required', '');
                    $element.attr('yn-validation','');
                    el.removeAttr('requireiftrue');
                    $compile($element[0])($scope);
                }
            });
        }
    };
});
