angular.module("ynSelectApp").controller("ynSelectController",["$scope",function($scope){
       $scope.person = [
           {name:"nya1",age:12},
           {name:"nagm2",age:13},
           {name:"nahym3",age:14},
           {name:"nam4",age:15},
           {name:"nyam5",age:16}
       ];

       $scope.names = ["Jone","Sarah","Tom","Tommy","May"];

       $scope.model = null;
}]);