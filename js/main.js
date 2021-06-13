let modal;

$(document).ready(() => {
    this.modal = new ModalController();
});

CoverPage.$modalBtn.click(() => openModal());

function openModal()
{
    this.modal.show();
}