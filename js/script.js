var app = angular.module("app", ["ngRoute","ngMaterial","ngSanitize","ui.bootstrap","ngRateIt"]);

var profile={
        loginstatus:0,
        permission:0,  //0:client ,1:agency
        loginid:"",
        displayname:"",
        username:"",
        photourl:"",
        document_business_price:"",
        document_business_type:"",
        request_business_price:"",
        request_business_type:"",
        deposit_money:"",
        deposit_type:"",
    };

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "html/Apages/home.html",
		controller : "HomeController"
    })
    .when("/register", {
        templateUrl : "html/Apages/register.html",
		controller : "RegisterController"
    })
    .when("/login", {
        templateUrl : "html/Apages/login.html",
		controller : "LoginController"
    })
    // agencypart

    // Bpages
    .when("/agency/Bpart1", {
        templateUrl : "html/Bpages/Bpart1.html",
        controller : "Bpart1Controller"
    })
    .when("/agency/Bpart2", {
        templateUrl : "html/Bpages/Bpart2.html",
        controller : "Bpart2Controller"
    })
    .when("/agency/home", {
        templateUrl : "html/Bpages/B0home.html",
		controller : "B0HomeController"
    })
    .when("/agency/B1", {
        templateUrl : "html/Bpages/B1.html",
        controller : "B1Controller"
    })
    .when("/agency/B2", {
        templateUrl : "html/Bpages/B2.html",
        controller : "B2Controller"
    })
    .when("/agency/B3", {
        templateUrl : "html/Bpages/B3.html",
        controller : "B3Controller"
    })
    .when("/agency/B4", {
        templateUrl : "html/Bpages/B4.html",
        controller : "B4Controller"
    })
    .when("/agency/B5", {
        templateUrl : "html/Bpages/B5.html",
        controller : "B5Controller"
    })
    .when("/agency/B6", {
        templateUrl : "html/Bpages/B6.html",
        controller : "B6Controller"
    })
    .when("/agency/B7", {
        templateUrl : "html/Bpages/B7.html",
        controller : "B7Controller"
    })
    .when("/agency/B8", {
        templateUrl : "html/Bpages/B8.html",
        controller : "B8Controller"
    })
    .when("/agency/B9", {
        templateUrl : "html/Bpages/B9.html",
        controller : "B9Controller"
    })
    .when("/agency/B10", {
        templateUrl : "html/Bpages/B10.html",
        controller : "B10Controller"
    })
    .when("/agency/B11", {
        templateUrl : "html/Bpages/B11.html",
        controller : "B11Controller"
    })
    .when("/agency/B12", {
        templateUrl : "html/Bpages/B12.html",
        controller : "B12Controller"
    })
    .when("/agency/B13", {
        templateUrl : "html/Bpages/B13.html",
        controller : "B13Controller"
    })
    .when("/agency/B14", {
        templateUrl : "html/Bpages/B14.html",
        controller : "B14Controller"
    })
    .when("/agency/B15", {
        templateUrl : "html/Bpages/B15.html",
        controller : "B15Controller"
    })
    .when("/agency/B16", {
        templateUrl : "html/Bpages/B16.html",
        controller : "B16Controller"
    })
    .when("/agency/B17", {
        templateUrl : "html/Bpages/B17.html",
        controller : "B17Controller"
    })
    .when("/agency/B18", {
        templateUrl : "html/Bpages/B18.html",
        controller : "B18Controller"
    })
    .when("/agency/B19", {
        templateUrl : "html/Bpages/B19.html",
        controller : "B19Controller"
    })
    .when("/agency/B20", {
        templateUrl : "html/Bpages/B20.html",
        controller : "B20Controller"
    })
    .when("/agency/B21", {
        templateUrl : "html/Bpages/B21.html",
        controller : "B21Controller"
    })
    .when("/agency/B22", {
        templateUrl : "html/Bpages/B22.html",
        controller : "B21Controller"
    })
    .when("/agency/B23", {
        templateUrl : "html/Bpages/B23.html",
        controller : "B23Controller"
    })
    .when("/agency/B24", {
        templateUrl : "html/Bpages/B24.html",
        controller : "B24Controller"
    })
    .when("/agency/B25", {
        templateUrl : "html/Bpages/B25.html",
        controller : "B25Controller"
    })
    .when("/agency/B26", {
        templateUrl : "html/Bpages/B26.html",
        controller : "B26Controller"
    })
    .when("/agency/B27", {
        templateUrl : "html/Bpages/B27.html",
        controller : "B27Controller"
    })
    .when("/agency/B28", {
        templateUrl : "html/Bpages/B28.html",
        controller : "B28Controller"
    })
    .when("/agency/B29", {
        templateUrl : "html/Bpages/B29.html",
        controller : "B29Controller"
    })

    // Cpages
    .when("/agency/Cpart", {
        templateUrl : "html/Cpages/Cpart.html",
        controller : "CpartController"
    })

    // Dpages
    .when("/agency/Dpart", {
        templateUrl : "html/Dpages/Dpart.html",
        controller : "DpartController"
    })
    
	.when("/agency/D4", {
        templateUrl : "html/Dpages/D4.html",
        controller : "DpartController"
    })
	
	.when("/agency/D5", {
        templateUrl : "html/Dpages/D5.html",
        controller : "DpartController"
    })
	
	.when("/agency/D6", {
        templateUrl : "html/Dpages/D6.html",
        controller : "DpartController"
    })
    
    
    
