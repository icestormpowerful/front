app.controller("mypageAuthenticationController", ['$scope','$rootScope','$http','$location','$mdDialog','$window','$mdToast',function($scope,$rootScope,$http,$location,$mdDialog,$window,$mdToast) {
	$rootScope.header_path="html/header1.html";
	$scope.displayname=profile.displayname;
	$scope.username=profile.username;
	$scope.photourl=http_url+profile.photourl;
	$scope.directtohome = function(){
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
	$scope.directtomessage = function(){
		$location.path("/mypage/message" );
	}
	$scope.directtoauthentication = function(){
		$location.path("/mypage/authentication" );
	}
	$scope.directtopayment = function(){
		if(profile.permission==1){
			$location.path("/mypage/agencypayment" );
		}
		else{
			$location.path("/mypage/clientpayment" );
		}
	}
	$scope.directtoaffiliate = function(){
		$location.path("/mypage/affiliate" );
	}
}]);