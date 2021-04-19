class ModalController
{
    constructor()
    {
        this.templates = [ModalTemplates.routeTemplate];
        new RouteView(t => this.switchTemplate(t));
        Modal.bsMain.show();
    }

    switchTemplate(template)
    {
        this.templates.every((t) => $(t).addClass("d-none"));
        template.removeClass("d-none");
    }
}