<template>
  <div :class="buttonsClasses" v-if="!or">
    <slot></slot>
  </div>

  <div :class="buttonsClasses" v-or v-else>
    <slot></slot>
  </div>

</template>
<script>
  export default {
    props: {
      or: {
        type: Boolean,
        default: false
      },
    },
    computed: {
      buttonsClasses() {
        return {
          ui: true,
          buttons: true
        }
      }
    },
    directives: {
      or: {
        bind: function (el, binding, vnode) {

          let children = [];
          Object.assign(children, el.children);
          el.innerHTML = '';

          let index = 0;
          for (let value of children) {
            if (index > 0) {
              let orNode = document.createElement('div');
              orNode.className = 'or';
              if (binding.expression) {
                orNode.setAttribute('data-text', binding.expression);
              }
              el.append(orNode);
            }
            el.append(value);
            index++;
          }
        }
      }
    }
  }
</script>
