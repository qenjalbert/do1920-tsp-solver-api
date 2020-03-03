'use strict'
const tsp = require('../tspSolver');

module.exports.getStress = function getStress(req, res, next) {
  var stressRequest = req.stressRequest.value;

  tsp.solver([], req.routesNumber.value, req.maxWeight.value).then(result => {
    var getResponse = {
      "problem": stressRequest.problem,
      "parameters": stressRequest.parameters,
      "config":stressRequest.config,
      "info": result.info,
      "result": result.result 
    };
    res.send(getResponse); 
  });
  
};

module.exports.getStressInfo = function getStressInfo(req, res, next) {
  var os = require('os-utils');
  var si = require('systeminformation');

  si.cpu(function (cpuInfo) {
    si.mem(function (memInfo) {

      // Round mem stats to MB
      var roundedMemInfo = Object.getOwnPropertyNames(memInfo).reduce(function (map, stat) {
        map[stat] = Math.round((memInfo[stat] / 1024 / 1024) * 1000) / 1000;
        return map;
      }, {});

      var p = os.platform();

      os.cpuUsage(function (cpuUsage) {

        os.cpuFree(function (cpuFree) {

          res.send({
            "cpuUsage": cpuUsage,
            "cpuFree": cpuFree,
            "cpuCount": os.cpuCount(),
            "memInfo": roundedMemInfo,
            "freemem": Math.round((os.freemem() * 1000)) / 1000,
            "totalmem": Math.round((os.totalmem() * 1000)) / 1000,
            "freememPercentage": os.freememPercentage(),
            "cpuInfo": cpuInfo,
            "sysUptime": os.sysUptime(),
            "processUptime": os.processUptime(),
            "loadavgLast1Minute": os.loadavg(1),
            "loadavgLast5Minutes": os.loadavg(5),
            "loadavgLast15Minutes": os.loadavg(15),
            "platform": os.platform()
          });

        });
      });

    });
  });

};