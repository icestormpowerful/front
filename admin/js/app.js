var app = angular.module("app",["ngRoute","ngMaterial",'ui.bootstrap']);
var profile={
        loginstatus:0,
        permission:0  //1:admin,2:employee,3:editor
    };

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "html/home.html",
		controller : "HomeController"
    })

    //master-part

        //top
        .when("/master/home", {
            templateUrl : "html/master/main.html",
            controller : "MasterMainController"
        })
        .when("/master/csvmanagement", {
            templateUrl : "html/master/csv.html",
            controller : "MasterCsvController"
        })
        .when("/master/uploaded", {
            templateUrl : "html/master/uploadfile.html",
            controller : "MasterUploadController"
        })

        //balance
        .when("/master/balancesale", {
            templateUrl : "html/master/balancesale.html",
            controller : "MasterBalanceSaleController"
        })
        .when("/master/balancedepwith", {
            templateUrl : "html/master/balancedepwith.html",
            controller : "MasterBalanceDepWithController"
        })
        .when("/master/balancepayplan", {
            templateUrl : "html/master/balancepayplan.html",
            controller : "MasterBalancePayPlanController"
        })
        .when("/master/balancedata", {
            templateUrl : "html/master/balancedata.html",
            controller : "MasterBalanceDataController"
        })

        //system
        .when("/master/profile", {
            templateUrl : "html/master/profile.html",
            controller : "MasterProfileController"
        })
        .when("/master/employeeedit", {
            templateUrl : "html/master/employeepart.html",
            controller : "MasterEmployeeEditController"
        })
        .when("/master/loginhistory", {
            templateUrl : "html/master/loginhistory.html",
            controller : "MasterLoginHistoryController"
        })
        .when("/master/edithistory", {
            templateUrl : "html/master/edithistory.html",
            controller : "MasterEditHistoryController"
        })


    //employee-part
        //top
        .when("/employee/home", {
            templateUrl : "html/employee/top/main.html",
            controller : "EmployeeMainController"
        })
        .when("/employee/csv", {
            templateUrl : "html/employee/top/csv.html",
            controller : "EmployeeTop_CsvController"
        })
        .when("/employee/uploadfile", {
            templateUrl : "html/employee/top/uploadfile.html",
            controller : "EmployeeTop_UploadController"
        })
        .when("/employee/email", {
            templateUrl : "html/employee/top/email.html",
            controller : "EmployeeTop_EmailController"
        })

        //balance
        .when("/employee/balance/sale", {
            templateUrl : "html/employee/balance/sale.html",
            controller : "EmployeeBalance_SaleController"
        })
        .when("/employee/balance/depwith", {
            templateUrl : "html/employee/balance/depwith.html",
            controller : "EmployeeBalance_DepwithController"
        })
        .when("/employee/balance/payplan", {
            templateUrl : "html/employee/balance/payplan.html",
            controller : "EmployeeBalance_PayplanController"
        })
        .when("/employee/balance/data", {
            templateUrl : "html/employee/balance/data.html",
            controller : "EmployeeBalance_DataController"
        })

        //system
        .when("/employee/system/advertisement", {
            templateUrl : "html/employee/system/advertisement.html",
            controller : "EmployeeSystem_AdverController"
        })
        .when("/employee/system/suggest", {
            templateUrl : "html/employee/system/suggest.html",
            controller : "EmployeeSystem_SuggestController"
        })
        .when("/employee/system/industry", {
            templateUrl : "html/employee/system/industry.html",
            controller : "EmployeeSystem_IndustryController"
        })
        .when("/employee/system/tag", {
            templateUrl : "html/employee/system/tag.html",
            controller : "EmployeeSystem_TagController"
        })
        .when("/employee/system/category", {
            templateUrl : "html/employee/system/category.html",
            controller : "EmployeeSystem_CategoryController"
        })
        .when("/employee/system/payinfo", {
            templateUrl : "html/employee/system/payinfo.html",
            controller : "EmployeeSystem_PayinfoController"
        })
        .when("/employee/system/notification", {
            templateUrl : "html/employee/system/notification.html",
            controller : "EmployeeSystem_NotificationController"
        })
        .when("/employee/system/blog", {
            templateUrl : "html/employee/system/blog.html",
            controller : "EmployeeSystem_BlogController"
        })

        //customerinfo
        .when("/employee/customerinfo/agencylist", {
            templateUrl : "html/employee/customerinfo/agencylist.html",
            controller : "EmployeeCustomerinfo_AgencyListController"
        })
        .when("/employee/customerinfo/clientlist", {
            templateUrl : "html/employee/customerinfo/clientlist.html",
            controller : "EmployeeCustomerinfo_ClientListController"
        })
        .when("/employee/customerinfo/matchinglist", {
            templateUrl : "html/employee/customerinfo/matchinglist.html",
            controller : "EmployeeCustomerinfo_MatchingListController"
        })

        //customersupport
        .when("/employee/customersupport/inquiry", {
            templateUrl : "html/employee/customersupport/inquiry.html",
            controller : "EmployeeCustomersupport_InquiryController"
        })
        .when("/employee/customersupport/contact", {
            templateUrl : "html/employee/customersupport/contact.html",
            controller : "EmployeeCustomersupport_ContactController"
        })
        .when("/employee/customersupport/identifydoc", {
            templateUrl : "html/employee/customersupport/identify.html",
            controller : "EmployeeCustomersupport_IdentifyController"
        })
        .when("/employee/customersupport/identifyphrase", {
            templateUrl : "html/employee/customersupport/identifyphrase.html",
            controller : "EmployeeCustomersupport_IdentifyPhraseController"
        })
        .when("/employee/customersupport/violator", {
            templateUrl : "html/employee/customersupport/violator.html",
            controller : "EmployeeCustomersupport_ViolatorController"
        })
        .when("/employee/customersupport/violatorphrase", {
            templateUrl : "html/employee/customersupport/violatorphrase.html",
            controller : "EmployeeCustomersupport_ViolatorPhraseController"
        })

        //data
        .when("/employee/data/subsidylist", {
            templateUrl : "html/employee/data/subsidylist.html",
            controller : "SubsidyListController"
        })
        .when("/employee/data/subsidyagency", {
            templateUrl : "html/employee/data/subsidyagency.html",
            controller : "SubsidyAgencyController"
        })
        .when("/employee/data/subsidyadd", {
            templateUrl : "html/employee/data/subsidyadd.html",
            controller : "SubsidyAddController"
        })
        .when("/employee/data/subsidyedit", {
            templateUrl : "html/employee/data/subsidyadd.html",
            controller : "SubsidyEditController"
        })
        .when("/employee/data/document", {
            templateUrl : "html/employee/data/document.html",
            controller : "EmployeeData_DocumentController"
        })
        .when("/employee/data/registration", {
            templateUrl : "html/employee/data/registration.html",
            controller : "EmployeeData_RegistController"
        })
        
        //other
        .when("/employee/other/affiliate", {
            templateUrl : "html/employee/other/affiliate.html",
            controller : "EmployeeOther_AffiliateController"
        })
        .when("/employee/other/payment", {
            templateUrl : "html/employee/other/payment.html",
            controller : "EmployeeOther_PaymentController"
        })
        .when("/employee/other/companies", {
            templateUrl : "html/employee/other/companies.html",
            controller : "EmployeeOther_CompaniesController"
        })
        .when("/employee/other/data", {
            templateUrl : "html/employee/other/data.html",
            controller : "EmployeeOther_DataController"
        })
        .when("/employee/other/seminardata", {
            templateUrl : "html/employee/other/seminardata.html",
            controller : "EmployeeOther_SeminardataController"
        })
        .when("/employee/other/seminarapplicant", {
            templateUrl : "html/employee/other/seminarapplicant.html",
            controller : "EmployeeOther_SeminarapplicantController"
        })

	.otherwise({ redirectTo:'/'});
}]);

