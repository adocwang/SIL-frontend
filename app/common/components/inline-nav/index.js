import InlineNavController from './inline-nav.ctrl';


const inlineNav = {
  templateUrl: 'common/components/inline-nav/inline-nav.html',
  controller: InlineNavController,
  bindings: {
    navList: '<',
    btnList: '<',
    alias: '@',
    backBtn: '<'
  }
}

export default inlineNav;
