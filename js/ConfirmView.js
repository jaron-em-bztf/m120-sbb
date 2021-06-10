class ConfirmView
{
    constructor(routeView, dateView, travellerView, editCallback)
    {
        this.routeView = routeView;
        this.dateView = dateView;
        this.travellerView = travellerView;
        this.editCallback = editCallback
        this.id = ModalTemplates.confirmTemplate.id;
        this.template = ModalTemplates.confirmTemplate;
    }

    switch(switchTemplate)
    {
        this.clearData();
        this.updateData();
        switchTemplate(ModalTemplates.confirmTemplate);
    }

    updateData()
    {
        this.insertList(ModalTemplates.routeTemplate.id, ModalTemplates.routeTemplate.title, this.routeView.values());
        this.insertList(ModalTemplates.dateTemplate.id, ModalTemplates.dateTemplate.title, this.dateView.values());
        this.insertList(ModalTemplates.travellerTemplate.id, ModalTemplates.travellerTemplate.title, this.travellerView.values());
    }

    clearData()
    {
        ModalTemplates.confirmTemplate.$routeSummary.html("");
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
        ModalTemplates.confirmTemplate.$routeSummary.append(html);
        $("#" + editId).click(() => this.editCallback(id));
    }
}