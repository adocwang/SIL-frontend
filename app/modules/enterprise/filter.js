export default function filterValue() {

    return function(val, list){

    	// console.log(val, list);

    	let rt = list.filter(item => item.value == val);

    	if (rt.length) {
    		return rt[0].label;
    	}

        return '';
    }
    
}