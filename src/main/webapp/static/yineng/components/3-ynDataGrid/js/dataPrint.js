/**
 * dataGrid打印功能实现
 * Created by YN on 2015/3/12.
 */
angular.module("dataPrint",[]).controller("dataPrintController",["$scope", "$http", "$window", function($scope, $http, $window){
    console.log("this is dataGridPrint Page!!!");
    var pageConditions = decodeURI($window.location.href).substr(decodeURI($window.location.href).indexOf("?")+1).split(/[&]/);
    $scope.printPage = function(){
        $window.document.getElementById("pageButtonArea").style.display="none";
        $window.print();
        $window.document.getElementById("pageButtonArea").style.display="";
    };
    $scope.closePage = function(){
        $window.close();
    };
    $scope.getColumns = function(str){
        console.log(str);
        var arr = str.split(/[\^]/),
            columns = new Array();
        console.log(arr);
        for(var i= 0; i<arr.length; i++){
            columns.push({field:arr[i].split(/[@]/)[0], displayName:arr[i].split(/[@]/)[1]})
        }
        return columns;
    };
    $scope.getUrl = function(){
        var url = pageConditions[4].replace("url=","");
        for(var i=5; i<pageConditions.length-1;i++){
            url += "&" + pageConditions[i];
        }
        if(pageConditions[0].replace("printAll=","") == "n"){
            return "../../../../.." + url;
        }else{
            return url;
        }
    };
    $scope.config = {
        pageTitle:pageConditions[3].replace("pageTitle=",""),
        printAll:pageConditions[0].replace("printAll=",""),
        url:$scope.getUrl(),
        columns:$scope.getColumns(pageConditions[pageConditions.length - 1].replace("columns=","")),
        pageNumber:parseInt(pageConditions[2].replace("pageNumber=","")) - 1,
        pageSize:parseInt(pageConditions[1].replace("pageSize=",""))
    };
    console.log($scope.config);
    /*
    构造数据集
     */
    $scope.getDataList = function(){
        var dataList = new Array();
        angular.forEach($scope.pageData, function(item){
            var rowArr = new Array();
            angular.forEach($scope.config.columns,function(column){
                if(item[column.field] == null){
                    rowArr.push("");
                }else{
                    rowArr.push(item[column.field]);
                }
            });
            dataList.push({cells:rowArr});
        });
        $scope.dataList = dataList;
    };
    /*
     请求数据
     */
    $scope.requestData = function(str){
        var ids = str == undefined ? undefined : str.split(/[,]/);
        var requestConfig = {
            url:$scope.config.url,
            method:"POST",
            params:{pageNumber:$scope.config.pageNumber,pageSize:$scope.config.pageSize,ids:ids}
        };
        $http(requestConfig).success(function(data){
            if(data.status == 0){
                if($scope.config.printAll == "n"){
                    $scope.pageData = data.result;
                }else{
                    $scope.pageData = data.result.content;
                }
                $scope.getDataList();
            }
        });
    };
    /*
    获取数据
     */
    if($scope.config.printAll == "n"){
        var str = $window.name;
        $scope.requestData(str);
    }else{
        $scope.requestData();
    }
}]);