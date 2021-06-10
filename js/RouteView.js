class RouteView extends AbstractView
{
    constructor()
    {
        super(ModalTemplates.routeTemplate);
    }

    values()
    {
        return {Von : this.template.$from.val(), Nach : this.template.$to.val()};
    }
}