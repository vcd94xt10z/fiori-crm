sap.ui.define([
],function(){
    "use strict";

    return {
        formatDate: function(sValue){
            if(sValue == "" || sValue == undefined || sValue == null){
                return "";
            }

            var d     = new Date(sValue);
            var day   = d.getDate();
            var month = d.getMonth()+1;
            var year  = d.getFullYear();

            if(day < 10){
                day = "0"+day;
            }

            if(month < 10){
                month = "0"+month;
            }

            sValue = day+"/"+month+"/"+year;

            return sValue;
        },

        weight: function(sValue){
            try {
                return sValue.replaceAll(/[^0-9.]/g,'');
            }catch(e){
                return '';
            }
        },

        gender: function(sValue){
            if(sValue == 'F' ){
                return 1;
            }
            return 0;
        },

        formatGender: function(sValue){
            if(sValue == 'F' ){
                return "Feminino";
            }
            return "Masculino";
        }
    };
});