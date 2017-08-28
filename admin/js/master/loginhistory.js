app.controller("MasterLoginHistoryController", ['$scope', '$rootScope','$location','$http',function($scope, $rootScope,$location,$http) {
  $rootScope.header_path="html/headers/mastersystem.html";
  $scope.tableheaderclassname=["table-arrow","table-arrow-top"];
  $scope.headertime=0;
  $scope.headerid=0;
  $scope.headername=0;
  $scope.headerip=0;
  $scope.searchtext="";
  $scope.paginationnumber=1;
  $scope.totaltableitem=40;
  var tableclassnamestring = ["","odd"];
  $scope.tablearray=[];
  var requesttabledata = function(index){
  	$scope.tablearray=[];
  	var i=0;
  	var data = JSON.stringify({per_page:$rootScope.tablepageitemcount,current_page:$scope.paginationnumber-1,search_content:$scope.searchtext,
  		type:index,sort_logged_time:$scope.headertime, sort_staff_id:$scope.headerid,sort_staff_name:$scope.headername,
  		sort_ipaddress:$scope.headerip,sort_search_page:0});
  	$http({
        method: 'post',
        url: http_url + "api/admin/history/logged_in",
        data:data,
        headers: {'Content-Type': 'application/json'}
        }).then(function successCallback(response) {
          $scope.totaltableitem=response.data.total_item_number;
        	for(i=0;i<response.data.result.length;i++){
        		$scope.tablearray.push({
	        		classname:tableclassnamestring[i%2],
	        		time:response.data.result[i].logged_time,
		        	id:response.data.result[i].staff_id,
				    name:response.data.result[i].staff_name,
				    ip:response.data.result[i].ipaddress});
        	}
        });
  }
  requesttabledata(0);

	$scope.clickheader = function(index) {
    $scope.paginationnumber=1;
	if(index==1)
		$scope.headertime=($scope.headertime+1)%2;
	else if(index==2)
		$scope.headerid=($scope.headerid+1)%2;
	else if(index==3)
		$scope.headername=($scope.headername+1)%2;
	else if(index==4)
		$scope.headerip=($scope.headerip+1)%2;
	requesttabledata(index-1);
  	};

  	$scope.submitSearch = function() {
      $scope.paginationnumber=1;
  		requesttabledata(0);
  	};

  	$scope.submitClear = function() {
      $scope.paginationnumber=1;
  		$scope.searchtext="";
  		requesttabledata(0);
  	};
    $scope.paginationchange = function() {
      requesttabledata(0);
    };
}]);