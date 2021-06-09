let modal;

$(document).ready(() => {
    //Testing
    this.modal = new ModalController();
    CoverPage.$modalBtn.click();
});

CoverPage.$modalBtn.click(() => openModal());

function openModal()
{
    this.modal.show();
}