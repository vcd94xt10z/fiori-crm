sap.ui.define([
    "sap/ui/test/Opa5",
    "sap/ui/test/actions/Press",
    "sap/ui/test/matchers/PropertyStrictEquals",
    "sap/ui/test/actions/EnterText",
    "sap/ui/test/matchers/Properties",
    "sap/ui/test/matchers/Ancestor",
	"sap/ui/test/matchers/AggregationFilled"
],function(Opa5,Press,PropertyStrictEquals,EnterText, Properties, Ancestor,AggregationFilled){
    "use strict";

    Opa5.createPageObjects({
        onTheCustomerListPage: {
            actions: {
                iEnterName: function (sName) {
					return this.waitFor({
                        viewName: "CustomerListView",
						id: "Customer.Name",
						actions: new EnterText({text: sName}),
						success: function () {
						},
						errorMessage: "Could not enter Name"
					});
				},

				iPressOnTheFilterButton : function () {
					return this.waitFor({
						viewName: "CustomerListView",
						id: "filterBar1",
						actions: function(oFilterBar){
							oFilterBar.search();
						},
						errorMessage : "The filter button could not be pressed"
					});
				},

				iPressOnTheEditButton : function () {
					return this.waitFor({
						controlType: "sap.m.Button",
						matchers: new Properties({icon : "sap-icon://edit"}),
						actions: new Press(),
						errorMessage : "The edit button could not be pressed"
					});
				},

				iPressOnTheDeleteButton : function () {
					return this.waitFor({
						controlType: "sap.m.Button",
						matchers: new Properties({icon : "sap-icon://delete"}),
						actions: new Press(),
						errorMessage : "The delete button could not be pressed"
					});
				}
            },

            assertions: {
                iShouldSeeTheApp: function () {
					return this.waitFor({
						viewName: "CustomerListView",
						success: function () {
							Opa5.assert.ok(true, "The CustomerListView view is displayed");
						},
						errorMessage: "Did not find the CustomerListView view"
					});
				},

				iShouldSeeTheOnlyOneRegister: function (sName) {
					return this.waitFor({
						viewName: "CustomerListView",
						id: "table1",
						timeout: 5,
						matchers : new AggregationFilled({name : "rows"}),
						check: function(oTable){
							var aRows = oTable.getRows();
							for(var i in aRows){
								var aCells = aRows[i].getCells();
								for(var j in aCells){
									var oCell = aCells[j];
									try {
										var sText = oCell.getText();
										
										if(sText == sName){
											return true;
										}
									}catch(e){
									}
								}

								// só analisa a primeira linha
								break;
							}
					
							return false;
						},
						success: function () {
							Opa5.assert.ok(true, "The name filter works");
						},
						errorMessage: "The name filter didn't work"
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