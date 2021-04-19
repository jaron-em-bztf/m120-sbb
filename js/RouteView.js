class RouteView
{
    constructor(switchTemplate)
    {
        Modal.$title.html("Strecke");
        this.setupPropHandling();
        switchTemplate(ModalTemplates.routeTemplate.$body);
    }

    setupPropHandling()
    {
        ModalTemplates.routeTemplate.$from.change(() =>
            ModalProps.RouteProps.from = ModalTemplates.routeTemplate.$from.val());
        ModalTemplates.routeTemplate.$to.change(() =>
            ModalProps.RouteProps.to = ModalTemplates.routeTemplate.$to.val());
    }
}