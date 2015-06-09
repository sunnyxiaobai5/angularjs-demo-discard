angular.module("ynModalApp").controller("ynModalController",["$scope","ynModal1",function($scope,ynModal1){

    //$scope.callb =

    var config = {
        title:"abcd11",
        quickClose:false,
        button: [
            {
                value: '不同意关闭',
                callback: function(){
                    $scope.modalContent = $scope.modalContent + "{}";
                    $scope.$apply();
                    return false;
                },
                autofocus: true
            },
            {
                value: '同意关闭',
                callback: function () {
                    return true;
                }
            },
            {
                value: '关闭我'
            }
        ]
    };
    var url = "template/modalDemo.html";

    $scope.useSimple = function(){
        ynModal1.showModal(url,config,$scope);
    };

    $scope.tip = function(){
        //console.log($scope.modalContent);
        $scope.modalContent = $scope.modalContent + "{}";
        console.log($scope.modalContent);
    }

    $scope.modalContent = "王翔";


    $scope.$watch("modalContent",function(newVal,oldVal,opts){
        console.log(newVal);
    });


}]);