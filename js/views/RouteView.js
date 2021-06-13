class RouteView extends AbstractView
{
    constructor()
    {
        super(ModalTemplates.routeTemplate);

        this.price = 0;

        this.initAutoComplete();
        this.initConvenience();
        this.initPriceCalculation();
    }

    onView()
    {
      // delay because bootstrap animation removes focus upon opening
      setTimeout(() => ModalTemplates.routeTemplate.$from.focus(), 500); 
    }

    validate()
    {
        let valid = true;
        let from = this.template.$from.val();
        let to = this.template.$to.val();
        if (from.length == 0 || !TestDataSet.contains(from)) {
            this.template.$from.addClass("errorHighlight");
            valid = false;
        } else
            this.template.$from.removeClass("errorHighlight");

        if (to.length == 0 || !TestDataSet.contains(to) || to.toLowerCase() == from.toLowerCase()) {
            this.template.$to.addClass("errorHighlight");
            valid = false;
        } else
            this.template.$to.removeClass("errorHighlight");

        return valid;
    }

    values()
    {
        return {Von : this.template.$from.val(), Nach : this.template.$to.val()};
    }

    initConvenience()
    {
      this.template.$from.keyup(e => {
        if (e.keyCode === 13 || e.keyCode === 9) { // Enter or tab
            ModalTemplates.routeTemplate.$to.focus();
        }
      });

      this.template.$to.keyup(e => {
        if (e.keyCode === 13 || e.keyCode === 9) { // Enter or tab
            Modal.$nextBtn.focus();
        }
      });
    }

    initAutoComplete()
    {
      let autoComplete = function(stations) {
        return function findMatches(query, callback) {
          let res, regex;
          res = [];
          regex = new RegExp(query, 'i');
          $.each(stations, (i, station) => {
            if (regex.test(station)) {
              res.push(station);
            }
          });
      
          callback(res);
        };
      };
      
      $('.typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
      },
      {
        name: 'Stations',
        source: autoComplete(TestDataSet.stationNames())
      });    
    }

    initPriceCalculation()
    {
      let calc = () => {
        let fromCoords = TestDataSet.coords(this.template.$from.val());
        let toCoords = TestDataSet.coords(this.template.$to.val());
        if (fromCoords === undefined || toCoords === undefined) {
          this.template.$priceLabel.addClass("invisible");
          return;
        }
        
        let dist = Math.abs(fromCoords["long"] - toCoords["long"]) + Math.abs(fromCoords["lat"] - toCoords["lat"]);
        this.price = (Math.ceil(dist*18*20)/20).toFixed(2); // price = dist * 18
        this.template.$priceLabel.removeClass("invisible");
        this.template.$price.html(this.price);
      };

      this.template.$from.on("input", calc);
      this.template.$to.on("input", calc);
      this.template.$from.on("change", calc);
      this.template.$to.on("change", calc);
    }
}