app.controller("HeaderCtrl", ['$scope', '$rootScope','$location','$http',function($scope, $rootScope,$location,$http) {
	$scope.logoutuser = function() {
		$http({
        method: 'get',
        url: http_url + "api/admin/logout",
        headers: {'Content-Type': 'application/json'}
        }).then(function successCallback(response) {
        });
	      sessionStorage.loginstatus=0;
          sessionStorage.permission=0;
          sessionStorage.loginname="";
          profile={
                  loginstatus:sessionStorage.loginstatus,
                  permission:sessionStorage.permission
              };
    	$rootScope.loginname=sessionStorage.loginname;
          $location.path('/');
	  	};

}]);