/*global QUnit*/

sap.ui.define([
	"sap/ui/test/opaQunit",
	"./pages/HomeView",
	"./pages/CustomerFormView"
], function (opaTest) {
	"use strict";

	QUnit.module("Navigation Journey");

	opaTest("Should see the initial page of the app", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp();

		// Assertions
		Then.onTheHomePage.iShouldSeeTheApp();

		Then.onTheHomePage.iShouldSeeTheButtoNew();

		//Cleanup
		//Then.iTeardownMyApp();
	});

	opaTest("Should go to form", function (Given, When, Then) {
		// Assertions
		When.onTheHomePage.iPressOnTheNewButton();

		Then.onTheCustomerFormPage.iShouldSeeTheApp();
	});

	opaTest("Should I fill the form", function (Given, When, Then) {
		// Assertions
		When.onTheCustomerFormPage.iEnterName("Jack Sparow");
		When.onTheCustomerFormPage.iEnterEmail("jack.sparow@disney.com");
		When.onTheCustomerFormPage.iEnterBornDate("01/02/1993");
		When.onTheCustomerFormPage.iEnterWeight("80.15");
		When.onTheCustomerFormPage.iChooseGenderM();
		When.onTheCustomerFormPage.iSelectCountry();
		When.onTheCustomerFormPage.iPressOnTheSaveButton();
		

		Then.onTheCustomerFormPage.iShouldSeeTheApp();
	});
});
