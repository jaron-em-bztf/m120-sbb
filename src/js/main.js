let modal;

$(document).ready(() => {
    this.modal = new ModalController();
    CoverPage.$modalBtn.click();
});

CoverPage.$modalBtn.click(() => openModal());

function openModal()
{
    this.modal.show();
}

function setConnection($target, departure, arrival)
{
    this.modal.connectionCallback($target, departure, arrival);
}