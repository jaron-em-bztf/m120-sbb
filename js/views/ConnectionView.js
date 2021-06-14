class ConnectionView extends AbstractView
{
    constructor(from, to, date, time)
    {
        super(ModalTemplates.connectionTemplate);
        this.from = from;
        this.to = to;
        this.date = date;
        this.time = time;
    }

    onView()
    {
        $.get("http://transport.opendata.ch/v1/connections", 
                    {from: "Weinfelden", to: "Frauenfeld", 
                    date: "2021-06-14", time: "13:10"}, (data, status) => {
            if (status != "success")
                return;
            console.log(data);
            this.renderTable(this.formatData(data));
        });
    }

    formatData(data)
    {
        let ret = {connections: []};
        data.connections.forEach(con => {
            if (ret["connections"].length > 4) // Max 5 connections
                return;
            let departure = this.formatTimestamp(con["from"]["departureTimestamp"]);
            let arrival = this.formatTimestamp(con["to"]["arrivalTimestamp"]);

            ret["connections"].push({departure: departure, arrival: arrival});
        });

        return ret;
    }

    formatTimestamp(t)
    {
        let date = new Date(t *= 1000);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let seconds = "0" + date.getSeconds();        
        return (hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2));
    }

    renderTable(data)
    {
        console.log(data);
        let render = Mustache.render(this.template.$connectionsTemplate.html(), data);
        this.template.$connectionTable.html(render);
    }
}