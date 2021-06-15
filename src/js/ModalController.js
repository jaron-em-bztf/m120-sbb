class ModalController
{
    constructor()
    {
        this.route = new RouteView();
        this.date = new DateView(() => this.route.price); // always update
        this.traveller = new TravellerView();
        this.connection = new ConnectionView(() => this.route.getFrom(), () => this.route.getTo(), () => this.date.getDate());
        this.confirm = new ConfirmView(this.route, this.date, this.connection, this.traveller, id => this.editCallback(id)); // keep context
        this.views = [this.route, this.date, this.connection, this.traveller,this.confirm];
        this.currentView = -1;
        this.editInProgress = false;

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
        if (this.currentView == -1)
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
            ConfirmModal.$modal.on('hidden.bs.modal', function () {
                location.reload();
            });
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

    connectionCallback($t, departure, arrival)
    {
        this.connection.timeValues = {Abfahrt: departure, Ankunft: arrival}
        $("tr").removeClass("clicked");
        $($t).addClass("clicked");
    };
}