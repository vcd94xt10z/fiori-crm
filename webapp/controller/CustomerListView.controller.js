sap.ui.define([
    "zns/fioricrm/controller/BaseController",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent",
    "../model/formatter"
],function(BaseController,MessageToast,UIComponent,formatter){
    "use strict";

    return BaseController.extend("zns.fioricrm.controller.CustomerListView",{
        formatter: formatter,
        
        onInit: function(){
            this.onFilter();
        },

        onFilterEvent: function(oEvent){
            this.onFilter(true);
        },

        onFilter: function(bShowMessage){
            var oModel = this.getOwnerComponent().getModel();
            oModel.read("/customerSet",{
                success: function(oData, oResponse){
                },
                error: function(oError){
                }
            });
        },

        onEdit: function(oEvent){
            var oSource = oEvent.getSource();
            var sCustomerid = oSource.data("Customerid");
            
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("RouteCustomerEdit",{Customerid:sCustomerid});
        },

        onDelete: function(oEvent){
            var oSource = oEvent.getSource();
            var sCustomerid = oSource.data("Customerid");
            var oModel = this.getOwnerComponent().getModel();
            var sPath = "/customerSet("+sCustomerid+")";
            
            oModel.remove(sPath,{
                success: function(oData, oResponse){
                    if(oResponse.statusCode == 204){
                        MessageToast.show("Cliente removido com sucesso");
                    }
                },
                error: function(oError){
                    MessageToast.show("Erro em remover cliente");
                }
            });
        }
    });
});