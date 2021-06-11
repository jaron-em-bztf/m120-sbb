class DateView extends AbstractView
{
    constructor()
    {
        super(ModalTemplates.dateTemplate);
        this.initDatePicker();
        this.initTravelClass();
    }

    validate()
    {
        let valid = true;
        if(this.template.$datePicker.val().length == 0) { // datePicker fills invalid values automatically
            this.template.$datePicker.addClass("errorHighlight");
            valid = false;
        } else
            this.template.$datePicker.removeClass("errorHighlight");

        return valid;
    }

    values()
    {
        let wayType = $("input[type='radio'][name='wayType']:checked").val();
        let travelClass = this.template.$travelClass.is(':checked') ? "1." : "2.";
        return {Reisedatum : this.template.$datePicker.val(), Art: wayType, Klasse: travelClass};
    }

    initDatePicker()
    {
        let options = {
            format: 'dd/mm/yyyy',
            todayHighlight: true,
            autoclose: true,
        }
        this.template.$datePicker.datepicker(options);
    }

    initTravelClass()
    {
        this.template.$travelClass.change((e) => {
            let isChecked = $(e.target).is(":checked")
            if(isChecked)
                this.template.$firstClassPrice.removeClass("d-none");
            else
                this.template.$firstClassPrice.addClass("d-none");
        }); 
    }
}