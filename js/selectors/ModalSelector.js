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
    }
}