class TravellerView
{
    constructor()
    {
        this.initDiscounts();
    }
    
    switch(switchTemplate)
    {
        switchTemplate(ModalTemplates.travellerTemplate);
    }

    values()
    {
        let t = ModalTemplates.travellerTemplate;
        let discounts = (t.$halbTax.is(":checked")) ? t.$halbTax.val() + ", ": "";
        discounts += (t.$juniorDiscount.is(":checked")) ? t.$juniorDiscount.val() + ", ": "";
        discounts += (t.$childDiscount.is(":checked")) ? t.$childDiscount.val() + ", ": "";
        // remove trailing comma or format empty value
        discounts = (discounts.length == 0) ? discounts = "-" : discounts.substring(0, discounts.length - 2);

        return {
            Vorname : t.$firstName.val(),
            Nachname : t.$lastName.val(),
            Geburtsdatum : t.$birthDay.val() + "." + 
                t.$birthMonth.val() + "." + t.$birthYear.val(),
            Ermässigungen : discounts
        }
    }

    initDiscounts()
    {
        let $noDiscount = ModalTemplates.travellerTemplate.$noDiscount;
        $noDiscount.change((e) => { 
            if(!$(e.target).is(":checked"))
                return;
            ModalTemplates.travellerTemplate.$childDiscount.prop("checked", false);
            ModalTemplates.travellerTemplate.$halbTax.prop("checked", false);
            ModalTemplates.travellerTemplate.$juniorDiscount.prop("checked", false);
        });
        ModalTemplates.travellerTemplate.$childDiscount.change((e) => {
            if($(e.target).is(":checked"))
                $noDiscount.prop("checked", false);
        });

        ModalTemplates.travellerTemplate.$halbTax.change((e) => {
            if($(e.target).is(":checked"))
                $noDiscount.prop("checked", false);
        });

        ModalTemplates.travellerTemplate.$juniorDiscount.change((e) => {
            if($(e.target).is(":checked"))
                $noDiscount.prop("checked", false);
        });
        ModalTemplates.travellerTemplate.$noDiscount.prop('checked', true);
    }
}