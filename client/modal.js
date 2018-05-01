import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import '../node_modules/uikit/dist/css/uikit.min.css';

// loads the Icon plugin
UIkit.use(Icons);

const html = `
        <div id="123" class="uk-modal-body" bg-close="false">
            <h2 class="uk-modal-title">We use cookies!</h2>
            <p>There is new regulation in the EU which requires you to consent to our use of your personal data. We and our partners collect and use cookies for ad personalisation and measurement. </p>
            <p class="uk-text-right">
            <button id="information-button" class="uk-button uk-button-default uk-modal-close" type="button">More Information</button>
            <button id="agree-button" class="uk-button uk-button-primary uk-modal-close" type="button">Agree</button>
            </p>
        </div>
        `

function showConsentModal () {
    UIkit.modal.dialog(html, { 'bg-close'  : false });
    document.getElementById('agree-button').addEventListener('click', function () {
        console.log('CMP => User consent given')
        let fullConsentEvent = new Event('fullConsent');
        dispatchEvent(fullConsentEvent);
    });
    document.getElementById('information-button').addEventListener('click', function () {
        console.log('CMP => User requested further information')
    });
}


export default showConsentModal;