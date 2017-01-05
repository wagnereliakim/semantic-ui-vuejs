var Button = require('./src/Button.vue');
// var LessFiles = require("./assets/app.less");

module.exports = {
    install: function (Vue, options) {
        Vue.component('ui-button', Button);
    }
};