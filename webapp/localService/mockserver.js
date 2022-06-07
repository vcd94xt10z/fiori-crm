sap.ui.define([
	"sap/ui/core/util/MockServer",
	"sap/base/util/UriParameters"
], function (MockServer, UriParameters) {
	"use strict";

	return {
		init: function () {
			// create
			var oMockServer = new MockServer({
				rootUri: "/sap/opu/odata/SAP/ZCRM_SRV/"
			});

			var oUriParameters = UriParameters.fromQuery(window.location.search);

			// configure mock server with a delay
			MockServer.config({
				autoRespond: true,
				autoRespondAfter: oUriParameters.get("serverDelay") || 2
			});

			// simulate
			// ATENÇÃO! esse caminho muda dependendo do lugar que é chamado
			
			//var sPath = "../localService/"; // para mock da aplicação
			var sPath = "../../localService/"; // para testes integrados
			oMockServer.simulate(sPath + "/metadata.xml", sPath + "/mockdata");

			// start
			oMockServer.start();
		}
	};

});