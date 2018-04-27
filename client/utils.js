const a = new Set([1,2,3,4,5]);
const b = new Set([4,5,6,7,8]);

function createVendorQueryOutput (query, allowed) {
    const result = new Set(
        [...query].filter(x => allowed.has(x))
    );
    console.log(result);
}

createVendorQueryOutput(a,b);