/*global QUnit*/

sap.ui.define([
	"sap/ui/test/opaQunit",
	"./pages/HomeView",
	"./pages/CustomerFormView",
	"./pages/CustomerListView"
], function (opaTest) {
	"use strict";

	var oCustomer = {
		Name: "Captain Jack Sparrow",
		Email: "jack.sparrow@disney.com",
		BornDate: "31/12/1982",
		Weight: 78.12,
		Gender: "M",
		Country: "US"
	};
	

	QUnit.module("Navigation Journey");

	opaTest("Should see the initial page of the app", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp();

		// Assertions
		Then.onTheHomePage.iShouldSeeTheApp();

		Then.onTheHomePage.iShouldSeeTheButtoNew();
	});

	opaTest("Should go to form", function (Given, When, Then) {
		// Assertions
		When.onTheHomePage.iPressOnTheNewButton();

		Then.onTheCustomerFormPage.iShouldSeeTheApp();
	});

	opaTest("Should I fill the form", function (Given, When, Then) {
		// Assertions
		When.onTheCustomerFormPage.iEnterName(oCustomer.Name);
		When.onTheCustomerFormPage.iEnterEmail(oCustomer.Email);
		When.onTheCustomerFormPage.iEnterBornDate(oCustomer.BornDate);
		When.onTheCustomerFormPage.iEnterWeight(oCustomer.Weight);
		if(oCustomer.Gender == "M"){
			When.onTheCustomerFormPage.iChooseGenderF();
		}else{
			When.onTheCustomerFormPage.iChooseGenderM();
		}
		
		When.onTheCustomerFormPage.iSelectCountry(oCustomer.Country);
		When.onTheCustomerFormPage.iPressOnTheSaveButton();
		
		Then.onTheCustomerFormPage.iShouldSeeTheSuccessMessage();
		When.onTheCustomerFormPage.iPressOnTheBackButton();
	});

	opaTest("Should I filter customer name", function (Given, When, Then) {
		When.onTheHomePage.iPressOnTheListButton();

		Then.onTheCustomerListPage.iShouldSeeTheApp();

		// Assertions
		When.onTheCustomerListPage.iEnterName(oCustomer.Name);
		When.onTheCustomerListPage.iPressOnTheFilterButton();
		
		Then.onTheCustomerListPage.iShouldSeeTheOnlyOneRegister(oCustomer.Name);

		Then.onTheCustomerListPage.iShouldSeeTheApp();
	});

	opaTest("Should I edit a customer", function (Given, When, Then) {
		When.onTheCustomerListPage.iPressOnTheEditButton();
		When.onTheCustomerFormPage.iEnterName(oCustomer.Name+" 2");
		When.onTheCustomerFormPage.iEnterEmail(oCustomer.Email+" 2");
		When.onTheCustomerFormPage.iEnterBornDate("01/01/2015");
		When.onTheCustomerFormPage.iEnterWeight("99.99");
		if(oCustomer.Gender == "M"){
			When.onTheCustomerFormPage.iChooseGenderF();
		}else{
			When.onTheCustomerFormPage.iChooseGenderM();
		}
		
		When.onTheCustomerFormPage.iSelectCountry("BR");

		When.onTheCustomerFormPage.iPressOnTheSaveButton();
		Then.onTheCustomerFormPage.iShouldSeeTheSuccessMessage();
		When.onTheCustomerFormPage.iPressOnTheBackButton();
		Then.onTheCustomerListPage.iShouldSeeTheApp();
	});

	opaTest("Should I delete a customer", function (Given, When, Then) {
		When.onTheCustomerListPage.iPressOnTheDeleteButton();
		Then.onTheCustomerListPage.iShouldSeeTheSuccessMessage();

		When.onTheCustomerListPage.iEnterName("");
		When.onTheCustomerListPage.iPressOnTheFilterButton();

		//Cleanup
		Then.iTeardownMyApp();
	});
});
