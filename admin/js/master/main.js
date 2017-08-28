app.controller("MasterMainController", ['$scope', '$rootScope','$location',function($scope, $rootScope,$location) {
  $rootScope.header_path="html/headers/mastermain.html";
  $scope.newsitemlist = [];
  $scope.newsitemlist.push({date:"○○日○○時○○分",msg:"助成金・補助金データの更新を行いました。"}); 
  $scope.newsitemlist.push({date:"○○日○○時○○分",msg:"システムエラー"}); 
  for(var i=0;i<3;i++)
    $scope.newsitemlist.push({date:"○○日○○時○○分"}); 
}]);