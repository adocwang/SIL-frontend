export default function fix() {

    return function(value, num){

    	!num && (num = 2);
    	return typeof value == 'number' ? value.toFixed(num) : '';
    }
    
}