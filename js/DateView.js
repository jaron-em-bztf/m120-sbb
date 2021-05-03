class DateView
{
    constructor()
    {
        this.initDatePicker();
        this.initTravelClass();
    }
    
    switch(switchTemplate)
    {
        switchTemplate(ModalTemplates.dateTemplate);
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