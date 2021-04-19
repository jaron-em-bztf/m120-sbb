class RouteView
{
    constructor(switchTemplate)
    {
        Modal.$title.html("Strecke");
        switchTemplate(ModalTemplates.routeTemplate.$body);
    }
}