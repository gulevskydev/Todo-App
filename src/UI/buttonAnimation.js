import $ from 'jquery';
import { TweenMax, Elastic, Quad, Quint } from 'gsap';

/* eslint-disable */
export function initAnimationButton() {
  const menuItemNum = $('.menu-item').length;
  const angle = 120;
  const distance = 90;
  const startingAngle = 180 + -angle / 2;
  const slice = angle / (menuItemNum - 1);
  $('.menu-item').each(function (i) {
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
  let on = false;

  $('.menu').on('mouseleave', function () {
    console.log('leave');

    TweenMax.to($('.menu-toggle-button').children('.menu-toggle-icon'), 0.4, {
      rotation: 0,
      ease: Quint.easeInOut,
      force3D: true,
    });
    closeMenu();
  });

  $('.menu-toggle-button').on('mouseover', function (event) {
    event.preventDefault();
    event.stopPropagation();
    TweenMax.to($(this).children('.menu-toggle-icon'), 0.4, {
      rotation: 45,
      ease: Quint.easeInOut,
      force3D: true,
    });
    openMenu();
    console.log('over');
  });

  function openMenu() {
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
        y: distance,
        force3D: true,
        ease: Quint.easeInOut,
      });
    });
  }
  function closeMenu() {
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
  }
}