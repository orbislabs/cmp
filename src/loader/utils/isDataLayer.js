// renameBug..
// use async if this will be promise in the future 
export default async function isDataLayer() {
  return typeof dataLayer !== 'undefined'
}
