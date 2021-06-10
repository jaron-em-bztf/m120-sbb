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
        id: 1
        , title: "Strecke"
        , $body: $("#routeTemplate")

        , $from: $("#route-from")
        , $to: $("#route-to")
    },

    dateTemplate:
    {
        id: 2
        , title: "Datum & Billetart"
        , $body: $("#dateTemplate")

        , $datePicker: $("#date")
        , $travelClass: $("#travelClass")
        , $firstClassPrice: $("#firstClassPrice")
    },

    travellerTemplate:
    {
        id: 3
        , title: "Reisende/r"
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
    },

    confirmTemplate:
    {
        id: 4
        , title: "Bestätigung"
        , $body : $("#confirmTemplate")
        , $routeSummary : $("#routeSummary")
    }
}