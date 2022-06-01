sap.ui.define([
    "zns/fioricrm/controller/BaseController",
    "sap/ui/core/UIComponent",
    "../model/formatter",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController,UIComponent,formatter,MessageToast) {
        "use strict";

        return BaseController.extend("zns.fioricrm.controller.CustomerFormView", {
            formatter: formatter,

            onInit: function () {
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.getRoute("RouteCustomerNew").attachMatched(this._onRouteMatchedNew,this);
                oRouter.getRoute("RouteCustomerEdit").attachMatched(this._onRouteMatchedEdit,this);
            },

            onSelectGender: function(oEvent){
                var oModel  = this.getView().getModel();
                var oData   = oModel.getData();
                var oParams = oEvent.getParameters();

                if(oParams.selectedIndex == 1){
                    oData.Gender = 'F';
                }else{
                    oData.Gender = 'M';
                }
                oModel.setData(oData);
            },

            onChangeDate: function(oEvent){
                var sValue = oEvent.getParameter("value");

                if(sValue == ""){
                    return "";
                }
                
                // removendo tudo exceto numeros e ponto
                sValue = sValue.replaceAll(/[^0-9]/g,'');

                sValue = sValue.substring(0,8);

                if(sValue.length == 6){
                    sValue = sValue.substring(0,4)+"20"+sValue.substring(4,6);
                }
                
                var aValue = sValue.split('');
                
                sValue = '';
                for(var i in aValue){
                    sValue += aValue[i];
                    
                    switch(i){
                    case '1':
                        sValue += '/';
                        break;
                    case '3':
                        sValue += '/';
                        break;
                    }
                }

                oEvent.getSource().setValue(sValue);
            },

            onLiveChangeWeight: function(oEvent){
                var sValue = oEvent.getParameter("value");
                
                // removendo tudo exceto numeros e ponto
                sValue = sValue.replaceAll(/[^0-9.]/g,'');

                // avaliando caracter por caracter, caso tenha mais de 1 ponto, para de concatenar
                var aValue    = sValue.split('');
                var newValue   = "";
                var pointCount = 0;
                
                for(var i = 0;i<aValue.length;i++){
                    var c = aValue[i];
                    if(c == '.'){
                        pointCount++;
                    }

                    if(pointCount > 1){
                        break;
                    }

                    newValue += c;
                }

                // devolvendo o valor
                oEvent.getSource().setValue(newValue);
            },

            onDefaultCustomer: function(){
                var oDate = new Date();
                oDate.setDate(oDate.getDate() - 2);

                var oModel = new sap.ui.model.json.JSONModel();
                oModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
                oModel.setData({
                    Customerid: '1',
                    Name: 'José da Silva',
                    Email: 'user@email.com.br',
                    BornDate: oDate,
                    Weight: 0.0,
                    Gender: 'M',
                    Country: 'USA'
                });
                this.getView().setModel(oModel);
            },

            onPrintOData: function(){
                var oModel = this.getView().getModel();
                var oData  = oModel.getData();
                alert(JSON.stringify(oData));
            },

            onSave: function(){
                var oModel1 = this.getOwnerComponent().getModel();
                var oModel2 = this.getView().getModel();
                var oData  = oModel2.getData();
                var that   = this;

                // validações
                var oName = this.getView().byId("customer.name");
                oName.setValueState("None");

                if(oData.Name == ""){
                    oName.setValueState("Error");
                    MessageToast.show("Nome vazio");
                    return;
                }

                if(oData.Customerid == ""){
                    oModel1.create("/customerSet",oData,{
                        success: function(oData, oResponse){
                            if(oResponse.statusCode == 201){
                                oModel2.setData(oData);
                                MessageToast.show("Cliente cadastrado com sucesso");
                            }
                        },
                        error: function(oError){
                            MessageToast.show("Erro");
                        }}
                    );
                }else{
                    oModel1.update("/customerSet("+oData.Customerid+")",oData,{
                        success: function(oData, oResponse){
                            if(oResponse.statusCode == 204){
                                MessageToast.show("Cliente cadastrado com sucesso");
                            }
                        },
                        error: function(oError){
                            MessageToast.show("Erro");
                        }}
                    );
                }
            },

            _onRouteMatchedEdit: function(oEvent){
                var that = this;
                var oArgs = oEvent.getParameter("arguments");
                var sCustomerId = oArgs.Customerid;
                var oModel = this.getOwnerComponent().getModel();
                var sPath  = "/customerSet("+sCustomerId+")";

                oModel.read(sPath,{
                    success: function(oData, oResponse){
                        that.getView().setModel(new sap.ui.model.json.JSONModel(oData));
                    },
                    error: function(oError){
                    }
                });
            },

            _onRouteMatchedNew: function(oEvent){
                var oModel = new sap.ui.model.json.JSONModel();
                oModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
                oModel.setData({
                    Customerid: '',
                    Name: '',
                    Email: '',
                    BornDate: null,
                    Weight: 0.0,
                    Gender: 'M',
                    Country: ''
                });
                this.getView().setModel(oModel);
            }
        });
    });
