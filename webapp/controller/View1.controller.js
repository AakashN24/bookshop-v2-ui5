sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("bookshopcatalogv2.controller.View1", {
        onInit() {
        },
        async onCreate() {
            this.oCreateDialog ??= await this.loadFragment({
                name: "bookshopcatalogv2.view.create"
            })
            this.oCreateDialog.open();
            MessageToast.show('Create Clicked');
        },
        onDialogCancel() {
            this.oCreateDialog?.close();
        },
        onDialogCreate() {
            let vTitle = this.byId("input1").getValue();
            let vStock = this.byId("stockInput").getValue();
            let vID = this.byId("idInput").getValue();

            const oTableBinding = this.byId("Books").getBinding("items");
            console.log('oTableBinding---', oTableBinding)

            this.getView().getModel().create("/Books", {
                ID: vID,
                title: vTitle,
                stock: vStock
            },
                {
                    success: (oData, oResponse) => {
                        console.log(oData, oResponse)
                        this.oCreateDialog?.close();
                    },
                    error: (oError) => {
                        console.log(oError);
                        this.oCreateDialog?.close();
                    }
                })
        },
        onDeletePress(oEvent) {
            let oContext = oEvent.getSource().getBindingContext();

            let sPath = oContext.getPath()

            this.getView().getModel().remove(sPath, {
                success: (oData, oResponse) => {
                    console.log(oData, oResponse);
                },
                error: (oError) => {
                    console.log(oError);
                }
            })
        }
    });
});