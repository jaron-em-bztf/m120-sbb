class DateView extends AbstractView
{
    constructor()
    {
        super(ModalTemplates.dateTemplate);
        this.initDatePicker();
        this.initTravelClass();
    }

    onView()
    {
        this.template.$datePicker.focus();
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
        let onChange = () => {
            if($(this.template.$travelClass).is(":checked"))
                this.template.$firstClassPrice.removeClass("d-none");
            else
                this.template.$firstClassPrice.addClass("d-none");
        };

        this.template.$travelClass.change(() => onChange()); 

        // toggle travel class with arrows
        this.template.$travelClass.on('keyup', e => {
            if (e.keyCode === 39 || e.keyCode === 37) { // Right arrow
                ModalTemplates.dateTemplate.$travelClass.prop("checked", e.keyCode === 39);
                onChange();
            }
        });
    }
}