//Epages
    .when("/agency/Eselect", {
        templateUrl : "html/Epages/ESelect.html",
        controller : "ESelectController"
    })
    .when("/agency/Eregister", {
        templateUrl : "html/Epages/ERegister.html",
        controller : "ERegisterController"
    })
    .when("/agency/Ecomplete", {
        templateUrl : "html/Epages/Ecomplete.html",
        controller : "ECompleteController"
    })

    // fpages
    .when("/client/FMain", {
        templateUrl : "html/Fpages/FMain.html",
        controller : "FMainController"
    })
    .when("/client/F0", {
        templateUrl : "html/Fpages/F0.html",
        controller : "F0Controller"
    })
    .when("/client/F1", {
        templateUrl : "html/Fpages/F1.html",
        controller : "F1Controller"
    })
    .when("/client/F2", {
        templateUrl : "html/Fpages/F2.html",
        controller : "F2Controller"
    })
    .when("/client/F3", {
        templateUrl : "html/Fpages/F3.html",
        controller : "F3Controller"
    })
    .when("/client/F4", {
        templateUrl : "html/Fpages/F4.html",
        controller : "F4Controller"
    })
    .when("/client/F5", {
        templateUrl : "html/Fpages/F5.html",
        controller : "F5Controller"
    })
    .when("/client/F6", {
        templateUrl : "html/Fpages/F6.html",
        controller : "F6Controller"
    })
    .when("/client/F7", {
        templateUrl : "html/Fpages/F7.html",
        controller : "F7Controller"
    })
    .when("/client/F8", {
        templateUrl : "html/Fpages/F8.html",
        controller : "F8Controller"
    })
    .when("/client/F9", {
        templateUrl : "html/Fpages/F9.html",
        controller : "F9Controller"
    })
    .when("/client/F10", {
        templateUrl : "html/Fpages/F10.html",
        controller : "F10Controller"
    })
    .when("/client/F11", {
        templateUrl : "html/Fpages/F11.html",
        controller : "F11Controller"
    })
    .when("/client/F12", {
        templateUrl : "html/Fpages/F12.html",
        controller : "F12Controller"
    })
    .when("/client/F13", {
        templateUrl : "html/Fpages/F13.html",
        controller : "F13Controller"
    })
    .when("/client/F14", {
        templateUrl : "html/Fpages/F14.html",
        controller : "F14Controller"
    })
    .when("/client/F15", {
        templateUrl : "html/Fpages/F15.html",
        controller : "F15Controller"
    })
    .when("/client/F16", {
        templateUrl : "html/Fpages/F16.html",
        controller : "F16Controller"
    })
    .when("/client/F17", {
        templateUrl : "html/Fpages/F17.html",
        controller : "F17Controller"
    })
    .when("/client/F18", {
        templateUrl : "html/Fpages/F18.html",
        controller : "F18Controller"
    })
    .when("/client/F19", {
        templateUrl : "html/Fpages/F19.html",
        controller : "F19Controller"
    })
    .when("/client/F20", {
        templateUrl : "html/Fpages/F20.html",
        controller : "F20Controller"
    })
    .when("/client/F21", {
        templateUrl : "html/Fpages/F21.html",
        controller : "F21Controller"
    })
    .when("/client/F22", {
        templateUrl : "html/Fpages/F22.html",
        controller : "F22Controller"
    })
    .when("/client/F23", {
        templateUrl : "html/Fpages/F23.html",
        controller : "F23Controller"
    })
    .when("/client/F24", {
        templateUrl : "html/Fpages/F24.html",
        controller : "F24Controller"
    })
    .when("/client/F25", {
        templateUrl : "html/Fpages/F25.html",
        controller : "F25Controller"
    })
    .when("/client/F26", {
        templateUrl : "html/Fpages/F26.html",
        controller : "F26Controller"
    })
    .when("/client/F27", {
        templateUrl : "html/Fpages/F27.html",
        controller : "F27Controller"
    })
    .when("/client/F28", {
        templateUrl : "html/Fpages/F28.html",
        controller : "F28Controller"
    })
    .when("/client/F29", {
        templateUrl : "html/Fpages/F29.html",
        controller : "F29Controller"
    })
    .when("/client/F30", {
        templateUrl : "html/Fpages/F30.html",
        controller : "F30Controller"
    })
    .when("/client/F31", {
        templateUrl : "html/Fpages/F31.html",
        controller : "F31Controller"
    })

    // Gpages
    .when("/client/Ghome", {
        templateUrl : "html/Gpages/Ghome.html",
        controller : "GHomeController"
    })
    .when("/client/Glist", {
        templateUrl : "html/Gpages/Glist.html",
        controller : "GListController"
    })
    .when("/client/Gcomplete", {
        templateUrl : "html/Gpages/Gcomplete.html",
        controller : "GCompleteController"
    })

    // hpages
    .when("/client/H1", {
        templateUrl : "html/Hpages/H1.html",
        controller : "H1Controller"
    })
    .when("/client/H2", {
        templateUrl : "html/Hpages/H2.html",
        controller : "H2Controller"
    })
    .when("/client/H3", {
        templateUrl : "html/Hpages/H3.html",
        controller : "H3Controller"
    })
    .when("/client/H4", {
        templateUrl : "html/Hpages/H4.html",
        controller : "H4Controller"
    })
    .when("/client/H5", {
        templateUrl : "html/Hpages/H5.html",
        controller : "H5Controller"
    })
    .when("/client/H6", {
        templateUrl : "html/Hpages/H6.html",
        controller : "H6Controller"
    })
    .when("/client/H7", {
        templateUrl : "html/Hpages/H7.html",
        controller : "H7Controller"
    })
    .when("/client/H8", {
        templateUrl : "html/Hpages/H8.html",
        controller : "H8Controller"
    })
    .when("/client/H9", {
        templateUrl : "html/Hpages/H9.html",
        controller : "H9Controller"
    })
    // ipages
    .when("/client/I1", {
        templateUrl : "html/Ipages/I1.html",
        controller : "I1Controller"
    })
    .when("/client/I2", {
        templateUrl : "html/Ipages/I2.html",
        controller : "I2Controller"
    })
    .when("/client/I3", {
        templateUrl : "html/Ipages/I3.html",
        controller : "I3Controller"
    })
    .when("/client/I4", {
        templateUrl : "html/Ipages/I4.html",
        controller : "I4Controller"
    })
    .when("/client/I5", {
        templateUrl : "html/Ipages/I5.html",
        controller : "I5Controller"
    })
    .when("/client/I6", {
        templateUrl : "html/Ipages/I6.html",
        controller : "I6Controller"
    })
    .when("/client/I7", {
        templateUrl : "html/Ipages/I7.html",
        controller : "I7Controller"
    })
    .when("/client/I8", {
        templateUrl : "html/Ipages/I8.html",
        controller : "I8Controller"
    })
    .when("/client/I9", {
        templateUrl : "html/Ipages/I9.html",
        controller : "I9Controller"
    })
    .when("/client/I10", {
        templateUrl : "html/Ipages/I10.html",
        controller : "I10Controller"
    })
    .when("/client/I11", {
        templateUrl : "html/Ipages/I11.html",
        controller : "I11Controller"
    })
    .when("/client/I12", {
        templateUrl : "html/Ipages/I12.html",
        controller : "I12Controller"
    })
    .when("/client/I13", {
        templateUrl : "html/Ipages/I13.html",
        controller : "I13Controller"
    })
    .when("/client/I14", {
        templateUrl : "html/Ipages/I14.html",
        controller : "I14Controller"
    })
    .when("/client/I15", {
        templateUrl : "html/Ipages/I15.html",
        controller : "I15Controller"
    })
    // kpages
    .when("/mypage/home", {
        templateUrl : "html/Kpages/home.html",
        controller : "mypageHomeController"
    })
    .when("/mypage/agencyprofile", {
        templateUrl : "html/Kpages/agencyprofile.html",
        controller : "mypageAgencyprofileController"
    })
    .when("/mypage/clientprofile", {
        templateUrl : "html/Kpages/clientprofile.html",
        controller : "mypageClientprofileController"
    })
    .when("/mypage/memberinfo", {
        templateUrl : "html/Kpages/memberinfo.html",
        controller : "mypageMemberinfoController"
    })
    .when("/mypage/agencyjob", {
        templateUrl : "html/Kpages/agencyjob.html",
        controller : "mypageAgencyjobController"
    })
    .when("/mypage/clientjob", {
        templateUrl : "html/Kpages/clientjob.html",
        controller : "mypageClientjobController"
    })
    .when("/mypage/message", {
        templateUrl : "html/Kpages/message.html",
        controller : "mypageMessageController"
    })
    .when("/mypage/authentication", {
        templateUrl : "html/Kpages/authentication.html",
        controller : "mypageAuthenticationController"
    })
    .when("/mypage/agencypayment", {
        templateUrl : "html/Kpages/agencypayment.html",
        controller : "mypageAgencypaymentController"
    })
    .when("/mypage/clientpayment", {
        templateUrl : "html/Kpages/clientpayment.html",
        controller : "mypageClientpaymentController"
    })
    .when("/mypage/affiliate", {
        templateUrl : "html/Kpages/affiliate.html",
        controller : "mypageAffiliateController"
    })
	.otherwise({ redirectTo:'/'});

}]);

