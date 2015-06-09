angular.module("yn.utils").directive("ynChart",function(){
    return {
        restrict:"EA",
        template:"<div style='height:500px'></div>",
        scope:{
        	chartConfig:"="
        },
        transclude:true,
        replace:true,
        link:function($scope,$element,$attrs,transclude){
        	var canvas = $($element[0]);
            
            if($scope.chartConfig.domOption){
            	var domOption = $scope.chartConfig.domOption;
            	if(domOption.id){
            		canvas.attr("id",domOption.id); 
            	}
            	if(domOption.height){
            		canvas.height(domOption.height);
            	}
            	canvas.width(domOption.width);
            }
            var clickMe = function(node){
                //点击图表单元执行方法,并将当前点击图标单元对象传入
                $scope.chartConfig.clickEvent(node);
            }
            var initChart = function(){
                var myChart = echarts.init(canvas[0]);
                // 为echarts对象加载数据
                myChart.setOption($scope.chartConfig.chartOption);
                myChart.on(echarts.config.EVENT.CLICK, clickMe);
            }
            initChart();
            $scope.chartConfig.refreshChart = function(){
                initChart();
            }
        }
    }
});

