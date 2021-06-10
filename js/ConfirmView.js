class ConfirmView extends AbstractView
{
    constructor(routeView, dateView, travellerView, editCallback)
    {
        super(ModalTemplates.confirmTemplate);
        this.routeView = routeView;
        this.dateView = dateView;
        this.travellerView = travellerView;
        this.editCallback = editCallback
    }

    onView()
    {
        this.clearData();
        this.updateData();
    }

    updateData()
    {
        this.insertList(this.routeView.id, this.routeView.title, this.routeView.values());
        this.insertList(this.dateView.id, this.dateView.title, this.dateView.values());
        this.insertList(this.travellerView.id, this.travellerView.title, this.travellerView.values());
    }

    clearData()
    {
        this.template.$routeSummary.html("");
    }

    insertList(id, title, list)
    {  
        let editId = id + "-edit";
        let html = "<div class='modal-header'><h6 class='modal-title'>" + title + 
            "</h6><img class='clickable' id='" + editId + "' src='img/edit.png' width='20' height='20'></div><ul>";
        for (const key of Object.keys(list)) {
            html += "<li>" + key + ": ";
            if (list[key] != "")
                html += list[key];
            else
                html += "-";
            html += "</li>";
        }
        html += "</ul>";
        this.template.$routeSummary.append(html);
        $("#" + editId).click(() => this.editCallback(id));
    }
}