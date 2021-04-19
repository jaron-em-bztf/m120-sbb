let Modal =
{
    bsMain: new bootstrap.Modal(document.getElementById('mainModal'))
    , $title: $("#staticBackdropLabel")
    , $body: $("#mainModal-body")
}

let ModalTemplates =
{
    routeTemplate:
    {
        $body: $("#routeTemplate")
        , $from: $("#route-from")
        , $to: $("#route-to")
    },

    dateTemplate:
    {
        $body: $("#dateTemplate")
        , $datePicker: $("#date")
    }
}