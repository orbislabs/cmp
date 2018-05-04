import json2html from './json2html.js';
//import vendorList from './vendorList.js';
//vendorList.vendors  

console.log(json2html)

function fetchAllVendorsArray (vendorList) {
    let result = vendorList.vendors.map(item => {
        return item.id;
    });
    return result;
};

function fetchAllPurposeArray (vendorList) {
    let result = vendorList.purposes.map(item => {
        return item.id
    });
    return result;
};

function buildVendorTable (vendorList) {
    const vendors = vendorList.vendors;
    const table = {'<>' : 'div', 'html' : '${name} ${policyUrl}'}
    const html = json2html.transform(vendors,table);
    console.log(html);
    return html;
}


export {
    fetchAllVendorsArray,
    fetchAllPurposeArray,
    buildVendorTable
}