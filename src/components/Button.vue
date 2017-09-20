<template>
  <!-- Animated Button -->
  <div :class="buttonClasses" v-if="animated"
       @click="handleClick"
       tabindex="0">
    <div class="visible content">
      <slot></slot>
      <slot name="visibleContent"></slot>
    </div>
    <div class="hidden content">
      <slot name="hiddenContent"></slot>
    </div>
  </div>

  <div :class="buttonClasses" v-else-if="this.label !== ''"
       @click="handleClick"
       tabindex="0">
    <a :class="[labelClasses, emphasisClasses, colorClasses]" v-if="labelPosition == 'left'">
      {{label}}
    </a>
    <div class="ui button" :class="[{icon: icon !== ''}, {basic: basic}, emphasisClasses, colorClasses]">
      <i class="icon" :class="iconComputed" v-if="icon"></i>
      <slot></slot>
    </div>
    <a :class="['right', labelClasses, emphasisClasses, colorClasses]"
       v-if="labelPosition == '' || labelPosition == 'right'">
      {{label}}
    </a>
  </div>

  <!-- Normal Button -->
  <button :class="[buttonClasses, iconClasses, emphasisClasses, colorClasses, socialClasses, sizeClasses]" v-else
          @click="handleClick">
    <i class="icon" :class="[labelPosition, iconComputed, labelIcon]" v-if="icon != '' || labelIcon != '' || social != ''"></i>
    <slot></slot>
  </button>
</template>

<script>
  export default{
    props: {
      animated: {
        type: Boolean,
        default: false
      },
      label: {
        type: String,
        default: ''
      },
      labelPosition: {
        type: String,
        default: ''
      },
      pointing: {
        type: String,
        default: ''
      },
      emphasis: {
        type: String,
        default: ''
      },
      icon: {
        type: String,
        default: ''
      },
      labelIcon: {
        type: String,
        default: ''
      },
      effect: {
        type: String,
        default: ''
      },
      basic: {
        type: Boolean,
        default: false
      },
      inverted: {
        type: Boolean,
        default: false
      },
      active: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false
      },
      compact: {
        type: Boolean,
        default: false
      },
      toggle: {
        type: Boolean,
        default: false
      },
      fluid: {
        type: Boolean,
        default: false
      },
      circular: {
        type: Boolean,
        default: false
      },
      social: {
        type: String,
        default: ''
      },
      size: {
        type: String,
        default: ''
      },
      float: {
        type: String,
        default: ''
      },
      color: {
        type: String,
        default: ''
      },
    },
    methods: {
      handleClick(evt) {
        this.$emit('click', evt);

        if (this.toggle) {
          this.active = !this.active;
        }
      },
    },
    computed: {
      buttonClasses() {
        return {
          ui: true,
          left: this.labelPosition === 'left' || this.float === 'left',
          right: this.labelPosition === 'right' || this.float === 'right',
          floated: this.float !== '',
          labeled: this.label !== '' || this.labelIcon !== '',
          button: true,
          animated: this.animated,
          fade: this.effect === 'fade',
          basic: this.basic,
          inverted: this.inverted,
          active: this.active,
          disabled: this.disabled,
          loading: this.loading,
          compact: this.compact,
          toggle: this.toggle,
          fluid: this.fluid,
          circular: this.circular
        }
      },
      iconClasses() {
        return {
          icon: this.icon !== '' || this.labelIcon !== '',
          labeled: this.labelIcon !== ''
        }
      },
      iconComputed() {
        return this.icon || this.social || ''
      },
      labelClasses() {
        return {
          ui: true,
          basic: true,
          label: true,
          'left pointing': this.pointing === 'left',
          'right pointing': this.pointing === 'right',
          'pointing': this.pointing === 'top',
          'bottom pointing': this.pointing === 'bottom',
        }
      },
      emphasisClasses() {
        const vm = this;
        const emphasis = [
          'primary',
          'secondary',
          'positive',
          'negative'
        ];

        return emphasis.reduce(function (result, item) {
          if (vm.emphasis === item) {
            result[item] = true;
          }
          return result;
        }, {});
      },
      colorClasses() {
        const vm = this;
        const colors = [
          'red',
          'orange',
          'yellow',
          'olive',
          'green',
          'teal',
          'blue',
          'violet',
          'purple',
          'pink',
          'brown',
          'grey',
          'black'
        ];

        return colors.reduce(function (result, item) {
          if (vm.color === item) {
            result[item] = true;
          }
          return result;
        }, {});
      },
      socialClasses() {
        const vm = this;
        const socials = [
          'facebook',
          'twitter',
          'google plus',
          'vk',
          'linkedin',
          'instagram',
          'youtube'];

        return socials.reduce(function (result, item) {
          if (vm.social === item) {
            result[item] = true;
          }
          return result;
        }, {});
      },
      sizeClasses() {
        const vm = this;
        const sizes = [
          'mini',
          'tiny',
          'small',
          'medium',
          'large',
          'big',
          'huge',
          'massive'];

        return sizes.reduce(function (result, item) {
          if (vm.size === item) {
            result[item] = true;
          }
          return result;
        }, {});
      }
    }
  }
</script>

<style>

</style>
