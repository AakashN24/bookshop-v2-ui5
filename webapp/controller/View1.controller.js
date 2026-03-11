sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "bookshopcatalogv2/model/models"
], (Controller, MessageToast, models) => {
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
            let oPayload = this.getView().getModel("dialogInput").getData();

            const oTableBinding = this.byId("Books").getBinding("items");
            console.log('oTableBinding---', oTableBinding)
            const sPath = oTableBinding?.getPath();

            this.getView().getModel().create(sPath, oPayload,
                {
                    success: (oData, oResponse) => {
                        console.log(oData, oResponse)
                        this.oCreateDialog?.close();
                        MessageToast.show("Book Added")
                    },
                    error: (oError) => {
                        console.log(oError);
                        this.oCreateDialog?.close();
                    }
                })
        },
        onAfterCloseDialog() {
            this.getOwnerComponent().setModel(models.createDialogInputModel(), "dialogInput");
        },
        onDeletePress(oEvent) {
            let oContext = oEvent.getSource().getBindingContext();

            let sPath = oContext.getPath()

            this.getView().getModel().remove(sPath, {
                success: (oData, oResponse) => {
                    MessageToast.show("Book Deleted")
                    console.log(oData, oResponse);
                },
                error: (oError) => {
                    console.log(oError);
                }
            })
        }
    });
});