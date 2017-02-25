export function filterValue() {

    return function(val, list){

    	// console.log(val, list);

    	let rt = list.filter(item => item.value == val);

    	if (rt.length) {
    		return rt[0].label;
    	}

        return '';
    }
    
}

export function filterDistributeState() {
	const stateList = {
		1: '待分配',
		2: '已分配',
		3: '已认领'
	};
	return function(val) {
		return stateList[val] || '';
	}
}