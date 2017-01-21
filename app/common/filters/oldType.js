
export default function oldType() {
  return function(type){
    var old_type_name = "";
    switch(type) {
      case 2:
        old_type_name = '潜在会员';
        break;
      case 3:
        old_type_name = '全托会员';
        break;
      case 4:
        old_type_name = '日托会员';
        break;
      case 5:
        old_type_name = '普通会员';
      default:
        console.warn('invalid old_type');
    }
    return old_type_name;
  }
}
