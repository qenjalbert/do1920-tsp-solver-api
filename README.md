# TSPSOLVER-API

## Overview
This is a Travel Salesman Problem API for stress analysis and benchmarking. 

This server was scaffolded with [oas-wizard](https://github.com/pafmon/oas-wizard), [oas-tools](https://github.com/isa-group/oas-tools) and [oas-generator](https://github.com/isa-group/oas-generator); tspsolver algorithm is taken from [devfacet](https://github.com/saby1101/node-tspsolver).

There is a **on-line demo** deployment available at: https://do1819-tspsolver-api.herokuapp.com


### Running the API using docker

If you have docker, you can use it out of the box: `docker run -p 54321:80 -d favsol26/tspsolver-api` to run the container at port `54321`


### Running the API using node

To run the server, just use:

```
npm install 
npm start
```

Then, if running in localhost, you can check the swagger UI doc portal in: `http://localhost:3000/`

### Using the API

#### Travel Salesman Problem solving

#### Stress request

In order to send a request, a GET can be used:

- `GET /api/v1/stress/250/10` would generate and solve a Travel Salesman problem with 250 routes (each of them with a random weight up to 10).
will get:
```json
{
	"problem": "travel salesman problem",
	"parameters": [{
		"id": "routesNumber",
		"value": 250
	}, {
		"id": "maxWeight",
		"value": 10
	}],
	"config": {
		"maxMemory": -1,
		"maxTime": -1
	},
	"info": {
		"initialMemory": 16.911,
		"heapStats": {
			"total_heap_size": 21.613,
			"total_heap_size_executable": 3,
			"total_physical_size": 19.204,
			"total_available_size": 1437.03,
			"used_heap_size": 16.911,
			"heap_size_limit": 1456.175,
			"malloced_memory": 0.008,
			"peak_malloced_memory": 3.632,
			"does_zap_garbage": 0
		}
	},
	"result": {
		"stages": [{
			"id": "problemGeneration",
			"duration": 7.14,
			"memory": 0.706
		}, {
			"id": "problemSolving",
			"duration": 726.464,
			"memory": 0.026
		}],
		"total": {
			"duration": 733.851,
			"memory": 0.732
		}
	}
}
```

In order to solve a given Travel Salesman Problem you should send a POST to `/api/v1/problems` endpoint: 

`POST /api/v1/problems`
```json
{
    "id": "TSProblem",
    "problem": {
        "matrizNxN": [
        [0, 0, 0, 0, 0],
        [0, 0, 6, 2, 3],
        [0, 5, 0, 3, 1],
        [0, 2, 9, 0, 5],
        [0, 3, 5, 5, 0]
      ]
    }
}
```
will get: 
```json
{
  "id": "TSProblem",
  "problem": {
    "matrizNxN": [
        [0, 0, 0, 0, 0],
        [0, 0, 6, 2, 3],
        [0, 5, 0, 3, 1],
        [0, 2, 9, 0, 5],
        [0, 3, 5, 5, 0]
    ]
 },
  "solution": {
    "routes": [
     0, 2, 4, 1, 3, 0
    ],
    "stats": {
      "solvingTime": "250.086ms"
    }
  }
}
```

`/api/v1/stress/info`
```json
{
	"cpuUsage": 0.044334975369458074,
	"cpuFree": 0.9704797047970479,
	"cpuCount": 8,
	"memInfo": {
		"total": 11916.973,
		"free": 506.625,
		"used": 11410.348,
		"active": 7076.215,
		"available": 6018.633,
		"buffcache": 4334.133,
		"swaptotal": 3905.996,
		"swapused": 0,
		"swapfree": 3905.996
	},
	"freemem": 510.457,
	"totalmem": 11916.973,
	"freememPercentage": 0.04283445519045348,
	"cpuInfo": {
		"manufacturer": "Intel®",
		"brand": "Core™ i5-8250U",
		"vendor": "GenuineIntel",
		"family": "6",
		"model": "142",
		"stepping": "10",
		"revision": "",
		"voltage": "",
		"speed": "1.60",
		"speedmin": "0.40",
		"speedmax": "1.60",
		"cores": 8,
		"physicalCores": 4,
		"processors": 1,
		"socket": "",
		"cache": {
			"l1d": 32768,
			"l1i": 32768,
			"l2": 262144,
			"l3": 6291456
		}
	},
	"sysUptime": 44396,
	"processUptime": 1049.407,
	"loadavgLast1Minute": 0.56884765625,
	"loadavgLast5Minutes": 0.68896484375,
	"loadavgLast15Minutes": 0.69189453125,
	"platform": "linux"
}
```