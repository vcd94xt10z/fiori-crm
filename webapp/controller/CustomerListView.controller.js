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

        onSearch: function(oEvent){
            var oSource = oEvent.getSource();
            var sValue  = oSource.getValue();
            var oView   = this.getView();
            var oTable  = oView.byId("table1");

            var aFilters = [];
            var oFilter = new sap.ui.model.Filter({
                path: 'Name',
                operator: sap.ui.model.FilterOperator.Contains,
                value1: sValue
            });
            aFilters.push(oFilter);

            oTable.bindRows({
                path: '/customerSet',
                filters: aFilters
            });
        },

        onFilterEvent: function(oEvent){
            this.onFilter(true);
        },

        onFilter: function(bShowMessage){
            console.log("filter");
            var oView = this.getView();
            var oTable = oView.byId("table1");
            var oModel = this.getOwnerComponent().getModel();
            var aSorters = [];
            var bDescending = false;
            var oSort = new sap.ui.model.Sorter("Name",bDescending);
            aSorters.push(oSort);

            oModel.read("/customerSet",{
                sorters: aSorters,
                success: function(oData, oResponse){
                    console.log(oData);
                    console.log(oResponse);
                    oModel.refresh(true);
                },
                error: function(oError){
                    console.log(oError);
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