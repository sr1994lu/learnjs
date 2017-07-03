'use strict';
let learnjs = {};

learnjs.problems = [
  {
    description: 'What is truth?',
    code: 'function problem() { return __; }',
  },
  {
    description: 'Simple Math',
    code: 'function problem() { return 42 === 6 * __; }',
  },
];

learnjs.problemView = data => {
  const problemNumber = parseInt(data, 10);
  const view = $('.templates .problem-view').clone();
  const problemData = learnjs.problems[problemNumber - 1];
  const resultFlash = view.find('.result');

  function checkAnswer() {
    const answer = view.find('.answer').val();
    const test = `${problemData.code.replace('__', answer)}; problem();`;
    return eval(test);
  }

  function checkAnswerClick() {
    if (checkAnswer()) {
      const correctFlash = learnjs.template('correct-flash');
      correctFlash.bind('a').attr('href', `#problem-${problemNumber + 1}`);
      learnjs.flashElement(resultFlash, correctFlash);
    } else {
      learnjs.flashElement(resultFlash, 'Incorrect!');
    }
    return false;
  }

  view.find('.check-btn').click(checkAnswerClick);
  view.find('.title').text(`Problem #${problemNumber}`);
  learnjs.applyObject(problemData, view);

  if (problemNumber < learnjs.problems.length) {
    const buttonItem = learnjs.template('skip-btn');
    buttonItem.find('a').attr('href', '#problem-' + (problemNumber + 1));
    $('.nav-list').append(buttonItem);
    view.bind('removingView', () => {
      buttonItem.remove();
    });
  }

  return view;
};

learnjs.showView = hash => {
  const routes = {
    '#problem': learnjs.problemView,
    '#': learnjs.landingView,
    '': learnjs.landingView,
  };
  const hashParts = hash.split('-');
  const viewFn = routes[hashParts[0]];

  if (viewFn) {
    $('.view-container').empty().append(viewFn(hashParts[1]));
  }

  learnjs.triggerEvent('removingView', []);
  $('.view-container').empty().append(viewFn(hashParts[1]));
};

learnjs.appOnReady = () => {
  window.onhashchange = () => {
    learnjs.showView(window.location.hash);
  };
  learnjs.showView(window.location.hash);
};

learnjs.applyObject = (obj, elem) => {
  for (let key in obj) {
    elem.find(`[data-name="${key}"]`).text(obj[key]);
  }
};

learnjs.flashElement = (elem, content) => {
  elem.fadeOut('fast', () => {
    elem.html(content);
    elem.fadeIn();
  });
};

learnjs.template = name => {
  return $(`.templates .${name}`).clone();
};

learnjs.buildCorrectFlash = problemNum => {
  const correctFlash = learnjs.template('correct-flash');
  const link = correctFlash.find('a');

  if (problemNum < learnjs.problems.length) {
    link.attr('href', '#problem-' + (problemNum + 1));
  } else {
    link.attr('href', '');
    link.text(`You're Finished!`);
  }
  return correctFlash;
};

learnjs.landingView = () => {
  return learnjs.template('landing-view');
};

learnjs.triggerEvent = (name, args) => {
  $('.view-container>*').trigger(name, args);
};
