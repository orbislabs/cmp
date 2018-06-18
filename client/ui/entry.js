export default function entry(){
    console.log('entry');
    return import('./main').then(module => {
        console.log(module);
    });
}