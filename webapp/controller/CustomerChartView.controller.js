sap.ui.define([
    "zns/fioricrm/controller/BaseController",
    'sap/ui/model/json/JSONModel', 
    'sap/viz/ui5/data/FlattenedDataset', 
    'sap/viz/ui5/controls/common/feeds/FeedItem'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, JSONModel, FlattenedDataset, FeedItem) {
        "use strict";

        return BaseController.extend("zns.fioricrm.controller.CustomerChartView", {
            _constants: {
                vizFrame: {
                    id: "chartContainerVizFrame",
                    dataset: {
                        dimensions: [{
                            name: 'Country',
                            value: "{Country}"
                        }],
                        measures: [{
                            group: 1,
                            name: 'Count',
                            value: '{Count}'
                        }],
                        data: {
                            path: "/Customers"
                        }
                    },
                    type: "line",
                    properties: {
                        plotArea: {
                            showGap: true
                        }
                    },
                    feedItems: [{
                        'uid': "primaryValues",
                        'type': "Measure",
                        'values': ["Count"]
                    }, {
                        'uid': "axisLabels",
                        'type': "Dimension",
                        'values': ["Country"]
                    }]
                }
            },
            
            onInit: function() {
                var oVizFrame = this.getView().byId(this._constants.vizFrame.id);
                this._updateVizFrame(oVizFrame);
            },
            
            _updateVizFrame: function(vizFrame) {
                var oVizFrame = this._constants.vizFrame;
                var oModel = new JSONModel({
                    "Customers": [
                        {"Country": "BR","Count": 1},
                        {"Country": "US","Count": 2},
                        {"Country": "EN","Count": 3},
                        {"Country": "DE","Count": 2}
                    ]
                });
                var oDataset = new FlattenedDataset(oVizFrame.dataset);
    
                vizFrame.setVizProperties(oVizFrame.properties);
                vizFrame.setDataset(oDataset);
                vizFrame.setModel(oModel);
                this._addFeedItems(vizFrame, oVizFrame.feedItems);
                vizFrame.setVizType(oVizFrame.type);
            },
            
            _addFeedItems: function(vizFrame, feedItems) {
                for (var i = 0; i < feedItems.length; i++) {
                    vizFrame.addFeed(new FeedItem(feedItems[i]));
                }
            }
        });
    });
