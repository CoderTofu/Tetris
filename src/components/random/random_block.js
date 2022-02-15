export default function randomBlock (obj) {
    let keys = Object.keys(obj);
    let randomKey = keys[keys.length * Math.random() << 0]
    return [obj[randomKey], randomKey];
};