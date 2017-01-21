function blockUIConfig(blockUIConfig) {
    'ngInject';

    blockUIConfig.message = ''; // 加载中...

    // Change the default delay to 100ms before the blocking is visible
    blockUIConfig.delay = 100;

    // Disable automatically blocking of the user interface
    blockUIConfig.autoBlock = false;

    // 只要发生异常就清除block
    blockUIConfig.resetOnException = true;

    // block默认是加到body上的，不过我们关掉它，自已指定block的区域
    blockUIConfig.autoInjectBodyBlock = false;

    // 默认是block-ui block-ui-anim-fade；如果需要覆盖，设置为 block-ui + 想应用的class
    blockUIConfig.cssClass = 'block-ui block-ui-message-custom';
}

export default blockUIConfig;