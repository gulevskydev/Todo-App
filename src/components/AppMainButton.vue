<template>
  <div class="content">
    <div class="menu" @mouseleave="onMouseLeave">
      <div class="menu-wrapper">
        <ul class="menu-items">
          <li class="menu-item">
            <button class="menu-item-button" @click="openPopup">
              <i class="fa fa-check-square-o"></i>
            </button>
            <div class="menu-item-bounce"></div>
          </li>
          <li class="menu-item">
            <button class="menu-item-button">
              <i class="fa fa-inbox"></i>
            </button>
            <div class="menu-item-bounce"></div>
          </li>
          <li class="menu-item">
            <button class="menu-item-button">
              <i class="fa fa-trash"></i>
            </button>
            <div class="menu-item-bounce"></div>
          </li>
        </ul>
        <button
          class="menu-toggle-button"
          @mouseover.stop.prevent="onMouseOver()"
        >
          <i class="fa fa-plus menu-toggle-icon"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { TweenMax, Elastic, Quad, Quint } from 'gsap';
import $ from 'jquery';

export default {
  name: 'AppMainButton',

  data: function () {
    return {
      ANGLE: 120,
    };
  },

  mounted: function () {
    this.initBeautifulAddButton();
  },

  methods: {
    onMouseLeave() {
      TweenMax.to($('.menu-toggle-button').children('.menu-toggle-icon'), 0.4, {
        rotation: 0,
        ease: Quint.easeInOut,
        force3D: true,
      });

      this.closeMenu();
    },

    onMouseOver() {
      TweenMax.to($('.menu-toggle-button').children('.menu-toggle-icon'), 0.4, {
        rotation: 45,
        ease: Quint.easeInOut,
        force3D: true,
      });

      this.openMenu();
    },

    closeMenu() {
      $('.menu-item').each(function (i) {
        const delay = i * 0.08;

        const $bounce = $(this).children('.menu-item-bounce');

        TweenMax.fromTo(
          $bounce,
          0.2,
          {
            transformOrigin: '50% 50%',
          },
          {
            delay: delay,
            scaleX: 1,
            scaleY: 0.8,
            force3D: true,
            ease: Quad.easeInOut,
            onComplete: function () {
              TweenMax.to($bounce, 0.15, {
                // scaleX:1.2,
                scaleY: 1.2,
                force3D: true,
                ease: Quad.easeInOut,
                onComplete: function () {
                  TweenMax.to($bounce, 3, {
                    // scaleX:1,
                    scaleY: 1,
                    force3D: true,
                    ease: Elastic.easeOut,
                  });
                },
              });
            },
          },
        );

        TweenMax.to($(this).children('.menu-item-button'), 0.3, {
          delay: delay,
          y: 0,
          force3D: true,
          ease: Quint.easeIn,
        });
      });
    },

    openMenu() {
      $('.menu-item').each(function (i) {
        const delay = i * 0.08;

        const $bounce = $(this).children('.menu-item-bounce');

        TweenMax.fromTo(
          $bounce,
          0.2,
          {
            transformOrigin: '50% 50%',
          },
          {
            delay: delay,
            scaleX: 0.8,
            scaleY: 1.2,
            force3D: true,
            ease: Quad.easeInOut,
            onComplete: function () {
              TweenMax.to($bounce, 0.15, {
                // scaleX:1.2,
                scaleY: 0.7,
                force3D: true,
                ease: Quad.easeInOut,
                onComplete: function () {
                  TweenMax.to($bounce, 3, {
                    // scaleX:1,
                    scaleY: 0.8,
                    force3D: true,
                    ease: Elastic.easeOut,
                  });
                },
              });
            },
          },
        );

        TweenMax.to($(this).children('.menu-item-button'), 0.5, {
          delay: delay,
          y: 90,
          force3D: true,
          ease: Quint.easeInOut,
        });
      });
    },

    initBeautifulAddButton() {
      const $items = $('.menu-item');
      const STARTING_ANGLE = 180 + -this.ANGLE / 2;
      const slice = this.ANGLE / ($items.length - 1);

      this.transformHiddenButtons($items, STARTING_ANGLE, slice);
    },

    transformHiddenButtons(items, startingAngle, slice) {
      items.each(function (i) {
        const angle = startingAngle + slice * i;

        $(this).css({
          transform: `rotate(${angle}deg)`,
        });

        $(this)
          .find('.menu-item-icon')
          .css({
            transform: `rotate(-${angle}deg)`,
          });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.menu {
  width: 300px;
  height: 200px;
  margin: 0 auto 100px;
  position: relative;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  &-wrapper {
    position: absolute;
    left: 50%;
    bottom: 10px;
  }
  &-toggle-button,
  &-item-bounce,
  &-item-button {
    background: #4f4f64;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    margin-left: -40px;
    margin-top: -40px;
    height: 80px;
    color: #fff;
    border: none;
    outline: none;
    position: relative;
  }

  &-toggle-button {
    background: transparent;
    position: absolute;
    top: 0;
    left: 0;
  }
  &-toggle-icon {
    font-size: 30px;
    position: absolute;
    top: 0;
    left: 0;
    width: 80px;
    height: 80px;
    line-height: 80px;
  }
  &-items {
    list-style-type: none;
    padding: 0;
    margin: 0;
    position: absolute;
    left: 0;
    top: 0;
  }
  &-item {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
  }
  &-item-bounce {
    position: absolute;
    top: 0;
    left: 0;
  }

  &-item-button {
    width: 60px;
    height: 60px;
    margin-left: -30px;
    margin-top: -30px;
    position: absolute;
    top: 0;
    left: 0;
    color: #ad4c4c;
    .fa {
      font-size: 1.5rem;
      color: #fff;
    }
    .fa-inbox {
      transform: rotate(182deg);
    }
    .fa-check-square-o {
      transform: rotate(-120deg);
    }
    .fa-trash {
      transform: rotate(120deg);
    }
  }
}
</style>
