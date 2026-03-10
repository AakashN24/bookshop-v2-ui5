/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["bookshopcatalogv2/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
