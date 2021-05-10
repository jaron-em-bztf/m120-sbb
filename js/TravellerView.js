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