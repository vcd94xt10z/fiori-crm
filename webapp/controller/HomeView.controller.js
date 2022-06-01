sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "../model/DAO"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,UIComponent,DAO) {
        "use strict";

        return Controller.extend("zns.fioricrm.controller.HomeView", {
            onInit: function () {
                var oRouter = this.getOwnerComponent().getRouter();
                var oTarget = oRouter.getTarget("TargetHomeView");
                oTarget.attachDisplay(this.onDisplay,this);

                this.getOwnerComponent().getModel().read("/customerSet",{
                    success: function(oData, oResponse){
                        console.log("-------------------------------")
                        console.log(oData);
                        console.log(oResponse);
                    },
                    error: function(oError){
                        console.log("-------------------------------")
                        console.log(oError);
                    }
                });
            },

            onBeforeRendering: function(){
            },

            onAfterRendering: function(){
            },

            onDisplay: function(oEvent){
                var elem = this.getView().byId("customerCount");

                DAO.queryCustomer(function(result){
                    elem.setValue(result.data.length);
                })
            },

            onCustomerNewPage: function(){
                var r = UIComponent.getRouterFor(this);
                r.navTo("RouteCustomerNew");
            },

            onCustomerListPage: function(){
                var r = UIComponent.getRouterFor(this);
                r.navTo("RouteCustomerList");
            }
        });
    });
