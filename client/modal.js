import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import '../node_modules/uikit/dist/css/uikit.min.css';
import Popup from './templates/popup.html'
// loads the Icon plugin
UIkit.use(Icons);

// this should return the user selection as a resolved promise
function showConsentModal () {
    
    UIkit.modal.dialog(Popup);
    
    document.getElementById('agree-button').addEventListener('click', function () {
        //console.log('CMP => User consent given')
        //let fullConsentEvent = new Event('fullConsent');
        cmp.onFullConsent();
    });
    document.getElementById('information-button').addEventListener('click', function () {
        console.log('CMP => User requested further information')
    });
}

export default showConsentModal;