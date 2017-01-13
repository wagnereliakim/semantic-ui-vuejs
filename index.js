var Button = require('./src/components/Button.vue');

module.exports = {
    install: function (Vue, options) {
        Vue.component('ui-button', Button);
    }
};