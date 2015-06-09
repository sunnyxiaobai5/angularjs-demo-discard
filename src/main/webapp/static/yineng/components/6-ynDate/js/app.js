angular.module("ynDateApp",["yn.utils"]);


angular.module("ynDateApp").controller("ynDateController",["$scope",function($scope){

    $scope.$watch("defaultDate0",function(newVal,oldVal,opts){
        console.log(newVal);
    });

    $scope.$watch("defaultDate1",function(newVal,oldVal,opts){
        console.log(newVal);
    });

    $scope.$watch("defaultDate2",function(newVal,oldVal,opts){
        console.log(newVal);
    });

    $scope.$watch("defaultDate3",function(newVal,oldVal,opts){
        console.log(newVal);
    });

    $scope.$watch("defaultDate4",function(newVal,oldVal,opts){
        console.log(newVal);
    });

}])