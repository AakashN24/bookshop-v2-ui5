sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "bookshopcatalogv2/model/models",
    "sap/ui/model/Context",
    "sap/m/MessageBox"
], (Controller, MessageToast, models, Context, MessageBox) => {
    "use strict";

    return Controller.extend("bookshopcatalogv2.controller.View1", {
        onInit() {
            this.oResourceModel = this.getOwnerComponent().getModel("i18n").getResourceBundle();
        },
        async onCreate() {
            this.oCreateDialog ??= await this.loadFragment({
                name: "bookshopcatalogv2.view.create"
            })
            this.oCreateDialog.open();
        },
        async onEditPress(oEvent) {
            const oModel = this.getView().getModel();
            const sPath = oEvent.getSource().getBindingContext().getPath();
            this.oEditDialog ??= await this.loadFragment({
                name: "bookshopcatalogv2.view.fragments.EditBook"
            })
            this.oEditDialog.setBindingContext(new Context(oModel, sPath))
            this.oEditDialog.open();
        },
        //for create dialog
        onDialogCancel() {
            this.oCreateDialog?.close();
        },
        //for create dialog
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
                        MessageToast.show(this.oResourceModel.getText("bookCreatedMsg"))
                    },
                    error: (oError) => {
                        console.log(oError);
                        this.oCreateDialog?.close();
                    }
                })
        },
        //for create dialog
        onAfterCloseDialog() {
            this.getOwnerComponent().setModel(models.createDialogInputModel(), "dialogInput");
        },
        //for deleting the records
        onDeletePress(oEvent) {
            let oContext = oEvent.getSource().getBindingContext();

            let sPath = oContext.getPath()

            this.getView().getModel().remove(sPath, {
                success: (oData, oResponse) => {
                    MessageBox.show(this.oResourceModel.getText("bookDeletedMsg"))
                    console.log(oData, oResponse);
                },
                error: (oError) => {
                    console.log(oError);
                }
            })
        },
        //for edit dialog
        onPressCancelBookDialog() {
            this.oEditDialog.close();
        },
        onPressUpdateBookDialog() {
            const oModel = this.getView().getModel();
            const sPath = this.oEditDialog.getBindingContext().getPath();
            const oPayload = {
                title: this.byId("edit_input1").getValue(),
                stock: this.byId("edit_stockInput").getValue()
            }
            oModel.update(sPath, oPayload, {
                success: (oData, oResponse) => {
                    MessageBox.show(this.oResourceModel.getText("bookUpdatedMsg"));
                    this.oEditDialog.close();
                },
                error: (oError) => {
                    console.log('error---', oError)
                }
            }).bind(this);
        }
    });
});