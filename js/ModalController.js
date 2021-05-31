class ModalController
{
    constructor()
    {
        this.templates = [ModalTemplates.routeTemplate, ModalTemplates.dateTemplate, 
            ModalTemplates.travellerTemplate, ModalTemplates.confirmTemplate];
        
        let route = new RouteView();
        let date = new DateView();
        let traveller = new TravellerView();
        let confirm = new ConfirmView(route, date, traveller);
        this.views = [route, date, traveller, confirm];
        this.currentView = -1; // -1
        Modal.bsMain.show();
        this.nextView();
        Modal.$nextBtn.click(() => this.nextView());
    }

    nextView()
    {
        if (this.currentView + 1 >= this.views.length)
          return;
        this.views[++this.currentView].switch(t => this.switchTemplate(t))// anonymous function to keep context
    }

    switchTemplate(template)
    {
        this.templates.forEach(t => $(t.$body).addClass("d-none"));
        template.$body.removeClass("d-none");
        Modal.$title.html(template.title);
    }
}