app.run(['$rootScope', '$location',function($rootScope, $location) {
    profile={
                  loginstatus:sessionStorage.loginstatus,
                  permission:sessionStorage.permission,
                  loginid:sessionStorage.loginid,
                  displayname:sessionStorage.displayname,
                  username:sessionStorage.username,
                  photourl:sessionStorage.photourl
              };
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
        // var urlarray=next.templateUrl.split('/');
        //     if(profile.loginstatus==1) {
        //         // if(urlarray[1]=="master"){
        //         //     if(profile.permission!=1)
        //         //         $location.path(current.originalPath);
        //         // }
        //         // else if(urlarray[1]=="employee"){
        //         //     if(urlarray[2]=="balance"&&profile.permission==3)
        //         //         $location.path(current.originalPath);
        //         //     else if(next.templateUrl=="html/employee/top/csv.html"&&profile.permission==3)
        //         //         $location.path(current.originalPath);
        //         //     else if(next.templateUrl=="html/employee/top/uploadfile.html"&&profile.permission==3)
        //         //         $location.path(current.originalPath);
        //         // }
        //     }
        //     else{
        //         $location.path('/');
        //     }
    });
}]);

app.service('KPRGsubsidySearchService', function() {
  var savedata={
    senddata:-1,
    url:"/employee/data/subsidylist",
    type:0
  }
  var selectedsubsidyid=-1;

  var requestoption;
  var filestring=[];
  var filearray=[];

  var addSubsidy = function(data,url,tp) {
      savedata.senddata=data;
      savedata.url=url;
      type=tp;
  };

  var getSubsidy = function(){
      return savedata;
  };

  var getselectedsubsidyid = function(){
    return selectedsubsidyid;
  }

  var setselectedsubsidyid = function(id){
    selectedsubsidyid=id;
  }

  var getrequestsetting = function(){
    return requestoption;
  }

  var setrequestsetting = function(option){
    requestoption=option;
  }

  var getfilestring = function(){
    return filestring;
  }

  var getfilearray = function(){
    return filearray;
  }

  var initalldata = function(){
      savedata={
        senddata:-1,
        url:"/employee/data/subsidylist",
        type:0
      };
      selectedsubsidyid=-1;

      requestoption=undefined;
      filestring=[];
      filearray=[];
  }

  var setfileoption = function(string,array){
    filestring=string;
    filearray=array;
  }

  return {
    addSubsidy: addSubsidy,
    getSubsidy: getSubsidy,
    getselectedsubsidyid: getselectedsubsidyid,
    setselectedsubsidyid: setselectedsubsidyid,
    getrequestsetting: getrequestsetting,
    setrequestsetting: setrequestsetting,
    getfilestring: getfilestring,
    getfilearray: getfilearray,
    setfileoption: setfileoption,
    initalldata: initalldata
  };

});

app.service('KPREsubsidySelectService', function() {
  var policyid=-1;

  var setSubsidyId = function(id) {
      policyid=id;
  };

  var getSubsidyId = function(){
      return policyid;
  };

  return {
    setSubsidyId: setSubsidyId,
    getSubsidyId: getSubsidyId
  };

});

var http_url="http://192.168.1.123/samurai/public/";