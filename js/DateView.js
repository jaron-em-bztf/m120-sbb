class DateView extends AbstractView
{
    constructor(priceGetter)
    {
        super(ModalTemplates.dateTemplate);
        this.initDatePicker();
        this.initTravelClass();
        this.priceGetter = priceGetter;
        this.firstClassPrice = 0;
    }

    onView()
    {
        this.template.$datePicker.focus();
        this.updatePrice();
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
        this.updatePrice = () => { 
            this.firstClassPrice = (Math.ceil(this.priceGetter()*0.2*20)/20).toFixed(2);
            this.template.$firstClassPrice.html(this.firstClassPrice); // first class price: price * 0.2
        }

        let onChange = () => {
            if($(this.template.$travelClass).is(":checked")) {
                this.template.$classPriceCol.removeClass("d-none");
                this.updatePrice();
            } else {
                this.template.$classPriceCol.addClass("d-none");
            }
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