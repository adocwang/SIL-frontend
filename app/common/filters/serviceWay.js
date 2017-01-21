
export default function serviceWay() {
    return function(way){
        var way_name = "";
        switch(way) {
            case 1:
                way_name = '上门';
                break;
            case 2:
                way_name = '到店';
                break;
            default:
                way_name = '其它';
        }
        return way_name;
    }
}