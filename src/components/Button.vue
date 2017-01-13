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
        <a :class="[labelClasses, emphasisClasses]" v-if="labelPosition == 'left'">
            {{label}}
        </a>
        <div class="ui button" :class="[{icon: icon !== ''}, {basic: basic}, emphasisClasses]">
            <i class="icon" :class="icon" v-if="icon"></i>
            <slot></slot>
        </div>
        <a :class="['right', labelClasses, emphasisClasses]" v-if="labelPosition == '' || labelPosition == 'right'">
            {{label}}
        </a>
    </div>

    <!-- Normal Button -->
    <button :class="[buttonClasses, iconClasses, emphasisClasses]" v-else
            @click="handleClick">
        <i class="icon" :class="[labelPosition, icon, labelIcon]" v-if="icon != '' || labelIcon != ''"></i>
        <slot></slot>
    </button>
</template>

<script>
    export default{
        data(){
            return {
                teste: false
            }
        },
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
            }
        },
        methods: {
            handleClick(evt) {
                this.$emit('click', evt);
            }
        },
        computed: {
            buttonClasses() {
                return {
                    ui: true,
                    left: this.labelPosition === 'left',
                    right: this.labelPosition === 'right',
                    labeled: this.label !== '' || this.labelIcon !== '',
                    button: true,
                    animated: this.animated,
                    fade: this.effect === 'fade',
                    basic: this.basic,
                    inverted: this.inverted,
                    active: this.active,
                    disabled: this.disabled,
                    loading: this.loading
                }
            },
            iconClasses() {
                return {
                    icon: this.icon !== '' || this.labelIcon !== '',
                    labeled: this.labelIcon !== ''
                }
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
                var vm = this;
                var emphasis = [
                    'primary',
                    'secondary',
                    'positive',
                    'negative',
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
                    'black'];

                var obj = emphasis.reduce(function (result, item) {
                    if (vm.emphasis === item) {
                        result[item] = true;
                    }
                    return result;
                }, {});

                return obj;
            }
        }
    }
</script>
