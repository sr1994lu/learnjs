const formattedProblems = [];
learnjs.problems.forEach(problem => {
  formattedProblems.push({
    code: learnjs.formatCode(problem.code),
    name: problem.name,
  });
});
return formattedProblems;
