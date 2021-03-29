class RouteView
{
    constructor()
    {
        Modal.$title.html("Strecke");
        Modal.$body.html(ModalTemplates.routeTemplate.$body.html());
        ModalTemplates.routeTemplate.$from.change(() => console.log("changed"));
    }
}