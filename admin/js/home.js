app.controller("HomeController", ['$scope', '$rootScope','$location','$http',function($scope, $rootScope,$location,$http) {
  $rootScope.header_path="html/headers/start.html";
  $scope.adminid='';
  $scope.adminpassword='';
  $scope.submitLogin = function() {
    if(($scope.adminid.length>0)&&($scope.adminpassword.length>0)){
      var data = JSON.stringify({login_id:$scope.adminid,password:$scope.adminpassword});
      $http({
        method: 'post',
        url: http_url + "api/admin/login",
        data:data,
        headers: {'Content-Type': 'application/json'}
        }).then(function successCallback(response) {
          if(response.data.result=='success'){
              profile={
                  loginstatus:1,
                  permission:response.data.permission+1
              };
              sessionStorage.loginstatus=1;
              sessionStorage.permission=response.data.permission+1;
              sessionStorage.loginname=response.data.name;
              $rootScope.loginname=response.data.name;
              if(profile.permission!=1){
                $location.path("/employee/home" );
              }
              else{
                $location.path("/master/home" );
              }
            }
        });
    }
    else{
      alert("plz fill all field");
    }
  }
}]);