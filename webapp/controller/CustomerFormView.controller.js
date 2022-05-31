sap.ui.define([
    "zns/fioricrm/controller/BaseController",
    "sap/ui/core/UIComponent",
    "../model/formatter",
    "../model/DAO",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController,UIComponent,formatter,DAO,MessageToast) {
        "use strict";

        return BaseController.extend("zns.fioricrm.controller.CustomerFormView", {
            formatter: formatter,

            onInit: function () {
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.getRoute("RouteCustomerNew").attachMatched(this._onRouteMatchedNew,this);
                oRouter.getRoute("RouteCustomerEdit").attachMatched(this._onRouteMatched,this);
            },

            onSelectGender: function(oEvent){
                var oModel  = this.getOwnerComponent().getModel();
                var oData   = oModel.getData();
                var oParams = oData.gender = oEvent.getParameters();

                if(oParams.selectedIndex == 1){
                    oData.gender = 'F';
                }else{
                    oData.gender = 'M';
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
                    customerid: '1',
                    name: 'José da Silva',
                    email: 'user@email.com.br',
                    bornDate: oDate,
                    weight: 0.0,
                    gender: 'M',
                    country: 'USA'
                });
                this.getOwnerComponent().setModel(oModel);
            },

            onPrintOData: function(){
                var oModel = this.getOwnerComponent().getModel();
                var oData  = oModel.getData();
                alert(JSON.stringify(oData));
            },

            onSave: function(){
                var oModel = this.getOwnerComponent().getModel();
                var oData  = oModel.getData();
                var that   = this;

                //console.log(oData);

                // validações
                var oName = this.getView().byId("customer.name");
                oName.setValueState("None");

                if(oData.name == ""){
                    oName.setValueState("Error");
                    MessageToast.show("Nome vazio");
                    return;
                }

                if(oData.customerid == ""){
                    // obtendo próximo id disponível
                    DAO.getNextId(function(result){
                        oData.customerid = result.nextId;

                        DAO.createCustomer(oData,function(result){
                            if(result.httpStatus == 200){
                                MessageToast.show("Cliente cadastrado com sucesso");

                                // atualizando model
                                oModel.setData(oData);
                                that.getOwnerComponent().setModel(oModel);
                            }else{
                                MessageToast.show("Erro: "+result.message);
                            }
                        });
                    });
                }else{
                    DAO.updateCustomer(oData,function(result){
                        if(result.httpStatus == 204){
                            MessageToast.show("Cliente "+oData.customerid+" atualizado com sucesso");
                        }else{
                            MessageToast.show("Erro: "+result.message);
                        }
                    });
                }
            },

            _onRouteMatched: function(oEvent){
                var that = this;
                var oArgs = oEvent.getParameter("arguments");
                var customerid = oArgs.customerid;

                DAO.readCustomer({customerid:customerid},function(result){
                    //console.log(result.data);
                    var oModel = new sap.ui.model.json.JSONModel();
                    oModel.setData(result.data);
                    oModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
                    that.getOwnerComponent().setModel(oModel);
                });
            },

            _onRouteMatchedNew: function(oEvent){
                var oModel = new sap.ui.model.json.JSONModel();
                oModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
                oModel.setData({
                    customerid: '',
                    name: '',
                    email: '',
                    bornDate: null,
                    weight: 0.0,
                    gender: 'M',
                    country: ''
                });
                this.getOwnerComponent().setModel(oModel);
            }
        });
    });
