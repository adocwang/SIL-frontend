export default function tiemFormat() {

    return function(time){

    	return moment(time).format('YYYY-MM-DD HH:mm:ss');
    }
    
}