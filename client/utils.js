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



export {
    fetchAllVendorsArray,
    fetchAllPurposeArray
}