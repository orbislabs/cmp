import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import '../node_modules/uikit/dist/css/uikit.min.css';
import Popup from './templates/popup.html';
import Details from './templates/details.html';
// loads the Icon plugin
UIkit.use(Icons);

function showConsentModalPromise () {
    return new Promise ((resolve, reject) => {
        UIkit.modal.dialog(Popup, { 'bg-close' : false });
        document.getElementById('agree-button').addEventListener('click', function (e) {
            resolve('fullConsent')
            console.log('CMP => User consent given');
        });
        document.getElementById('information-button').addEventListener('click', function (e) {
            UIkit.modal.dialog(Details)
            console.log('CMP => User requested further information');
            document.getElementById('accept-all').addEventListener('click', function (e) {
                resolve('fullConsent')
            });
            document.getElementById('accept-selected').addEventListener('click', function (e) {
                let checkboxData = {
                    1 : document.getElementById('purposes-table').rows[1].cells[2].childNodes[0].checked,
                    2 : document.getElementById('purposes-table').rows[2].cells[2].childNodes[0].checked,
                    3 : document.getElementById('purposes-table').rows[3].cells[2].childNodes[0].checked,
                    4 : document.getElementById('purposes-table').rows[4].cells[2].childNodes[0].checked,
                    5 : document.getElementById('purposes-table').rows[5].cells[2].childNodes[0].checked
                }
                resolve(createPurposeArrayFromObject(checkboxData));
            });
        });
    });
};

export default showConsentModalPromise;

function createPurposeArrayFromObject (obj) {
    let result = [];
    Object.keys(obj).forEach((key, index) => {
        if (obj[key]) {
            result.push(key);
        }
    });
    return result;
};