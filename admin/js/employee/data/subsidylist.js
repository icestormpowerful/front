app.controller("SubsidyListController", ['$scope', '$rootScope','$location','$http','$mdDialog','$window','subsidyEditService',function($scope, $rootScope,$location,$http,$mdDialog,$window,subsidyEditService) {
  $rootScope.header_path="html/headers/employeedata.html";
  $scope.tableheaderclassname=["table-arrow","table-arrow-top"];
  $scope.regionlist=[];
  $scope.register_companylist=[];
  $scope.categorylist=[];
  $scope.porjectnolist=["すべて"];
  $scope.statuslist=["すべて","公開","未公開","公開不可","掲載終了"];
  $scope.diaplayavailableamountlist=["100万円以下","100万～500万円以下","500万～1000万円以下","1000万～5000万円以下","5000万～1億円以下","1億円以上"];
  $scope.selectedprojectno="すべて";
  $scope.selectedcompany="すべて";
  $scope.selectedregion="すべて";
  $scope.selectedstatus="すべて";
  $scope.selectedcategory="すべて";
  $scope.subsidykeyword="";
  $scope.tableitemarray=[];
  $scope.paginationnumber=1;
  $scope.totaltableitem=0;
  $scope.totalsubsidyitemcount=0;
  $scope.headerid=0;
  $scope.headercompany=0;
  $scope.indexstring="id";
  $scope.sortdirection=0;
  $scope.settedchangestatus="";
  var selectedcheckboxidarray = [];
  var tableclassnamestring = ["","odd"];
  var init = function(){
  	$http({
        method: 'get',
        url: http_url + "api/admin/staff/policy_option",
        headers: {'Content-Type': 'application/json'}
        }).then(function successCallback(response) {
        	$scope.regionlist=response.data.region;
          $scope.regionlist.splice(0, 0, {region:"すべて"});
          $scope.register_companylist=response.data.register_insti_detail;
          $scope.register_companylist.splice(0, 0, {register_insti_detail:"すべて"});
          $scope.categorylist=response.data.categories;
          $scope.categorylist.splice(0, 0, "すべて");
        });
  }
  init();

  var requesttabledata = function(){
    $scope.tableitemarray=[];
    var i=0;
    var j=0;
    var searchprojectno = $scope.selectedprojectno;
    var searchcompany = $scope.selectedcompany;
    var searchregion = $scope.selectedregion;
    var searchstatus = $scope.statuslist.indexOf($scope.selectedstatus);
    var searchcategory = $scope.selectedcategory;
    var state = false;
    if(searchprojectno=="すべて")
      searchprojectno="";
    if(searchcompany=="すべて")
      searchcompany="";
    if(searchregion=="すべて")
      searchregion="";
    if(searchcategory=="すべて")
      searchcategory="";
    var displayrecommanddata="";
    var displayamountstring = "";
    var temparray=[];
    var data = JSON.stringify({project_no:searchprojectno, register_insti_detail:searchcompany,region:searchregion, 
      status:searchstatus , category:searchcategory, keyword:$scope.subsidykeyword, current_page:$scope.paginationnumber-1 ,
       per_page:$rootScope.tablepageitemcount, sort_name:$scope.indexstring, type:$scope.sortdirection});
    $http({
        method: 'post',
        url: http_url + "api/admin/staff/policy_option",
        data:data,
        headers: {'Content-Type': 'application/json'}
        }).then(function successCallback(response) {
          $scope.totaltableitem=response.data.total_item_number;
          $scope.totalsubsidyitemcount=response.data.total_policy_number;
          for(i=0;i<response.data.policy_list.length;i++){
            state=false;
            if(selectedcheckboxidarray.indexOf(response.data.policy_list[i].id)!=-1)
              state=true;
            displayrecommanddata = "";
            displayamountstring=$scope.diaplayavailableamountlist[response.data.policy_list[i].acquire_budget];
            if(response.data.policy_list[i].recom_bounty==1)
              displayrecommanddata="おすすめの助成金";
            $scope.tableitemarray.push({
              classname:tableclassnamestring[i%2],
              checkboxstate:state,
              status:$scope.statuslist[response.data.policy_list[i].publication_setting+1],
              subsidyid:response.data.policy_list[i].id,
              subsidyname:response.data.policy_list[i].name,
              subsidynamesub:response.data.policy_list[i].name_serve,
              company:response.data.policy_list[i].register_insti_detail,
              category:response.data.policy_list[i].category.replace(/AND/gi, ", "),
              region:response.data.policy_list[i].region,
              updatetime:response.data.policy_list[i].update_date,
              purpose:response.data.policy_list[i].target,
              targetinfo:response.data.policy_list[i].info,
              support:response.data.policy_list[i].support_content,
              availableamount:displayamountstring,
              supportscale:response.data.policy_list[i].support_scale,
              recruitment:response.data.policy_list[i].subscript_duration,
              period:response.data.policy_list[i].object_duration,
              adoption:response.data.policy_list[i].adopt_result,
              registerpdf:JSON.parse(response.data.policy_list[i].register_pdf),
              contact:response.data.policy_list[i].inquiry,
              recommandsubsidy:displayrecommanddata,
            })
          }
          console.log(response.data);
        });
  }

  $scope.submitSearch = function(ev) {
      if(selectedcheckboxidarray.length>0){
        var confirm = $mdDialog.confirm()
            .title('you will lost selected data')
            .ariaLabel('Lost Select')
            .targetEvent(ev)
            .ok('はい')
            .cancel('いいえ');
        $mdDialog.show(confirm).then(function() {
              $scope.paginationnumber=1;
              selectedcheckboxidarray = [];
              requesttabledata();
        }, function() {
        });
      }
      else{
        $scope.paginationnumber=1;
        selectedcheckboxidarray = [];
        requesttabledata();
      }
    };
    $scope.paginationchange = function() {
      requesttabledata();
    };
    $scope.clickdownloadpdf = function(pdfurl,pdfname) {
      if(pdfurl.includes("https://chusho.mirasapo.jp/files")){
        $window.open(pdfurl);
      }
      else{
         var data = JSON.stringify({name:pdfname,link:pdfurl});
          $window.open(http_url + "api/downloadfile/" + pdfurl + '/' +pdfname);
     }
      //
    };
    $scope.checkboxchange = function(checkedindex,id) {
      if(checkedindex==true){
        selectedcheckboxidarray.push(id);
      }
      else{
        selectedcheckboxidarray.splice(selectedcheckboxidarray.indexOf(id),1);
      }
    };
    $scope.clickheader = function(index) {
      if(index==1){
        $scope.headerid=($scope.headerid+1)%2;
        $scope.indexstring="id";
        $scope.sortdirection=$scope.headerid;
      }
      else if(index==2){
        $scope.headercompany=($scope.headercompany+1)%2;
        $scope.indexstring="register_insti_detail";
        $scope.sortdirection=$scope.headercompany;
      }
      requesttabledata();
    };
    $scope.clickchangestatus = function() {
      // console.log(selectedcheckboxidarray);
      // console.log($scope.settedchangestatus);
      if(selectedcheckboxidarray.length<=0){
        alert("plz select one more subsidy!");
        return;
      }
      if($scope.settedchangestatus==""){
        alert("plz select status!");
        return;
      }
      // {"id_array":"시책id들의 array","status":"시책들에 관해서 적용하여야 할 상태"}
      var data = JSON.stringify({id_array:selectedcheckboxidarray, status:$scope.statuslist.indexOf($scope.settedchangestatus)-1});
      $http({
          method: 'post',
          url: http_url + "api/admin/staff/policy_apply",
          data:data,
          headers: {'Content-Type': 'application/json'}
          }).then(function successCallback(response) {
            selectedcheckboxidarray = [];
              requesttabledata();
          });
    };
    $scope.selectedsubsidyexist = function(index) {
      var tempstatus=$scope.statuslist[index];
      if(index==0)
        var temparray=$scope.tableitemarray;
      else
        var temparray=$scope.tableitemarray.filter(x => x.status==tempstatus);
      if(temparray.length<=0)
        return false;
      for(var i=0;i<temparray.length;i++){
        if(selectedcheckboxidarray.indexOf(temparray[i].subsidyid)<0){
          return false;
        }
      }
      return true;
    };
    $scope.selectedsubsidytoggle = function(index) {
      var tempstatus=$scope.statuslist[index];
      if(index==0)
        var temparray=$scope.tableitemarray;
      else
        var temparray=$scope.tableitemarray.filter(x => x.status==tempstatus);
      if(temparray.length>0){
        console.log($scope.selectedsubsidyexist(index));
        if($scope.selectedsubsidyexist(index)){
          for(var i=0;i<temparray.length;i++){
            selectedcheckboxidarray.splice(selectedcheckboxidarray.indexOf(temparray[i].subsidyid),1);
            $scope.tableitemarray[$scope.tableitemarray.findIndex(x => x.subsidyid==temparray[i].subsidyid)].checkboxstate=false;
          }
        }
        else{
          for(var i=0;i<temparray.length;i++){
            if(selectedcheckboxidarray.indexOf(temparray[i].subsidyid)<0){
              selectedcheckboxidarray.push(temparray[i].subsidyid);
              $scope.tableitemarray[$scope.tableitemarray.findIndex(x => x.subsidyid==temparray[i].subsidyid)].checkboxstate=true;
            }
          }
        }
      }
    };
    $scope.clicksubsidytoedit = function(id) {
      subsidyEditService.addSubsidy(id,'/employee/data/subsidylist');
      $location.path("/employee/data/subsidyedit");
    };
}]);