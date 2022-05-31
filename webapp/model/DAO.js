sap.ui.define([

],function(){
    "use strict";

    return {
        /* localStorage ou oData */
        _storage: 'localStorage',

        _getItem: function(path){
            var item = null;

            try {
                item = JSON.parse(window.localStorage.getItem(path));
            }catch(e){
            }

            return item;
        },

        _getItemArray: function(path){
            var itemList = this._getItem(path);

            if(itemList == null || itemList == undefined){
                itemList = [];
            }

            return itemList;
        },

        _setItem: function(path,obj){
            try {
                window.localStorage.setItem(path,JSON.stringify(obj));
            }catch(e){
            }
        },

        _fixCustomer: function(obj){
            obj.bornDate = new Date(obj.bornDate);
            return obj;
        },

        createCustomer: function(obj,callback){
            var path = "customer";
            var itemList = this._getItemArray(path);

            for(var i in itemList){
                var item = itemList[i];
                if(item.customerid == obj.customerid){
                    callback({
                        httpStatus: 400,
                        message: 'Registro duplicado'
                    });
                    return;
                }
            }

            itemList.push(obj);
            this._setItem(path,itemList);

            callback({
                httpStatus: 200
            });
        },

        updateCustomer: function(obj,callback){
            var path = "customer";
            var itemList = this._getItemArray(path);
            var found = false;

            for(var i in itemList){
                var item = itemList[i];
                if(item.customerid == obj.customerid){
                    itemList[i] = obj;
                    this._setItem(path,itemList);
                    found = true;
                    callback({
                        httpStatus: 204
                    });
                    break;
                }
            }
            if(!found){
                callback({
                    httpStatus: 400,
                    message: 'Registro não localizado para atualizar'
                });
                return;
            }
        },

        deleteCustomer: function(obj,callback){
            if(obj == null || obj.customerid == null){
                callback({
                    httpStatus: 400,
                    message: 'Chave do objeto inválida'
                });
                return;
            }

            var path = "customer";
            var itemList = this._getItemArray(path);
            var found = false;

            for(var i in itemList){
                var item = itemList[i];
                if(item.customerid == obj.customerid){
                    // coloca null e remove do array
                    itemList[i] = null;
                    itemList = itemList.filter(Boolean);

                    this._setItem(path,itemList);
                    found = true;
                    callback({
                        httpStatus: 204
                    });
                    break;
                }
            }
            if(!found){
                callback({
                    httpStatus: 400,
                    message: 'Registro não localizado para remover'
                });
                return;
            }
        },

        readCustomer: function(obj,callback){
            var path = "customer";
            var itemList = this._getItemArray(path);
            var that = this;

            for(var i in itemList){
                var item = itemList[i];
                if(item.customerid == obj.customerid){
                    callback({
                        httpStatus: 200,
                        data: that._fixCustomer(item)
                    });
                    return;
                }
            }

            callback({
                httpStatus: 404,
                data: null
            });
        },

        queryCustomer: function(callback){
            var path = "customer";
            var itemList = this._getItemArray(path);

            for(var i=0;i<itemList.length;i++){
                itemList[i] = this._fixCustomer(itemList[i]);
            }

            callback({
                httpStatus: 200,
                data: itemList
            });
        },

        getNextId: function(callback){
            this.queryCustomer(function(result){
                var maxId = 0;

                for(var i in result.data){
                    if(result.data[i].customerid > maxId){
                        maxId = result.data[i].customerid;
                    }
                }
                maxId++;

                callback({
                    nextId: maxId
                });
            });
        }
    };
});