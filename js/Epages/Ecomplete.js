app.controller("ECompleteController", ['$scope','$rootScope','$http','$location','KPREsubsidySelectService',function($scope,$rootScope,$http,$location,KPREsubsidySelectService) {
	$rootScope.header_path="html/header1.html";
	$scope.directtomain = function(){
		KPREsubsidySelectService.setSubsidyId(-1);
		$location.path("/agency/home");
	}
}]);