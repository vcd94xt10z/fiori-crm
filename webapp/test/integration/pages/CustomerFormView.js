sap.ui.define([
    "sap/ui/test/Opa5",
    "sap/ui/test/actions/Press",
    "sap/ui/test/matchers/PropertyStrictEquals",
    "sap/ui/test/actions/EnterText",
    "sap/ui/test/matchers/Properties",
    "sap/ui/test/matchers/Ancestor"
],function(Opa5,Press,PropertyStrictEquals,EnterText, Properties, Ancestor){
    "use strict";

    Opa5.createPageObjects({
        onTheCustomerFormPage: {
            actions: {
                iEnterName: function (sName) {
					return this.waitFor({
                        viewName: "CustomerFormView",
						id: "customer.name",
						actions: new EnterText({text: sName}),
						success: function () {
						},
						errorMessage: "Could not enter Name"
					});
				},

                iEnterEmail: function (sEmail) {
					return this.waitFor({
                        viewName: "CustomerFormView",
						id: "customer.email",
						actions: new EnterText({text: sEmail}),
						success: function () {
						},
						errorMessage: "Could not enter E-mail"
					});
				},

                iEnterBornDate: function (sDate) {
					return this.waitFor({
                        viewName: "CustomerFormView",
						id: "customer.bornDate",
						actions: new EnterText({text: sDate}),
						success: function () {
						},
						errorMessage: "Could not enter bornDate"
					});
				},

                iEnterWeight: function (sWeight) {
					return this.waitFor({
                        viewName: "CustomerFormView",
						id: "customer.weight",
						actions: new EnterText({text: sWeight}),
						success: function () {
						},
						errorMessage: "Could not enter weight"
					});
				},

                iChooseGenderM: function () {
					return this.waitFor({
                        viewName: "CustomerFormView",
						id: "genderM",
						actions: new Press(),
						success: function () {
						},
						errorMessage: "Could not enter gender M"
					});
				},

                iChooseGenderF: function () {
					return this.waitFor({
                        viewName: "CustomerFormView",
						id: "genderF",
						actions: new Press(),
						success: function () {
						},
						errorMessage: "Could not enter gender F"
					});
				},

                iSelectCountry: function (sCountry) {
					this.waitFor({
                        viewName: "CustomerFormView",
						id: "customer.country",
                        actions: new Press(),
                        success: function(oSelect){
                            this.waitFor({
                                viewName: "CustomerFormView",
                                controlType: "sap.ui.core.Item",
                                matchers: [
                                    new Ancestor(oSelect),
                                    new Properties({ key: sCountry})
                                ],
                                actions: new Press(),
                                success: function() {
                                },
                                errorMessage: "Cannot select BR from mySelect"
                            });
                        },
						errorMessage: "The country field was not found"
					});
				},

                iPressOnTheSaveButton : function () {
					return this.waitFor({
						viewName: "CustomerFormView",
						id: "buttonSave",
						actions : new Press(),
						errorMessage : "The save button could not be pressed"
					});
				},

				iPressOnTheBackButton : function () {
					return this.waitFor({
						viewName: "CustomerFormView",
						id: "page2",
						actions: new Press(),
						errorMessage : "The back button could not be pressed"
					});
				}
            },

            assertions: {
                iShouldSeeTheApp: function () {
					return this.waitFor({
						viewName: "CustomerFormView",
						success: function () {
							Opa5.assert.ok(true, "The CustomerFormView view is displayed");
						},
						errorMessage: "Did not find the CustomerFormView view"
					});
				},

				iShouldSeeTheSuccessMessage: function () {
					return this.waitFor({
						//pollingInterval : 100,
						matchers: function () {
							return jQuery(".sapMMessageToast").text();
						  },
						success: function (sMessage) {
							if(sMessage.indexOf("sucesso") >= 0){
								Opa5.assert.ok(true, "The customer was created successfully");
							}else{
								Opa5.assert.ok(false, "Fail to create customer");
							}
						},
						errorMessage: "Fail to create customer"
					});
				}
            }
        }
    });
});