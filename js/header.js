app.controller("HeaderCtrl", ['$scope', '$rootScope','$location',function($scope, $rootScope,$location) {
  $scope.direct_register = function() {
    $location.path("/register" );
  }
  $scope.direct_login = function() {
    $location.path("/login" );
  }
  $scope.clickgotomypage = function() {
    $location.path("/mypage/home" );
  }
  $scope.directtoprofile = function(){
		if(profile.permission==1){
			$location.path("/mypage/agencyprofile" );
		}
		else{
			$location.path("/mypage/clientprofile" );
		}
	}
	$scope.directtomemberinfo = function(){
		$location.path("/mypage/memberinfo" );
	}
	$scope.directtojob = function(){
		if(profile.permission==1){
			$location.path("/mypage/agencyjob" );
		}
		else{
			$location.path("/mypage/clientjob" );
		}
	}
	$scope.directtoaffiliate = function(){
		$location.path("/mypage/affiliate" );
	}
	$scope.clicklogout = function(){
		$location.path("/" );
	}
}]);