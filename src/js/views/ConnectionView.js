class ConnectionView extends AbstractView
{
    constructor(from, to, date)
    {
        super(ModalTemplates.connectionTemplate);
        this.timeValues = {};
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
        this.template.$timePicker.val(this.formatTimestamp(Date.now()));
        this.template.$timePicker.change(() => {
            this.timeoutVal = this.template.$timePicker.val();
            clearTimeout(this.lastTimeoutId);
            this.lastTimeoutId = setTimeout(() => { // wait before refetching
                let t = this.template.$timePicker.val();
                // arrow keys also trigger change event
                if (this.lastTime == t) 
                    return;
                $("tr").removeClass("clicked");
                this.timeValues = {};
                this.lastTime = t;
                this.reFetch();
            }, 500);
            
        });
    }

    onView()
    {
        this.reFetch();
    }

    values()
    {
        return this.timeValues;
    }

    validate()
    {
        if (jQuery.isEmptyObject(this.timeValues)) {
            this.template.$connectionTable.addClass("errorHighlight");
            return false;
        }

        return true;
    }

    formatData(data)
    {
        let ret = {connections: []};
        data.connections.forEach(con => {
            if (ret["connections"].length > 7) // Max 8 connections
                return;
            let departure = parseInt(con["from"]["departureTimestamp"]) * 1000;
            let arrival = parseInt(con["to"]["arrivalTimestamp"]) * 1000;

            ret["connections"].push({
                departure: this.formatTimestamp(departure), 
                arrival: this.formatTimestamp(arrival), 
                diff: this.timeDiff(departure, arrival)
            });
        });

        return ret;
    }

    formatTimestamp(t)
    {
        let date = new Date(t);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        return (hours + ':' + minutes.substr(-2));
    }

    timeDiff(tStart, tEnd)
    {
        let secs = (tEnd - tStart) / 1000;
        let minutes = secs / 60;
        let hours = Math.floor(minutes / 60);
        minutes %= 60;
        minutes = "0" + minutes;
        return (hours + ':' + minutes.substr(-2));
    }

    renderTable(data)
    {
        this.template.$connectionTable.fadeOut(50);
        let render = Mustache.render(this.template.$connectionsTemplate.html(), data);
        this.template.$connectionTable.html(render);
        this.template.$connectionTable.fadeIn(50);
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