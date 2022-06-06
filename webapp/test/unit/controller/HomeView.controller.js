/*global QUnit*/

sap.ui.define([
	"zns/fiori-crm/controller/HomeView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("HomeView Controller");

	QUnit.test("I should test the HomeView controller", function (assert) {
		var oHomeController = new Controller();
		//oHomeController.onDisplay();
		assert.ok(oHomeController);
	});

});
