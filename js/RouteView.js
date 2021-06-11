class RouteView extends AbstractView
{
    constructor()
    {
        super(ModalTemplates.routeTemplate);
    }

    validate()
    {
        let valid = true;
        if (this.template.$from.val().length == 0) {
            this.template.$from.addClass("errorHighlight");
            valid = false;
        } else
            this.template.$from.removeClass("errorHighlight");

        if (this.template.$to.val().length == 0) {
            this.template.$to.addClass("errorHighlight");
            valid = false;
        } else
            this.template.$to.removeClass("errorHighlight");

        return valid;
    }

    values()
    {
        return {Von : this.template.$from.val(), Nach : this.template.$to.val()};
    }
}