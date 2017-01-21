
export default function payWay() {
    return function(way){
        var pay_way_name = "";
        switch(way) {
            case 1:
                pay_way_name = '现金';
                break;
            case 2:
                pay_way_name = '刷卡';
                break;
            case 0:
                pay_way_name = '无';
                break;
            default:
                pay_way_name = '部分现金';
        }
        return pay_way_name;
    }
}