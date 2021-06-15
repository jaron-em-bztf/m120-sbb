class ConfirmView extends AbstractView
{
    constructor(routeView, dateView, connectionView, travellerView, editCallback)
    {
        super(ModalTemplates.confirmTemplate);
        this.routeView = routeView;
        this.dateView = dateView;
        this.connectionView = connectionView;
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
        this.insertList(this.connectionView.id, this.connectionView.title, this.connectionView.values());
        this.insertList(this.travellerView.id, this.travellerView.title, this.travellerView.values());
        this.updatePrice();
    }

    updatePrice()
    {
        let price = parseFloat(this.routeView.price);
        price *= parseFloat(this.dateView.typeMultiplication()); // one or both ways
        price += parseFloat(this.dateView.classPriceAddition());
        price *= parseFloat(this.travellerView.discountMultiplication());
        price = (Math.ceil(price*20)/20).toFixed(2); // round to .05
        this.template.$finalPrice.html(price);
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