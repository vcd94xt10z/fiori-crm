sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,UIComponent) {
        "use strict";

        return Controller.extend("zns.fioricrm.controller.HomeView", {
            onInit: function () {
                var oRouter = this.getOwnerComponent().getRouter();
                var oTarget = oRouter.getTarget("TargetHomeView");
                oTarget.attachDisplay(this.onDisplay,this);
            },

            onDisplay: function(oEvent){
                var oTile  = this.getView().byId("customerCount");
                var oModel = this.getOwnerComponent().getModel();

                oModel.read("/customerSet",{
                    success: function(oData, oResponse){
                        oTile.setValue(oData.results.length);
                    },
                    error: function(oError){
                    }
                });
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
