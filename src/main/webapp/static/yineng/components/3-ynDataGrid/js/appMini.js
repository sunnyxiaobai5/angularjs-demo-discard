angular.module("ynDataGridMiniApp",["yn.utils"]);

angular.module("ynDataGridMiniApp").controller("ynDataGridMiniController",["$scope","ynModal",function($scope,ynModal){
	var config = {
	        title:"mini版本的数据表格",
	        quickClose:false,
	        button: [
	            {
	                value: '确认',
	                callback: function(){
	                    return true;
	                },
	                autofocus: true
	            },
	            {
	                value: '取消',
	                callback: function(){	}
	            }
	        ]
	    };
	    var url = "template/app.html";
	    
	    $scope.getSelected = function(){
	    	console.log($scope.gridOptions.getSelectedItems());
	    }
	    
	    $scope.uncheckOption1 = function(){
	    	//$scope.gridOptions.uncheckOption("2e64d138-16eb-4e5e-8cfe-4e328cd5cc7a");
	    	$scope.gridOptions.uncheckOption(["695291b5-9e0e-4225-90d3-65395d031e97","ebcff5a2-5865-4603-a6a1-e279e4eeacc4"]);
	    }

	    $scope.gridOptions = {
	    		primaryKey:"id",
	    		listUrl:"/grade/searchGrade.htm?&gradeStatus=-1",
	    		columnDefs:[
	                 {field:"year", displayName:"年份"},
	                 {field:"statusName", displayName:"使用状态"}
                 ],
                 getSelected:$scope.getSelected,
                 uncheckOption1:$scope.uncheckOption1,
                 getSelectedItems:function(){}
	    }
	    

	    
	   ynModal.showModal(url,config,{gridOptions:$scope.gridOptions});
	    
	    $scope.$watch(function(){
	    	return $scope.gridOptions.getSelectedItems();
	    },function(newVal,oldVal,opts){
	    	console.log(newVal);
	    },true);
	    
}])