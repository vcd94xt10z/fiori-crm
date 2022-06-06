sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/test/actions/Press"
], function (Opa5, Press) {
	"use strict";

	Opa5.createPageObjects({
		onTheHomePage: {

			actions: {
				iPressOnTheNewButton : function () {
					return this.waitFor({
						viewName: "HomeView",
						id: "buttonCustomerNew",
						actions : new Press(),
						errorMessage : "The new button could not be pressed"
					});
				},
			},

			assertions: {

				iShouldSeeTheApp: function () {
					return this.waitFor({
						viewName: "HomeView",
						success: function () {
							Opa5.assert.ok(true, "The HomeView view is displayed");
						},
						errorMessage: "Did not find the HomeView view"
					});
				},

				iShouldSeeTheButtoNew: function () {
					return this.waitFor({
						viewName: "HomeView",
						id: "buttonCustomerNew",
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
