class DateView
{
    constructor()
    {
        this.initDatePicker();
        this.initTravelClass();
        this.id = ModalTemplates.dateTemplate.id;
        this.template = ModalTemplates.dateTemplate;
    }
    
    switch(switchTemplate)
    {
        switchTemplate(ModalTemplates.dateTemplate);
    }

    values()
    {
        let wayType = $("input[type='radio'][name='wayType']:checked").val();
        let travelClass = ModalTemplates.dateTemplate.$travelClass.is(':checked') ? "1." : "2.";
        return {Reisedatum : ModalTemplates.dateTemplate.$datePicker.val(), Art: wayType, Klasse: travelClass};
    }

    initDatePicker()
    {
        let options = {
            format: 'dd/mm/yyyy',
            todayHighlight: true,
            autoclose: true,
        }
        ModalTemplates.dateTemplate.$datePicker.datepicker(options);
    }

    initTravelClass()
    {
        ModalTemplates.dateTemplate.$travelClass.change((e) => {
            let isChecked = $(e.target).is(":checked")
            if(isChecked)
                ModalTemplates.dateTemplate.$firstClassPrice.removeClass("d-none");
            else
                ModalTemplates.dateTemplate.$firstClassPrice.addClass("d-none");
        }); 
    }
}