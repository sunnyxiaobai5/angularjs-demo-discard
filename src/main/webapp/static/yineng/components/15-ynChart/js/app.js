var echartsApp = angular.module("echartsApp",["yn.utils"]);

echartsApp.controller("echartsController",["$scope",function($scope){

    $scope.optionsC =  {
        title : {
            text: '某地区蒸发量和降水量',
            subtext: '纯属虚构'
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            //data:['蒸发量','降水量']
            data:['降水量']
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            /*{
                name:'蒸发量',
                type:'bar',
                data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                }
            },*/
            {
                name:'降水量',
                type:'bar',
                data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                markPoint : {
                    data : [
                        {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183, symbolSize:18},
                        {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name : '平均值'}
                    ]
                }
            }
        ]
    };
    
    $scope.chartConfig = {
    	domOption:{
    		//id:"Hello",
    		//height:"500px",
    		width:"60%"
    	},
    	chartOption:$scope.optionsC,
    	clickEvent:function(node){
    		console.log("我被点了。我是被逼的。。");
    		console.log(node);
    	}
    }



    var idx = 1;
   
    $scope.optionB = {};
    
    $scope.optionB.timeline = {
        data : [
            '2013-01-01', '2013-02-01', '2013-03-01', '2013-04-01', '2013-05-01',
            { name:'2013-06-01', symbol:'emptyStar6', symbolSize:8 },
            '2013-07-01', '2013-08-01', '2013-09-01', '2013-10-01', '2013-11-01',
            { name:'2013-12-01', symbol:'star6', symbolSize:8 }
        ],
        label : {
            formatter : function(s) {
                return s.slice(0, 7);
            }
        }
    };
    
    $scope.optionB.options = [
        {
            title : {
                text: '浏览器占比变化',
                subtext: '纯属虚构'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                data:['Chrome','Firefox','Safari','IE9+','IE8-']
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            series : [
                {
                    name:'浏览器（数据纯属虚构）',
                    type:'pie',
                    center: ['50%', '45%'],
                    radius: '50%',
                    data:[
                        {value: idx * 128 + 80,  name:'Chrome'},
                        {value: idx * 64  + 160,  name:'Firefox'},
                        {value: idx * 32  + 320,  name:'Safari'},
                        {value: idx * 16  + 640,  name:'IE9+'},
                        {value: idx++ * 8  + 1280, name:'IE8-'}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'浏览器（数据纯属虚构）',
                    type:'pie',
                    data:[
                        {value: idx * 128 + 80,  name:'Chrome'},
                        {value: idx * 64  + 160,  name:'Firefox'},
                        {value: idx * 32  + 320,  name:'Safari'},
                        {value: idx * 16  + 640,  name:'IE9+'},
                        {value: idx++ * 8  + 1280, name:'IE8-'}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'浏览器（数据纯属虚构）',
                    type:'pie',
                    data:[
                        {value: idx * 128 + 80,  name:'Chrome'},
                        {value: idx * 64  + 160,  name:'Firefox'},
                        {value: idx * 32  + 320,  name:'Safari'},
                        {value: idx * 16  + 640,  name:'IE9+'},
                        {value: idx++ * 8  + 1280, name:'IE8-'}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'浏览器（数据纯属虚构）',
                    type:'pie',
                    data:[
                        {value: idx * 128 + 80,  name:'Chrome'},
                        {value: idx * 64  + 160,  name:'Firefox'},
                        {value: idx * 32  + 320,  name:'Safari'},
                        {value: idx * 16  + 640,  name:'IE9+'},
                        {value: idx++ * 8  + 1280, name:'IE8-'}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'浏览器（数据纯属虚构）',
                    type:'pie',
                    data:[
                        {value: idx * 128 + 80,  name:'Chrome'},
                        {value: idx * 64  + 160,  name:'Firefox'},
                        {value: idx * 32  + 320,  name:'Safari'},
                        {value: idx * 16  + 640,  name:'IE9+'},
                        {value: idx++ * 8  + 1280, name:'IE8-'}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'浏览器（数据纯属虚构）',
                    type:'pie',
                    data:[
                        {value: idx * 128 + 80,  name:'Chrome'},
                        {value: idx * 64  + 160,  name:'Firefox'},
                        {value: idx * 32  + 320,  name:'Safari'},
                        {value: idx * 16  + 640,  name:'IE9+'},
                        {value: idx++ * 8  + 1280, name:'IE8-'}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'浏览器（数据纯属虚构）',
                    type:'pie',
                    data:[
                        {value: idx * 128 + 80,  name:'Chrome'},
                        {value: idx * 64  + 160,  name:'Firefox'},
                        {value: idx * 32  + 320,  name:'Safari'},
                        {value: idx * 16  + 640,  name:'IE9+'},
                        {value: idx++ * 8  + 1280, name:'IE8-'}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'浏览器（数据纯属虚构）',
                    type:'pie',
                    data:[
                        {value: idx * 128 + 80,  name:'Chrome'},
                        {value: idx * 64  + 160,  name:'Firefox'},
                        {value: idx * 32  + 320,  name:'Safari'},
                        {value: idx * 16  + 640,  name:'IE9+'},
                        {value: idx++ * 8  + 1280, name:'IE8-'}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'浏览器（数据纯属虚构）',
                    type:'pie',
                    data:[
                        {value: idx * 128 + 80,  name:'Chrome'},
                        {value: idx * 64  + 160,  name:'Firefox'},
                        {value: idx * 32  + 320,  name:'Safari'},
                        {value: idx * 16  + 640,  name:'IE9+'},
                        {value: idx++ * 8  + 1280, name:'IE8-'}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'浏览器（数据纯属虚构）',
                    type:'pie',
                    data:[
                        {value: idx * 128 + 80,  name:'Chrome'},
                        {value: idx * 64  + 160,  name:'Firefox'},
                        {value: idx * 32  + 320,  name:'Safari'},
                        {value: idx * 16  + 640,  name:'IE9+'},
                        {value: idx++ * 8  + 1280, name:'IE8-'}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'浏览器（数据纯属虚构）',
                    type:'pie',
                    data:[
                        {value: idx * 128 + 80,  name:'Chrome'},
                        {value: idx * 64  + 160,  name:'Firefox'},
                        {value: idx * 32  + 320,  name:'Safari'},
                        {value: idx * 16  + 640,  name:'IE9+'},
                        {value: idx++ * 8  + 1280, name:'IE8-'}
                    ]
                }
            ]
        },
        {
            series : [
                {
                    name:'浏览器（数据纯属虚构）',
                    type:'pie',
                    data:[
                        {value: idx * 128 + 80,  name:'Chrome'},
                        {value: idx * 64  + 160,  name:'Firefox'},
                        {value: idx * 32  + 320,  name:'Safari'},
                        {value: idx * 16  + 640,  name:'IE9+'},
                        {value: idx++ * 8  + 1280, name:'IE8-'}
                    ]
                }
            ]
        }
    ];
    
    $scope.chartConfigB = {
        	domOption:{
        		//id:"Hello",
        		height:"300px",
        		width:"50%"
        	},
        	chartOption:$scope.optionB,
        	clickEvent:function(node){
        		console.log("我被点了。我是被逼的。。");
        		console.log(node);
        	}
        }
    
}]);