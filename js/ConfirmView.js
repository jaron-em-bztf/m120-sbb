class ConfirmView
{
    constructor(routeView, dateView, travellerView)
    {
        this.routeView = routeView;
        this.dateView = dateView;
        this.travellerView = travellerView;
    }

    switch(switchTemplate)
    {
        this.clearData();
        this.updateData();
        switchTemplate(ModalTemplates.confirmTemplate);
    }

    updateData()
    {
        this.insertList(ModalTemplates.routeTemplate.title, this.routeView.values());
        this.insertList(ModalTemplates.dateTemplate.title, this.dateView.values());
        this.insertList(ModalTemplates.travellerTemplate.title, this.travellerView.values());
    }

    clearData()
    {
        ModalTemplates.confirmTemplate.$routeSummary.html("");
    }

    insertList(title, list)
    {  
        let html = "<div class='modal-header'><h6 class='modal-title'>" + title + 
            "</h6><img class='clickable' id='" + title + "-edit' src='img/edit.png' width='20' height='20'></div><ul>";
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
    }
}