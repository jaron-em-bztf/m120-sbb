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

    values()
    {
        return {Von : ModalTemplates.routeTemplate.$from.val(), Nach : ModalTemplates.routeTemplate.$to.val()};
    }

    setupPropHandling()
    {
        ModalTemplates.routeTemplate.$from.change(() =>
            ModalProps.RouteProps.from = ModalTemplates.routeTemplate.$from.val());
        ModalTemplates.routeTemplate.$to.change(() =>
            ModalProps.RouteProps.to = ModalTemplates.routeTemplate.$to.val());
    }
}