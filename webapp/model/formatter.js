sap.ui.define([
],function(){
    "use strict";

    return {
        formatDate: function(oDate){
            if(oDate == "" || oDate == undefined || oDate == null){
                return "";
            }

            var day   = oDate.getDate();
            var month = oDate.getMonth()+1;
            var year  = oDate.getFullYear();

            if(day < 10){
                day = "0"+day;
            }

            if(month < 10){
                month = "0"+month;
            }

            var sValue = day+"/"+month+"/"+year;

            return sValue;
        },

        formatWeight: function(sValue){
            if(sValue == null || sValue == undefined){
                return "";
            }
            try {
                sValue = String(sValue).replace(/[^0-9.]/g,'');
                sValue = Number.parseFloat(sValue).toFixed(2);
                return sValue;
            }catch(e){
                return sValue;
            }
        },

        genderIndex: function(sValue){
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