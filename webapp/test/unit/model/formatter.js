sap.ui.define([
    "zns/fiori-crm/model/formatter"
],function(formatter){
    "use strict";

    QUnit.module("formatter");

    QUnit.test("Testando formatação de data",function(assert){
        var oDate = new Date("2022-12-30T00:00:00");
        var sValue = formatter.formatDate(oDate);
        assert.strictEqual(sValue,"30/12/2022","Formatação de data OK");
    });

    QUnit.test("Testando formatação de peso",function(assert){
        var sValue = formatter.formatWeight("125.234");
        assert.strictEqual(sValue,"125.23","Formatação de peso OK");
    });
});