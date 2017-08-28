app.controller("GCompleteController", ['$scope','$rootScope','$http','$location','KPRGsubsidySearchService',function($scope,$rootScope,$http,$location,KPRGsubsidySearchService) {
	$rootScope.header_path="html/header1.html";
	$scope.directtomain = function(){
		KPRGsubsidySearchService.initalldata();
		$location.path("/client/F0");
	}
}]);