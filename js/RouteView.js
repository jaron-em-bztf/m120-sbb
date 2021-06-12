class RouteView extends AbstractView
{
    constructor()
    {
        super(ModalTemplates.routeTemplate);

        let autoComplete = function(stations) {
            return function findMatches(query, callback) {
              let res, regex;
              res = [];
              regex = new RegExp(query, 'i');
              $.each(stations, function(i, str) {
                if (regex.test(str["name"])) {
                  res.push(str["name"]);
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
            source: autoComplete(TestDataSet.stations)
        });
    }

    validate()
    {
        let valid = true;
        if (this.template.$from.val().length == 0) {
            this.template.$from.addClass("errorHighlight");
            valid = false;
        } else
            this.template.$from.removeClass("errorHighlight");

        if (this.template.$to.val().length == 0) {
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
}