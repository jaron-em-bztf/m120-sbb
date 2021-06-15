class TravellerView extends AbstractView
{
    constructor()
    {
        super(ModalTemplates.travellerTemplate);
        this.initDiscounts();
        this.birthDate;
        this.template.$birthDay.change(() => this.updateBirthDate());
        this.template.$birthMonth.change(() => this.updateBirthDate());
        this.template.$birthYear.change(() => this.updateBirthDate());
        this.updateBirthDate();
    }

    onView()
    {
        this.template.$firstName.focus();
    }

    validate()
    {
        let valid = true;

        if (this.template.$firstName.val().length == 0) {
            this.template.$firstName.addClass("errorHighlight");
            valid = false
        } else
            this.template.$firstName.removeClass("errorHighlight");

        if (this.template.$lastName.val().length == 0) {
            this.template.$lastName.addClass("errorHighlight");
            valid = false
        } else
            this.template.$lastName.removeClass("errorHighlight");

        if (!this.validateBirthDate())
            valid = false

        return valid;
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

    discountMultiplication()
    {
        let t = this.template;
        if (t.$halbTax.is(":checked"))
            return 0.5;
        
        if (t.$juniorDiscount.is(":checked") && t.$childDiscount.is(":checked"))
            return 0.2;

        if (t.$juniorDiscount.is(":checked") || t.$childDiscount.is(":checked"))
            return 0.3;

        return 1;
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

    updateBirthDate()
    {
        this.birthDate = new Date(this.template.$birthYear.val(), this.template.$birthMonth.val() - 1, this.template.$birthDay.val());

        if (isNaN(this.birthDate.getTime()))
            return;

        if (Date.now() - this.birthDate.getTime() < 504911231999) { // less than age 16
            this.template.$halbTax.prop("disabled", true);
            this.template.$halbTax.prop("checked", false);
            this.template.$childDiscount.prop("disabled", false);
            this.template.$juniorDiscount.prop("disabled", false);
        } else {
            this.template.$halbTax.prop("disabled", false);
            this.template.$childDiscount.prop("disabled", true);
            this.template.$juniorDiscount.prop("disabled", true);
            this.template.$childDiscount.prop("checked", false);
            this.template.$juniorDiscount.prop("checked", false);
        }
    }

    validateBirthDate()
    {
        let valid = true;
        let currentDate = new Date();
        const year = parseInt(this.template.$birthYear.val());
        const month = parseInt(this.template.$birthMonth.val());
        const day = parseInt(this.template.$birthDay.val());

        if (isNaN(year) || year < 1920 || year > currentDate.getFullYear) {
            this.template.$birthYear.addClass("errorHighlight");
            valid = false;
        } else 
            this.template.$birthYear.removeClass("errorHighlight");

        if (isNaN(month) || month < 1 || month > 12) {
            this.template.$birthMonth.addClass("errorHighlight");
            valid = false;
        } else 
            this.template.$birthMonth.removeClass("errorHighlight");

        if (isNaN(day) || day < 1 || day > 31) {
            this.template.$birthDay.addClass("errorHighlight");
            valid = false;
        } else
            this.template.$birthDay.removeClass("errorHighlight");

        if (!valid)
            return false;

        const birthDate = new Date(year, month - 1, day); // months: 0-11
        if (isNaN(birthDate)) {
            this.template.$birthYear.addClass("errorHighlight");
            this.template.$birthMonth.addClass("errorHighlight");
            this.template.$birthDay.addClass("errorHighlight");
            return false;
        } else {
            this.template.$birthYear.removeClass("errorHighlight");
            this.template.$birthMonth.removeClass("errorHighlight");
            this.template.$birthDay.removeClass("errorHighlight");
        }

        return true;
    }
}