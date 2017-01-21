
export default function diseaseHistory() {

    return function(arr){

        var disease_history = "";

        for(let item of arr) {
            disease_history += item.name + '  ';
        }

        return disease_history;
    }
    
}