let Modal =
{
    bsMain: new bootstrap.Modal(document.getElementById('mainModal'))
    , $title: $("#staticBackdropLabel")
    , $body: $("#mainModal-body")
    , $nextBtn: $("#next")
    , $prevBtn: $("#previous")
}

let ConfirmModal =
{
    bsMain: new bootstrap.Modal(document.getElementById('confirmModal'))
    , $modal: $("#confirmModal")
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
        , $priceLabel: $("#priceCHF")
        , $price: $("#priceNumber")
    },

    dateTemplate:
    {
        id: 2
        , title: "Datum & Billetart"
        , $body: $("#dateTemplate")

        , $datePicker: $("#date")
        , $travelClass: $("#travelClass")
        , $classPriceCol: $("#classPriceCol")
        , $firstClassPrice: $("#firstClassPrice")
        , $oneWayType: $("#oneWayType")
        , $twoWayType: $("#twoWayType")
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
        , $finalPrice : $("#finalPrice")
    },

    connectionTemplate:
    {
        id: 5
        , title: "Verbindung"

        , $body: $("#connectionTemplate")
        , $connectionsTemplate: $("#connectionsRenderTemplate")
        , $connectionTable: $("#connectionBody")
        , $timePicker: $("#timepicker")
    }
}