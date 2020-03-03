var solver = require('node-tspsolver');
const v8 = require('v8');

// var rutas = 5;
// var max = 90;

// var matriz = [
//     [0, 0, 0, 0, 0],
//     [0, 0, 6, 2, 3],
//     [0, 5, 0, 3, 1],
//     [0, 2, 9, 0, 5],
//     [0, 3, 5, 5, 0]
// ]; 
// console.log(asyncCall());
function creaMatriz(n, m, max) {
    var matrizInterna = [];

    for (let index = 0; index < m; index++)
        matrizInterna.push(
            Math.ceil(
                (Math.random() * max + 1) - 1
            )
        );

    if (n < 1) {
        return matriz = [];
    } else {
        creaMatriz(n - 1, m, max)
        matriz.push(matrizInterna);
    }
    return matriz;
};

async function asyncCall(matriz, rutas, max) {
    var requestResponse = {};

    var stressResponse = {};

    var solution = {};

    if (rutas > 1) {

        var initialMemUsed = process.memoryUsage().heapUsed / 1024 / 1024;

        var totalBeginHR = process.hrtime();
        var totalBegin = totalBeginHR[0] * 1000000 + totalBeginHR[1] / 1000;

        var heapStats = v8.getHeapStatistics();

        // Round stats to MB
        var roundedHeapStats = Object.getOwnPropertyNames(heapStats).reduce(function (map, stat) {
            map[stat] = Math.round((heapStats[stat] / 1024 / 1024) * 1000) / 1000;
            return map;
        }, {});

        stressResponse = {
            "info": {
                "initialMemory": Math.round((initialMemUsed) * 1000) / 1000,
                "heapStats": roundedHeapStats
            },
            "result": {
                "stages": [{
                    "id": "problemGeneration",
                    "duration": -1,
                    "memory": -1
                },
                {
                    "id": "problemSolving",
                    "duration": -1,
                    "memory": -1
                }
                ],
                "total": {
                    "duration": -1,
                    "memory": -1
                }
            }
        };

        var stagesMap = stressResponse.result.stages.reduce(function (map, obj) {
            map[obj.id] = {
                "duration": obj.duration,
                "memory": obj.memory
            };
            return map;
        }, {});


        ///////////////// GENERATION ///////////////////

        var beginHR = process.hrtime()
        var begin = beginHR[0] * 1000000 + beginHR[1] / 1000;

        //console.time(problem+"-"+phase+"-C"); 
        var tsProblem = creaMatriz(rutas, rutas, max); /*******/
        //console.timeEnd(problem+"-"+phase+"-C"); 

        var endHR = process.hrtime()
        var end = endHR[0] * 1000000 + endHR[1] / 1000;
        var duration = (end - begin) / 1000;
        var roundedDuration = Math.round(duration * 1000) / 1000;


        stagesMap["problemGeneration"].duration = roundedDuration;

        /////////////////////////////////////////////////

        const genMemUsed = process.memoryUsage().heapUsed / 1024 / 1024;

        stagesMap["problemGeneration"].memory = Math.round((genMemUsed - initialMemUsed) * 1000) / 1000;

        ///////////////////// SOLVING /////////////////
        var phase = "solving";
        var beginHR = process.hrtime()
        var begin = beginHR[0] * 1000000 + beginHR[1] / 1000;

       /* await*/ solver.solveTsp(tsProblem, true, {})
            .then(function (result) {
               // console.log(result); result is an array of indices specifying the route.
            });/*******/

        var endHR = process.hrtime()
        var end = endHR[0] * 1000000 + endHR[1] / 1000;
        var duration = (end - begin) / 1000;
        var roundedDuration = Math.round(duration * 1000) / 1000;

        stagesMap["problemSolving"].duration = roundedDuration;

        var finalMemUsed = process.memoryUsage().heapUsed / 1024 / 1024;

        stagesMap["problemSolving"].memory = Math.round((finalMemUsed - genMemUsed) * 1000) / 1000;

        /////////////////////////////////////////////////

        var totalEndHR = process.hrtime()
        var totalEnd = totalEndHR[0] * 1000000 + totalEndHR[1] / 1000;
        var totalDuration = (totalEnd - totalBegin) / 1000;
        var roundedDuration = Math.round(totalDuration * 1000) / 1000;

        stressResponse.result.total.duration = roundedDuration;
        stressResponse.result.total.memory = Math.round((finalMemUsed - initialMemUsed) * 1000) / 1000;

        stressResponse.result.stages = Object.getOwnPropertyNames(stagesMap).map(stageId => {
            return {
                "id": stageId,
                "duration": stagesMap[stageId].duration,
                "memory": stagesMap[stageId].memory
            };
        });

        tsSolution = null;
        tsProblem = null;
    } else {
        var betterRoute = [];

        var beginHR = process.hrtime()
        var begin = beginHR[0] * 1000000 + beginHR[1] / 1000;
        // console.log('solving');

        // matriz = (rutas > 0) ? creaMatriz(rutas, rutas, max) : matriz;

        await solver.solveTsp(matriz, true, {})
            .then(function (result) {
                betterRoute = result; // result is an array of indices specifying the route.
            });

        var endHR = process.hrtime()
        var end = endHR[0] * 1000000 + endHR[1] / 1000;
        var duration = (end - begin) / 1000;
        var roundedDuration = Math.round(duration * 1000) / 1000;

        // console.log(betterRoute);
        // console.log("time: " + roundedDuration);

        solution = {
            "routes": betterRoute,
            "stats": {
                "solvingTime": roundedDuration
            }
        };
    }

    requestResponse = (rutas < 1) ? solution : stressResponse;

    // console.log(requestResponse);

    return requestResponse;
}

module.exports.solver = asyncCall;