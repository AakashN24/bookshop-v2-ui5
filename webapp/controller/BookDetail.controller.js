sap.ui.define([
    "./BaseController",
    "sap/ui/core/routing/History"
], (BaseController, History) => {
    return BaseController.extend("bookshopcatalogv2.controller.BookDetail", {
        onInit() {
            this.getRouter().getRoute("BookDetail").attachPatternMatched(this._onRouteMatched, this)
        },
        _onRouteMatched(oEvent) {
            const Args = oEvent.getParameter("arguments");
            console.log(Args)

            const oModel = this.getView().getModel();
            const sPath = oModel.createKey("/Books", { ID: Args.BookID })
            this.getView().bindElement({
                path: sPath,
                parameters: {
                    expand: 'author'
                },
                events: {
                    change: this._onBindingChanged.bind(this),
                    dataRequested: () => this.getView().setBusy(true),
                    dataReceived: () => this.getView().setBusy(false)
                }
            })
        },
        _onBindingChanged() {
            if (!this.getView().getBindingContext()) {
                this.getRouter().getTargets().display('notFound');
            }
        },
        onEditBtnPress() {
            // this.getRouter().navTo("BookDetailEdit", {}, true /*no History*/);
            //using target directly so the hash won't change and history is not updated
            this.getRouter().getTargets().display('TargetBookDetailEditPage');
        }
    });
});