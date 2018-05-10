import Modal from './templates/index.html';
//import purposes from './templates/purposes';
//import vendors from './templates/vendors';
import UIkit from 'uikit';

console.log(Modal)

function showConsentModalPromise () {
    return new Promise ((resolve, reject) => {
        resolve();
    });
};

UIkit.modal.dialog(Modal);

let state = {
    screen : 'index',
    purposeSelected : [],
    vendorsSelected : []
}

function onStateChange (input) {

    render(state);
}

function render (state) {

}

// agree all - no state change
// more info - update screen