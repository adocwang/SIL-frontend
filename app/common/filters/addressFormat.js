
export default function addressFormat() {

    return function(str){
        let regx = /-\d+\;/;
        return str.split(regx).join('');
    }
    
}