sap.ui.define(["./BaseController"], (BaseController) => {
    return BaseController.extend("bookshopcatalogv2.controller.BookDetailEdit", {
        onPressSaveBtnFooterEditPage() {
            const oModel = this.getView().getModel();
            if (oModel.hasPendingChanges()) {
                oModel.submitChanges({
                    success: oData => {
                        MessageBox.information("Book has been Updated");
                        // this.getRouter().navTo('BookDetail', {}, true /*no History*/);
                        this.getRouter().getTargets().display('TargetBookDetail');
                    },
                    error: oError => {
                        MessageBox.error(oError.message)
                        // this.getRouter().navTo('BookDetail', {}, true /*no History*/);
                        this.getRouter().getTargets().display('TargetBookDetail');

                    }
                })
            } else {
                // this.getRouter().navTo('BookDetail', {}, true /*no History*/);
                this.getRouter().getTargets().display('TargetBookDetail');

            }
        },
        onPressCancelBtnFooterEditPage() {
            // this.getRouter().navTo('BookDetail', {}, true /*no History*/);
            this.getRouter().getTargets().display('TargetBookDetail');

        }
    });
})