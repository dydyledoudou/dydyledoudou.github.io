$( document ).ready(function() {
  var red = $('#red');
  var green = $('#green');
  var blue = $('#blue');
  var transEnd = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';

  red.addClass('slide-in');
  red.one(transEnd, function() {
    red.removeClass('slide-in');
    red.addClass('slide-out');
    green.addClass('slide-in');
  });
  green.one(transEnd, function() {
    green.removeClass('slide-in');
    green.addClass('slide-out');
    blue.addClass('slide-in');
  });
  blue.one(transEnd, function() {
    blue.removeClass('slide-in');
    blue.addClass('slide-out');
  });
});