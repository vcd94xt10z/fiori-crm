sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "../model/formatter",
    "sap/ui/core/routing/History"
],function(Controller,UIComponent,formatter,History){
    'use strict';

    return Controller.extend("zns.fioricrm.controller.BaseController",{
        formatter: formatter,

        onPageBack: function(){
            var oHistory      = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				UIComponent.getRouterFor(this).navTo("RouteHomeView");
			}
        }
    });
});