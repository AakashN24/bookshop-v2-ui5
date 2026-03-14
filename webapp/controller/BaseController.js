sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/core/routing/History"], (Controller, History) => {
    "use strict";
    return Controller.extend("bookshopcatalogv2.controller.BaseController", {
        onNavBack() {
            const oHistory = History.getInstance();
            const sPreviousHash = oHistory.getPreviousHash();
            const oRouter = this.getOwnerComponent().getRouter();

            if (sPreviousHash !== undefined) {
                window.history.go(-1)
            } else {
                oRouter.navTo('RouteView1', {}, true)
            }
        },
        getRouter() {
            return this.getOwnerComponent().getRouter();
        },
        getResourceModel() {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle();
        }
    })
})