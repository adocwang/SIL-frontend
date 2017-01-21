export default function modeId() {

	let modeList = pageConf.modeList;


  return function(mode_id){
  	let mode = modeList.filter(item => item.mode_id == mode_id);
  	return mode.length ? mode[0].name : mode_id;
  }

}
