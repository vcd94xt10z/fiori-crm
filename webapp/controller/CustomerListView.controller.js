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
            var oView = this.getView();
            var oFModel = new sap.ui.model.json.JSONModel();
            oFModel.setData({
                "Customerid": "",
                "Name": "",
                "Email": "",
                "SortField": "Name",
                "SortType": "ASC",
                "Limit": "10",
                "Offset": "0"
            });
            oView.setModel(oFModel,"filter");

            this.onFilter();
        },

        onFilterReset: function(){

        },

        onFilterSearch: function(oEvent){
            var oView   = this.getView();
            var oTable  = oView.byId("table1");
            var oFModel = oView.getModel("filter");
            var oFData  = oFModel.getData();
            var oFilter = null;

            // aplicando filtros
            var aFilters = [];
            var aSorter = [];

            console.log(oFData);

            if(oFData.Customerid != ''){
                oFilter = new sap.ui.model.Filter({
                    path: 'Customerid',
                    operator: sap.ui.model.FilterOperator.EQ,
                    value1: oFData.Customerid
                });
                aFilters.push(oFilter);
            }

            if(oFData.Name != ''){
                oFilter = new sap.ui.model.Filter({
                    path: 'Name',
                    operator: sap.ui.model.FilterOperator.Contains,
                    value1: oFData.Name
                });
                aFilters.push(oFilter);
            }

            if(oFData.Email != ''){
                oFilter = new sap.ui.model.Filter({
                    path: 'Email',
                    operator: sap.ui.model.FilterOperator.Contains,
                    value1: oFData.Email
                });
                aFilters.push(oFilter);
            }

            var bDescending = false;
            if(oFData.SortType == "DESC"){
                bDescending = true;
            }
            var oSort = new sap.ui.model.Sorter(oFData.SortField,bDescending);
            aSorter.push(oSort);

            /*
            var oModel = this.getOwnerComponent().getModel();
            oModel.read("customerSet",{
                sorters: aSorter,
                filters: aFilters,
                success: function(oData, oResponse){
                    console.log(oData);
                    console.log(oResponse);
                },
                error: function(oError){
                    console.log(oError);
                }
            });
            */

            // executando filtro
            oTable.bindRows({
                path: '/customerSet',
                sorter: aSorter,
                filters: aFilters,
                startIndex: oFData.Offset,
                length: oFData.Limit
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