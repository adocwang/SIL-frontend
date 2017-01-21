
export default function serviceType() {
    return function(type){
        var service_type_name = "";
        switch(type) {
            case 1:
                service_type_name = '上门';
                break;
            case 2:
                service_type_name = '到店';
                break;
            case 3:
                service_type_name = '上门，到店';
                break;
            default:
                service_type_name = '其它';
        }
        return service_type_name;
    }
}