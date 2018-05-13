//import buildVendorTable from './utils.js';
import vendorList from './vendorList.js';
import json2html from './json2html.js';

//console.log(buildVendorTable)
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import '../node_modules/uikit/dist/css/uikit.min.css';
import Modal from './ui/templates/index.html';
import Details from './ui/templates/purposes.html';
import Vendors from './ui/templates/vendors.html';
// loads the Icon plugin
UIkit.use(Icons);
//const vendorTable = buildVendorTable(vendorList);

function showConsentModalPromise () {
    return new Promise ((resolve, reject) => {
        UIkit.modal.dialog(Modal, { 'bg-close' : false });
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
            document.getElementById('vendor-list-link').addEventListener('click', function (e) {
                function buildVendorTable (vendorList) {
                    console.log('here')
                    const stringStart = 
                        `
                        <table id="purposes-table" class="uk-table uk-table-hover uk-table-divider">
                            <thead>
                                <tr>
                                    <td>Name</td>
                                    <td>Policy</td>
                                </tr>
                            </thead>
                        `;
                    const stringEnd = `</table>`;
                    const vendors = vendorList.vendors;
                    const table = {"<>":"tbody","html":[
                                    {"<>":"tr","html":[
                                        {"<>":"td","html":"${name}"},
                                        {"<>":"td","html":"<a href='${policyUrl}'>LINK</a>"}]}
                    
                                    ]}
                    const html = json2html.transform(vendors,table);
                    console.log(html);
                    return stringStart + html + stringEnd;
                }
                UIkit.modal.dialog(buildVendorTable(vendorList))
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
