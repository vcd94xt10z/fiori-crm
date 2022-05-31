sap.ui.define([
    "zns/fioricrm/controller/BaseController",
    "../model/DAO",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent",
    "../model/formatter"
],function(BaseController,DAO,MessageToast,UIComponent,formatter){
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
            var that = this;
            DAO.queryCustomer(function(result){
                var oModel = new sap.ui.model.json.JSONModel();
                oModel.setData({
                    customerList: result.data
                });
                that.getOwnerComponent().setModel(oModel,"model");
                if(bShowMessage === true){
                    MessageToast.show("Dados atualizados");
                }
            });
        },

        onEdit: function(oEvent){
            var oSource = oEvent.getSource();
            var customerid = oSource.data("customerid");
            var that = this;
            
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("RouteCustomerEdit",{customerid:customerid});
        },

        onDelete: function(oEvent){
            var oSource = oEvent.getSource();
            var customerid = oSource.data("customerid");
            var that = this;
            
            DAO.deleteCustomer({customerid: customerid},function(result){
                if(result.httpStatus == 204){
                    MessageToast.show("Cliente removido");
                    that.onFilter();
                }else{
                    MessageToast.show("Erro em remover cliente");
                }
            });
        }
    });
});