app.run(['$rootScope', '$location','$window',function($rootScope, $location,$window) {
    $rootScope.tablepageitemcount=15;
    profile={
                  loginstatus:sessionStorage.loginstatus,
                  permission:sessionStorage.permission
              };
    $rootScope.loginname=sessionStorage.loginname;
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
        var urlarray=next.templateUrl.split('/');
            if(profile.loginstatus==1) {
                if(urlarray[1]=="master"){
                    if(profile.permission!=1)
                        $location.path(current.originalPath);
                }
                else if(urlarray[1]=="employee"){
                    if(urlarray[2]=="balance"&&profile.permission==3)
                        $location.path(current.originalPath);
                    else if(next.templateUrl=="html/employee/top/csv.html"&&profile.permission==3)
                        $location.path(current.originalPath);
                    else if(next.templateUrl=="html/employee/top/uploadfile.html"&&profile.permission==3)
                        $location.path(current.originalPath);
                }
            }
            else{
                $location.path('/');
            }
    });
    // function onFocus(){
    //     $window.location.reload();
    // };

    // $window.addEventListener("focus", onFocus);
    // var sessionStorage_transfer = function(event) {
    //   if(!event) { event = $window.event; } // ie suq
    //   if(!event.newValue) return;          // do nothing if no value to work with
    //   if (event.key == 'getSessionStorage') {
    //     // another tab asked for the sessionStorage -> send it
    //     localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
    //     // the other tab should now have it, so we're done with it.
    //     localStorage.removeItem('sessionStorage'); // <- could do short timeout as well.
    //   } else if (event.key == 'sessionStorage' && !sessionStorage.length) {
    //     // another tab sent data <- get it
    //     var data = JSON.parse(event.newValue);
    //     for (var key in data) {
    //       sessionStorage.setItem(key, data[key]);
    //     }
    //   }
    // };

    // // listen for changes to localStorage
    // if($window.addEventListener) {
    //   $window.addEventListener("storage", sessionStorage_transfer, false);
    // } else {
    //   $window.attachEvent("onstorage", sessionStorage_transfer);
    // };


    // // Ask other tabs for session storage (this is ONLY to trigger event)
    // if (!sessionStorage.length) {
    //   localStorage.setItem('getSessionStorage', 'foobar');
    //   localStorage.removeItem('getSessionStorage', 'foobar');
    // };
}]);

app.service('subsidyEditService', function() {
  var savedata={
    subsidyid:-1,
    directpath:"/employee/data/subsidylist"
  }

  var addSubsidy = function(id,path) {
      savedata.subsidyid=id;
      savedata.directpath=path;
  };

  var getSubsidy = function(){
      return savedata;
  };

  return {
    addSubsidy: addSubsidy,
    getSubsidy: getSubsidy
  };

});


var http_url="http://192.168.1.123/samurai/public/";