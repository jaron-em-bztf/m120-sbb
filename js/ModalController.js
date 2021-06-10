class ModalController
{
    constructor()
    {
        let route = new RouteView();
        let date = new DateView();
        let traveller = new TravellerView();
        let confirm = new ConfirmView(route, date, traveller, id => this.editCallback(id)); // keep context
        this.views = [route, date, traveller, confirm];
        this.currentView = -1;
        this.editInProgress = false;
        this.nextView();
        Modal.$nextBtn.click(() => {
            if (this.editInProgress)
                this.finishEdit();
            else
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
        this.switchToView(this.views[++this.currentView]);
    }

    finishEdit()
    {
        this.editInProgress = false;
        this.switchToView(this.views[this.views.length -1]); // back to the last view
    }

    switchToView(view)
    {
        this.views.forEach(v => v.template.$body.addClass("d-none"));
        view.onView();
        view.template.$body.removeClass("d-none");
        Modal.$title.html(view.title);
    }

    editCallback(id)
    {
        this.views.forEach((view) => {
            if (view.id != id)
                return;
        
            Modal.$nextBtn.html("Fertig");
            this.editInProgress = true;
            this.switchToView(view);
        });
    }
}