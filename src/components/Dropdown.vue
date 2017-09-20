<template>
  <div class="ui selection dropdown"
       :class="dropdownClasses"
       :tabindex="0"
       @click="toggle()"
       @keyup.enter="toggle()"
       @keydown.up="selectPrevious()"
       @keydown.down="selectNext()">

    <i class="dropdown icon"></i>
    <div :class="[{'default': !selected.text }, 'text']">
      {{selected.text || placeholder}}
    </div>

    <transition
      @before-enter="beforeEnter"
      @after-enter="afterEnter"
      :enter-active-class="enterActiveClass()"
      :leave-active-class="leaveActiveClass()"
      @before-leave="beforeLeave"
      @after-leave="afterLeave">

      <div :class="menuClasses" v-if="showOptions" tabindex="-1"
           ref="menu">
        <div :class="['item', {'active selected': selected === option}]"
             v-for="(option, index) in options"
             @click.stop="selectItem(option)"
             ref="options">
          {{option.text}}
        </div>
      </div>

    </transition>
  </div>
</template>
<script>
  export default {
    props: {
      'placeholder': '',
      'options': {
        type: Array
      },

      transition: {
        type: String,
        default () {
          const classes = ['slide'];
          classes.push(this.isUpward ? 'up' : 'down');
          return classes.join(' ')
        },
      }
    },
    data () {
      return {
        showOptions: false,
        selected: {
          default: null
        },
      }
    },
    computed: {
      dropdownClasses () {
        return {
          active: this.showOptions,
          visible: this.showOptions
        }
      },
      menuClasses () {
        return {
          menu: true,
          transition: true,
          visible: this.showOptions,
          hidden: !this.showOptions
        }
      },
    },
    methods: {
      toggle () {
        this.showOptions ? this.close() : this.open();
      },
      open () {
        this.showOptions = true;
      },
      close () {
        this.showOptions = false;
      },
      selectItem (option) {
        this.selected = option;
        this.close();
      },
      beforeEnter () {
        this.$emit('open')
      },
      afterEnter () {
        let selectedIndex = this.selectedIndex();
        if (selectedIndex > 0) {
          this.scrollIntoView(selectedIndex);
        }
        this.$el.querySelector('div.menu').focus();
        this.disableScroll();

        this.$emit('opened');
      },
      beforeLeave () {
        this.$emit('close')
      },
      afterLeave () {
//        if (this.isSelected()) {
//          this.scrollIntoView(this.$items.indexOf(this.selected))
//        }

        this.enableScroll();
        this.$emit('closed');
      },
      enterActiveClass () {
        const classes = ['animating'];
        if (!this.transition) {
          classes.push('slide')
          classes.push('up')
        } else {
          classes.push(this.transition)
        }
        classes.push('in')

        return this.flatten(classes).join(' ');
      },
      leaveActiveClass() {
        const classes = ['animating']
        if (!this.transition) {
          classes.push('slide')
          classes.push('down')
        } else {
          classes.push(this.transition)
        }
        classes.push('out');

        return this.flatten(classes).join(' ');
      },

      selectPrevious() {
        let selectedItemIndex = this.selectedIndex();
        if (selectedItemIndex > 0) {
          this.selected = this.options[--selectedItemIndex]
          this.scrollIntoView(selectedItemIndex)
        }
      },
      selectNext() {
        let selectedItemIndex = this.selectedIndex();
        if (++selectedItemIndex < this.options.length) {
          this.selected = this.options[selectedItemIndex]
          this.scrollIntoView(selectedItemIndex)
        }
      },
      scrollIntoView(position) {
        //        element.focus();

        const element = this.$refs['options'][position];
        const amountVisibleItems = Math.floor(element.offsetParent.offsetHeight / element.offsetHeight);
//        const scrollFixer = position - amountVisibleItems
        const scrollFixer = 4

//        console.log(element.);

//        if ((element.clientHeight * position)) {
        element.parentElement.scrollTop = element.clientHeight * position + scrollFixer;
//        }

//        working to down
//        if (scrollFixer + (element.clientHeight * position) - (amountVisibleItems * element.clientHeight) >= element.offsetParent.scrollTop - scrollFixer) {
//          element.parentElement.scrollTop += element.offsetParent.offsetHeight;
//        }
      },
      selectedIndex()
      {
        return this.options.findIndex(item => {
          return item === this.selected
        })
      }
      ,

      flatten(list)
      {
        return list.reduce(function (a, b) {
          return a.concat(Array.isArray(b) ? this.flatten(b) : b);
        }, []);
      }
      ,

      disableScroll() {
        if (window.addEventListener) {// older FF
          window.addEventListener('DOMMouseScroll', preventDefault, false);
        }

        window.onwheel = preventDefault; // modern standard
        window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
        window.ontouchmove = preventDefault; // mobile
        document.onkeydown = preventDefaultForScrollKeys;

        function preventDefault(e) {
          e = e || window.event;
          if (e.preventDefault)
            e.preventDefault();
          e.returnValue = false;
        }

        function preventDefaultForScrollKeys(e) {
          const keys = {37: 1, 38: 1, 39: 1, 40: 1}
          if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
          }
        }
      },
      enableScroll() {
        if (window.removeEventListener) {
          window.removeEventListener('DOMMouseScroll', preventDefault, false);
        }

        window.onmousewheel = document.onmousewheel = null;
        window.onwheel = null;
        window.ontouchmove = null;
        document.onkeydown = null;

        function preventDefault(e) {
          e = e || window.event;
          if (e.preventDefault)
            e.preventDefault();
          e.returnValue = false;
        }
      }
    }
  }
  // isVisible = this.showOptions
  // visible = this.showOptions por computed dropdownClasses ()
</script>
