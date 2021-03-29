$(document).ready(() => {
    //Testing
    CoverPage.$modalBtn.click();
});

CoverPage.$modalBtn.click(() => openModal());

function openModal()
{
    modal = new ModalController();
}