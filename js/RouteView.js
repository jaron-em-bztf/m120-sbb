class RouteView
{
    constructor()
    {
        this.setupPropHandling();
    }
    
    switch(switchTemplate)
    {
        switchTemplate(ModalTemplates.routeTemplate);
    }

    setupPropHandling()
    {
        ModalTemplates.routeTemplate.$from.change(() =>
            ModalProps.RouteProps.from = ModalTemplates.routeTemplate.$from.val());
        ModalTemplates.routeTemplate.$to.change(() =>
            ModalProps.RouteProps.to = ModalTemplates.routeTemplate.$to.val());
    }
}