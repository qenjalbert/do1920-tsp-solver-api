'use strict'
const tsp = require('../tspSolver');

module.exports.newProblem = function newProblem(req, res, next) {

  tsp.solver(req.problem.value.problem.matrizNxN, 0, 0).then(result => {

    var postResponse = {
      "id": req.problem.value.id,
      "problem": req.problem.value.problem,
      "solution": result
    };
    res.send(postResponse);
  });
};