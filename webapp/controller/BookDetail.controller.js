sap.ui.define([
    "./BaseController",
    "sap/ui/core/routing/History"
], (BaseController, History) => {
    return BaseController.extend("bookshopcatalogv2.controller.BookDetail", {
        onEditBtnPress() {
            // this.getRouter().navTo("BookDetailEdit", {}, true /*no History*/);
            //using target directly so the hash won't change and history is not updated
            this.getRouter().getTargets().display('TargetBookDetailEditPage');
        }
    });
});