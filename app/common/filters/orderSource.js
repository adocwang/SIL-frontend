
export default function orderSource() {
    return function(source){
        var order_source_name = "";
        switch(source) {
            case 1:
                order_source_name = '后台';
                break;
            case 2:
                order_source_name = 'pad端';
                break;
            case 3:
                order_source_name = '子女端';
                break;
            default:
                order_source_name = '长者端';
        }
        return order_source_name;
    }
}