app.controller("GListController", ['$scope','$rootScope','$http','$location','KPRGsubsidySearchService','$window',function($scope,$rootScope,$http,$location,KPRGsubsidySearchService,$window) {
	$rootScope.header_path="html/header1.html";
	$scope.inlcudehtmlpath="html/Gpages/Gsubsidylist.html";
	$scope.displayamountstring = ["100万円以下","100万〜500万円以下","500万〜1000円万以下","1000万〜5000万以下","5000万〜1億円以下","1億円以上"];

	$scope.displayimageurl=http_url;
	$scope.paginationsetting = {
		totalitemcount:0,
		currentpage:1,
		itemperpage:20,
		itemperpagestring:"20",
		currentpageitemcount:0
	}
	$scope.subsidylist=[];
	$scope.requesttablecondition={};
	$scope.requesttableurl="";
	$scope.displaydetailindex=0;
	var init=function(){
		$scope.requesttablecondition=KPRGsubsidySearchService.getSubsidy().senddata;
		$scope.requesttableurl=KPRGsubsidySearchService.getSubsidy().url;
		$scope.requesttablecondition.current_page=$scope.paginationsetting.currentpage-1;
		$scope.requesttablecondition.per_page=$scope.paginationsetting.itemperpage;
		var data=JSON.stringify($scope.requesttablecondition);
		if(data!=-1){
			$http({
		        method: 'post',
		        url: http_url + $scope.requesttableurl,
		        data:data,
		        headers: {'Content-Type': 'application/json'}
		        }).then(function successCallback(response) {
		        	$scope.subsidylist=response.data.result;
		        	$scope.paginationsetting.totalitemcount=response.data.total_item_number;
		        	$scope.paginationsetting.currentpageitemcount=response.data.result.length;
		        });
		}
		else{
			$location.path("/client/Ghome");
		}

	}
	init();
	$scope.click_subsidy_put = function (subsidyid,index) {
	    var data = JSON.stringify({user_id:profile.loginid,policy_id:subsidyid,type:index});
	    $http({
	        method: 'post',
	        url: http_url + "api/policy_put",
	        data:data,
	        headers: {'Content-Type': 'application/json'}
	        }).then(function successCallback(response) {
	        });
	};
	$scope.updatetableitemdata = function () {
		console.log("function called");
		$scope.requesttablecondition.current_page=$scope.paginationsetting.currentpage-1;
		$scope.requesttablecondition.per_page=$scope.paginationsetting.itemperpage;
		var data=JSON.stringify($scope.requesttablecondition);
		$http({
	        method: 'post',
	        url: http_url + $scope.requesttableurl,
	        data:data,
	        headers: {'Content-Type': 'application/json'}
	        }).then(function successCallback(response) {
	        	$scope.subsidylist=response.data.result;
	        	$scope.paginationsetting.totalitemcount=response.data.total_item_number;
	        	$scope.paginationsetting.currentpageitemcount=response.data.result.length;
	        });
	};
	$scope.itemperpagechanged = function () {
		console.log($scope.paginationsetting.itemperpagestring);
		$scope.paginationsetting.currentpage=1;
		$scope.paginationsetting.itemperpage=parseInt($scope.paginationsetting.itemperpagestring);
		$scope.updatetableitemdata();
	};
	$scope.initpdfarrayinC3screen = function(pdfstring) {
        var array=JSON.parse(pdfstring);
          return array;
    };
    $scope.clickdownloadpdf = function(pdfurl,pdfname) {
          if(pdfurl.includes("https://chusho.mirasapo.jp/files")){
            $window.open(pdfurl);
          }
          else{
             var data = JSON.stringify({name:pdfname,link:pdfurl});
              $window.open(http_url + "api/downloadfile/" + pdfurl + '/' +pdfname);
         }
    };
    $scope.backtoListscreen = function() {
        $scope.inlcudehtmlpath="html/Gpages/Gsubsidylist.html";
    };
    $scope.viewdetailsubsidy = function(index) {
    	$scope.displaydetailindex=index;
        $scope.inlcudehtmlpath="html/Gpages/Gsubsidydetail.html";
    };
    $scope.selectsubsidy = function(id) {
    	KPRGsubsidySearchService.setselectedsubsidyid(id);
    	$location.path("/client/Ghome");
    };
}]);