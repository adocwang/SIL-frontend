export default function orderStatus() {
    return function(status){
        var status_name = "";
        switch(status) {
            case 0:
                status_name = '已预约';
                break;
            case 10:
                status_name = '已确认';
                break;
            case 50:
                status_name = '已完成';
                break;
            case 99:
                status_name = '已付款';
                break;
            default:
                status_name = '已取消';
        }
        return status_name;
    }
}