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
                var sValue1 = oEvent.getParameter("value");
                var sValue2 = "";
                var sValue3 = "";

                if(sValue1 == ""){
                    return "";
                }
                
                // removendo tudo exceto numeros e ponto
                var sValue2 = sValue1.replaceAll(/[^0-9]/g,'');

                sValue2 = sValue2.substring(0,8);

                if(sValue2.length == 6){
                    sValue2 = sValue2.substring(0,4)+"20"+sValue2.substring(4,6);
                }
                
                var aValue = sValue2.split('');
                
                sValue3 = '';
                for(var i in aValue){
                    sValue3 += aValue[i];
                    
                    switch(i){
                    case '1':
                        sValue3 += '/';
                        break;
                    case '3':
                        sValue3 += '/';
                        break;
                    }
                }

                oEvent.getSource().setValue(sValue3);

                // atualizando o model
                if(sValue3.length == 10){
                    var day   = sValue2.substring(0,2);
                    var month = sValue2.substring(2,4);
                    var year  = sValue2.substring(4,8);
                    var date  = year+"-"+month+"-"+day;
                    
                    var oModel = this.getView().getModel();
                    var oData = oModel.getData();
                    oData.BornDate = new Date();
                    oData.BornDate.setTime(Date.parse(date));
                    oModel.setData(oData);
                }
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

            onPrintOData: function(){
                var oModel = this.getView().getModel();
                var oData  = oModel.getData();
                alert(JSON.stringify(oData));
            },

            onSave: function(){
                var oModel1 = this.getOwnerComponent().getModel();
                var oModel2 = this.getView().getModel();
                var oData  = oModel2.getData();
                
                // validações
                var oName = this.getView().byId("customer.name");
                oName.setValueState("None");

                if(oData.Name == ""){
                    oName.setValueState("Error");
                    MessageToast.show("Nome vazio");
                    return;
                }

                // casting
                oData.Customerid = parseInt(oData.Customerid);
               
                if(oData.Customerid == null || isNaN(oData.Customerid)){
                    oData.Customerid = 0;
                }

                if(oData.Customerid == 0){
                    oModel1.create("/customerSet",oData,{
                        success: function(oData, oResponse){
                            oModel2.setData(oData);
                            if(oResponse.statusCode == 201){
                                MessageToast.show("Cliente cadastrado com sucesso");
                            }else{
                                MessageToast.show("Erro");    
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
                                MessageToast.show("Cliente atualizado com sucesso");
                            }
                        },
                        error: function(oError){
                            MessageToast.show("Erro");
                        }}
                    );
                }
            },

            _onRouteMatchedEdit: function(oEvent){
                var that        = this;
                var sPath       = "/customerSet("+sCustomerId+")";
                var oArgs       = oEvent.getParameter("arguments");
                var oModel      = this.getOwnerComponent().getModel();
                var sCustomerId = oArgs.Customerid;
                
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
