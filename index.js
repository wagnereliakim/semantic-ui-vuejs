import UiButton from "./src/components/Button.vue";
import UiButtonGroup from "./src/components/ButtonGroup.vue";
import UiDropdown from "./src/components/Dropdown.vue";

import 'semantic-ui-css/semantic.css';

export const components = {
  UiButton,
  UiButtonGroup,
  UiDropdown
};

export default {
  install (Vue) {
    Object.keys(components).forEach((name) => {
      Vue.component(name, components[name])
    });
  }
};

