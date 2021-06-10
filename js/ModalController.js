class ModalController
{
    constructor()
    {
        this.templates = [ModalTemplates.routeTemplate, ModalTemplates.dateTemplate, 
            ModalTemplates.travellerTemplate, ModalTemplates.confirmTemplate];
        
        let route = new RouteView();
        let date = new DateView();
        let traveller = new TravellerView();
        let confirm = new ConfirmView(route, date, traveller, id => this.editCallback(id)); // keep context
        this.views = [route, date, traveller, confirm];
        this.currentView = -1;
        this.editInProgress = false;
        this.nextView();
        Modal.$nextBtn.click(() => {
            if (this.editInProgress) {
                this.editInProgress = false;
                this.views[this.views.length - 1].switch(t => this.switchTemplate(t)); // to last view
            } else
                this.nextView()
        });
    }
    
    show()
    {
        Modal.bsMain.show();
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

    editCallback(id)
    {
        this.views.forEach((view) => {
            if (view.id != id)
                return;
        
            Modal.$nextBtn.html("Fertig");
            this.editInProgress = true;
            view.switch(t => this.switchTemplate(t));
        });
    }
}