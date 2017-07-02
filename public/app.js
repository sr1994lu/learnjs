'use strict';
let learnjs = {};

learnjs.problemView = () => {
  return $('<div class="problem-view">').text('Comming soon!');
};

learnjs.showView = hash => {
  const routes = {
    '#problem-1': learnjs.problemView,
  };
  const viewFn = routes[hash];

  if (viewFn) {
    $('.view-container').empty().append(viewFn);
  }
};
