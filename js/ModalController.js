class ModalController
{
    constructor()
    {
        this.templates = [ModalTemplates.routeTemplate, ModalTemplates.dateTemplate];
        this.views = [new RouteView(this.nextView), new DateView(this.nextView)];
        this.currentView = -1;
        Modal.bsMain.show();
        this.nextView();
        Modal.$nextBtn.click(() => this.nextView());
    }

    nextView()
    {
        this.views[++this.currentView].switch(t => this.switchTemplate(t))// anonymous function to keep context
    }

    switchTemplate(template)
    {
        this.templates.forEach(t => $(t.$body).addClass("d-none"));
        template.$body.removeClass("d-none");
        Modal.$title.html(template.title);
    }
}