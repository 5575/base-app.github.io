angular.module('blog').controller('detailCtrl',['$scope','bolgService','$routeParams',function($scope,service,$routeParams){
  service.getTypeData().then(function(res){
    $scope.typeData = res.data
  })

  service.getBlogDetail($routeParams.id).then(function(res){
    $scope.blogData = res.data
  })
}])
