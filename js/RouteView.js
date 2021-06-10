class RouteView
{
    constructor()
    {
        this.setupPropHandling();
        this.id = ModalTemplates.routeTemplate.id;
        this.template = ModalTemplates.routeTemplate;
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