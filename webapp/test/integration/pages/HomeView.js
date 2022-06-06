sap.ui.define([
	"sap/ui/test/Opa5"
], function (Opa5) {
	"use strict";

	Opa5.createPageObjects({
		onTheHomePage: {

			actions: {},

			assertions: {

				iShouldSeeTheApp: function () {
					return this.waitFor({
						id: "app",
						viewName: "HomeView",
						success: function () {
							Opa5.assert.ok(true, "The HomeView view is displayed");
						},
						errorMessage: "Did not find the HomeView view"
					});
				},

				iShouldSeeTheButtoNew: function () {
					return this.waitFor({
						id : "buttonCustomerNew",
						timeout: 3,
						success : function (oList) {
							Opa5.assert.ok(oList, "Found the button new customer");
						}
					});
				}
			}
		}
	});

});
