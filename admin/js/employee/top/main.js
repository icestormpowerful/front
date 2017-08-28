app.controller("EmployeeMainController", ['$scope', '$rootScope','$location',function($scope, $rootScope,$location) {
  $rootScope.header_path="html/headers/employeemain.html";
  $scope.newsitemlist = [];
  $scope.newsitemlist.push({date:"○○日○○時○○分",msg:"○○様からお問い合わせがあります。"}); 
  $scope.newsitemlist.push({date:"○○日○○時○○分",msg:"○○様と○○様がマッチングしました。"}); 
  $scope.newsitemlist.push({date:"○○日○○時○○分",msg:"○○様から違反通報があります。"}); 
  $scope.newsitemlist.push({date:"○○日○○時○○分",msg:"○○様から本人確認書類が届いています。"}); 
  $scope.newsitemlist.push({date:"○○日○○時○○分",msg:"○○様からお問い合わせがあります。"}); 
}]);