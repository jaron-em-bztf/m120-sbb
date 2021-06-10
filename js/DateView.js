class DateView extends AbstractView
{
    constructor()
    {
        super(ModalTemplates.dateTemplate);
        this.initDatePicker();
        this.initTravelClass();
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