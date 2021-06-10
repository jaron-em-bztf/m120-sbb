class TravellerView extends AbstractView
{
    constructor()
    {
        super(ModalTemplates.travellerTemplate);
        this.initDiscounts();
    }

    values()
    {
        let t = this.template;
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
        let $noDiscount = this.template.$noDiscount;
        $noDiscount.change((e) => { 
            if(!$(e.target).is(":checked"))
                return;
            this.template.$childDiscount.prop("checked", false);
            this.template.$halbTax.prop("checked", false);
            this.template.$juniorDiscount.prop("checked", false);
        });
        this.template.$childDiscount.change((e) => {
            if($(e.target).is(":checked"))
                $noDiscount.prop("checked", false);
        });

        this.template.$halbTax.change((e) => {
            if($(e.target).is(":checked"))
                $noDiscount.prop("checked", false);
        });

        this.template.$juniorDiscount.change((e) => {
            if($(e.target).is(":checked"))
                $noDiscount.prop("checked", false);
        });
        this.template.$noDiscount.prop('checked', true);
    }
}