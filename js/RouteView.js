class RouteView extends AbstractView
{
    constructor()
    {
        super(ModalTemplates.routeTemplate);
        this.initAutoComplete();
        this.initConvenience();
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
}