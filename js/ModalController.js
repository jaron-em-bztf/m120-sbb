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

        Modal.$prevBtn.addClass("d-none");
        this.nextView(true);
        Modal.$nextBtn.click(() => {
            if (this.editInProgress)
                this.finishEdit();
            else
                this.nextView();
        });

        Modal.$prevBtn.click(() => this.previousView());
    }
    
    show()
    {
        Modal.bsMain.show();
    }
    
    updatePreviousBtnVisibility()
    {
        if (this.currentView > 0 && !this.editInProgress)
            Modal.$prevBtn.removeClass("d-none");
        else
            Modal.$prevBtn.addClass("d-none");
    }

    updateNextBtnText()
    {
        if (this.currentView == this.views.length -1)
            Modal.$nextBtn.html("Kauf abschliessen");
        else if (this.editInProgress)
            Modal.$nextBtn.html("Fertig");
        else
            Modal.$nextBtn.html("Weiter");

    }

    previousView()
    {
        if(this.currentView < 1)
            return;
        this.switchToView(this.views[this.currentView - 1], true);
    }

    nextView(force = false)
    {
        if (this.currentView + 1 >= this.views.length)
            return;
        this.switchToView(this.views[this.currentView + 1], force);
    }

    finishEdit()
    {
        this.editInProgress = false;
        this.switchToView(this.views[this.views.length -1]); // back to the last view
    }

    switchToView(view, force = false)
    {
        if (!force && this.views[this.currentView] && !this.views[this.currentView].validate())
            return;

        this.views.forEach(v => v.template.$body.addClass("d-none")); // hide all views

        this.currentView = this.views.indexOf(view);
        this.updatePreviousBtnVisibility();
        this.updateNextBtnText();
        view.onView();
        Modal.$title.html(view.title);
        view.template.$body.removeClass("d-none");
    }

    editCallback(id)
    {
        this.views.forEach((view) => {
            if (view.id != id)
                return;
        
            this.editInProgress = true;
            this.switchToView(view);
        });
    }
}