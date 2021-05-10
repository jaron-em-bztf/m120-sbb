let Modal =
{
    bsMain: new bootstrap.Modal(document.getElementById('mainModal'))
    , $title: $("#staticBackdropLabel")
    , $body: $("#mainModal-body")
    , $nextBtn: $("#next")
}

let ModalTemplates =
{
    routeTemplate:
    {
        title: "Strecke"
        , $body: $("#routeTemplate")

        , $from: $("#route-from")
        , $to: $("#route-to")
    },

    dateTemplate:
    {
        title: "Datum & Billetart"
        , $body: $("#dateTemplate")

        , $datePicker: $("#date")
        , $travelClass: $("#travelClass")
        , $firstClassPrice: $("#firstClassPrice")
    },

    travellerTemplate:
    {
        title: "Reisende/r"
        , $body : $("#travellerTemplate")
        , $firstName : $("#firstName")
        , $lastName : $("#lastName")
        , $birthDay : $("#birthDay")
        , $birthMonth : $("#birthMonth")
        , $birthYear : $("#birthYear")
        , $noDiscount : $("#noDiscount")
        , $halbTax : $("#halbtaxDiscount")
        , $juniorDiscount : $("#juniorDiscount")
        , $childDiscount : $("#childDiscount")
    }
}