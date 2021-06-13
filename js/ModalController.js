class ModalController
{
    constructor()
    {
        let route = new RouteView();
        let date = new DateView(() => route.price); // always update
        let traveller = new TravellerView();
        let confirm = new ConfirmView(route, date, traveller, id => this.editCallback(id)); // keep context
        this.views = [route, date, traveller, confirm];
        this.currentView = -1;
        this.editInProgress = false;

        Modal.$prevBtn.addClass("d-none");
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
        this.nextView(true);
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
        if (this.currentView + 1 >= this.views.length) {
            Modal.bsMain.hide();
            ConfirmModal.bsMain.show();
            return;
        }
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
        Modal.$title.html(view.title);
        view.template.$body.removeClass("d-none");
        view.onView();
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