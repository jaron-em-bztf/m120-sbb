class ConnectionView extends AbstractView
{
    constructor(from, to, date)
    {
        super(ModalTemplates.connectionTemplate);
        this.from = from;
        this.to = to;
        this.date = date;
        this.lastTime = "";
        this.timeoutVal = this.lastTime; // wait before refetching
        this.lastTimeoutId = -1;
        this.timePicker = this.template.$timePicker.timepicker({
            minuteStep: 1,
            template: 'modal',
            appendWidgetTo: 'body',
            showMeridian: false,
            defaultTime: false
        });
        this.template.$timePicker.val(this.formatTimestamp(Date.now(), false));
        this.template.$timePicker.change(() => {
            this.timeoutVal = this.template.$timePicker.val();
            clearTimeout(this.lastTimeoutId);
            this.lastTimeoutId = setTimeout(() => { // wait before refetching
                let t = this.template.$timePicker.val()
                // arrow keys also trigger change event
                if (this.lastTime == t) 
                    return;
                this.lastTime = t;
                this.reFetch();
            }, 500);
            
        });
    }

    onView()
    {
        this.reFetch();
    }

    formatData(data)
    {
        let ret = {connections: []};
        data.connections.forEach(con => {
            if (ret["connections"].length > 4) // Max 5 connections
                return;
            let departure = this.formatTimestamp(con["from"]["departureTimestamp"]);
            let arrival = this.formatTimestamp(con["to"]["arrivalTimestamp"]);
            let diff = this.formatTimestamp(
                (parseInt(con["to"]["arrivalTimestamp"]) -
                parseInt(con["from"]["departureTimestamp"])) * 1000
                );

            ret["connections"].push({departure: departure, arrival: arrival, diff: diff});
        });

        return ret;
    }

    formatTimestamp(t, withSeconds = true)
    {
        let date = new Date(t *= 1000);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        if (withSeconds) {
            let seconds = "0" + date.getSeconds();        
            return (hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2));
        }

        return (hours + ':' + minutes.substr(-2));
    }

    renderTable(data)
    {
        this.template.$connectionTable.fadeOut(250);
        let render = Mustache.render(this.template.$connectionsTemplate.html(), data);
        this.template.$connectionTable.html(render);
        this.template.$connectionTable.fadeIn(250);
    }

    reFetch()
    {
        $.get("http://transport.opendata.ch/v1/connections", {
                    from: this.from(), 
                    to: this.to(), 
                    date: this.date(), 
                    time: this.template.$timePicker.val()
                    }, 
                    (data, status) => {
            if (status != "success")
                return;
            this.renderTable(this.formatData(data));
        });
    }
}