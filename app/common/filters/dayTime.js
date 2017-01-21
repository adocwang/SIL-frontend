export default function dayTime() {

    return function(time){

    	let h = Math.floor(time / 36000);
    	let m = time % 3600 / 60;
    	h = h > 9 ? h : '0' + h;
    	m = m > 9 ? m : '0' + m;

        return h + ':' + m;
    }
    
}