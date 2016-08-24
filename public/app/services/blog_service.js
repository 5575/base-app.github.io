angular.module('blog').factory('bolgService',['$http','$q',function($http,$q){
  var dal = {}

  /**
   * [分页形势获取所有数据]
   * @param  {[type]} type [分类]
   * @param  {[type]} page [descri页码ption]
   * @return {[type]}      [description]
   */
  dal.getDataByPage = function(type,page){
      var url = '/api/get_all_data/'+type+'/'+page
      var deferred = $q.defer()
      $http.get(url).success(function(res){
          deferred.resolve(res)
      }).error(function (res,statusCode) {
          console.log(res)
          console.log(statusCode)
          deferred.reject(res)
      })
      return deferred.promise
  }

  /**
   * [获取所有的分类数据]
   * @return {[type]} [description]
   */
  dal.getTypeData = function(){
      var url = '/api/get_types'
      var deferred = $q.defer()
      $http.get(url).success(function(res){
          deferred.resolve(res)
      }).error(function (res,statusCode) {
          console.log(res)
          console.log(statusCode)
          deferred.reject(res)
      })
      return deferred.promise
  }

  /**
   * [根据id获取详情信息]
   * @param  {[type]} id [blog的id]
   * @return {[type]}    [description]
   */
  dal.getBlogDetail = function(id){
      var url = '/api/detail/'+id
      var deferred = $q.defer()
      $http.get(url).success(function(res){
          deferred.resolve(res)
      }).error(function (res,statusCode) {
          console.log(res)
          console.log(statusCode)
          deferred.reject(res)
      })
      return deferred.promise
  }
  return dal
}])
