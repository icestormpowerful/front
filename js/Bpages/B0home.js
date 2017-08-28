app.controller("B0HomeController", ['$scope','$location','$rootScope',function($scope,$location,$rootScope) {
  $rootScope.header_path="html/header1.html";
  $scope.advertitemlist = [];
  $scope.ratingitemlist = [];
  $scope.measureitemlist1 = [];
  $scope.measureitemlist2 = [];
  $scope.newsitemlist = [];
  for(var i=0;i<3;i++)
  	$scope.advertitemlist.push({url:"./resources/img/customer.png",text:"テキストテキストテキストテキストテキストテキスト"});	
  for(var i=0;i<3;i++)
  	$scope.ratingitemlist.push({url:"./resources/img/customer.png",name:"株式会社サンブル",
  		title:"タイトルタイトルタイトルタイトルタイトルタイトルタイトル",content:"テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト"});	
  for(var i=0;i<2;i++)
  	$scope.measureitemlist1.push({url:"./resources/img/ok.jpg",starttime:"ooo",increasetime:"ooo",money:"ooo",
  		title:"タイトルタイトルタイトルタイトルタイトル",content:"テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",leftmargin:i*15,rightmargin:15*(1-i)});	
  for(var i=0;i<2;i++)
  	$scope.measureitemlist2.push({url:"./resources/img/ok.jpg",starttime:"ooo",increasetime:"ooo",money:"ooo",
  		title:"タイトルタイトルタイトルタイトルタイトル",content:"テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",leftmargin:i*15,rightmargin:15*(1-i)});	
  for(var i=0;i<4;i++)
  	$scope.newsitemlist.push({date:"2017年 2月 8日",content:"テキストテキストテキテキストテキスキストテキストテ"});	
  $scope.clickgoC1 = function() {
    $location.path("/agency/Cpart" );
  }
  $scope.clickgoE1 = function() {
    $location.path("/agency/Eselect" );
  }
  $scope.direct_login = function() {
    $location.path("/login" );
  }
  $scope.clickgoBpart1 = function() {
    $location.path("/agency/Bpart1" );
  }
  $scope.clickgoBpart2 = function() {
    $location.path("/agency/Bpart2" );
  }
}]);