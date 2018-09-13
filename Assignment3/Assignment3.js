/* 
Dominic Sherman

September 18th

This program uses sliders, buttons, keystrokes, and menus to manipulate the shape of an object, 
change how fast it is rotating, change the direction it is rotating, and change the color of it

I believe I earned 15 points on this assignment because I fulfilled all of the criteria
*/

"use strict";

var gl;

var theta = 0.0;
var speed = 0.05;
var thetaLoc;
var numVertices = 4;

var direction = true;

window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }

    //
    //  Configure WebGL
    //
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    //  Load shaders and initialize attribute buffers

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var vertices = [
        vec2(0, 1),
        vec2(-1, 0),
        vec2(1, 0),
        vec2(0, -1)
    ];

    var colors = [
        vec3(0.0, 0.0, 0.0),
        vec3(0.0, 0.0, 0.0),
        vec3(0.0, 0.0, 0.0),
        vec3(0.0, 0.0, 0.0)
    ];

    // Load the data into the GPU
    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);


    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    thetaLoc = gl.getUniformLocation(program, "theta");

    // Initialize event handler (menu)
    document.getElementById("Controls").onclick = function (event) {
        switch (event.target.index) {
            case 0: //create a black square
                numVertices = 4; //4 vertices in a square

                vertices = [ //all the vertices
                    vec2(0, 1),
                    vec2(-1, 0),
                    vec2(1, 0),
                    vec2(0, -1)
                ];

                colors = [ //make it black
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0)
                ];

                // Load the data into the GPU
                var cBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

                var vColor = gl.getAttribLocation(program, "vColor");
                gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
                gl.enableVertexAttribArray(vColor);

                var vBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

                // Associate out shader variables with our data buffer

                var vPosition = gl.getAttribLocation(program, "vPosition");
                gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
                gl.enableVertexAttribArray(vPosition);

                thetaLoc = gl.getUniformLocation(program, "theta");
                break;
            case 1: //make a black triangle
                numVertices = 3; //3 vertices in a triangle
                vertices = [ //all the vertices
                    vec2(-0.5, -0.5),
                    vec2(0, 0.5),
                    vec2(0.5, -0.5)
                ];

                colors = [ //make it black
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0)
                ];

                // Load the data into the GPU
                var cBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

                var vColor = gl.getAttribLocation(program, "vColor");
                gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
                gl.enableVertexAttribArray(vColor);

                var vBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

                // Associate out shader variables with our data buffer

                var vPosition = gl.getAttribLocation(program, "vPosition");
                gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
                gl.enableVertexAttribArray(vPosition);

                thetaLoc = gl.getUniformLocation(program, "theta");
                break;
            case 2: //make a random shape with four corners
                numVertices = 4;

                vertices = [ //completely random vertices
                    vec2(Math.random(), Math.random()),
                    vec2(Math.random(), Math.random()),
                    vec2(Math.random(), Math.random()),
                    vec2(Math.random(), Math.random())
                ];

                colors = [ //black
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0)
                ];

                // Load the data into the GPU
                var cBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

                var vColor = gl.getAttribLocation(program, "vColor");
                gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
                gl.enableVertexAttribArray(vColor);

                var vBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

                // Associate out shader variables with our data buffer

                var vPosition = gl.getAttribLocation(program, "vPosition");
                gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
                gl.enableVertexAttribArray(vPosition);

                thetaLoc = gl.getUniformLocation(program, "theta");
                break;
            case 3: //make a random shape with three corners
                numVertices = 3;

                vertices = [ //random vertices
                    vec2(Math.random(), Math.random()),
                    vec2(Math.random(), Math.random()),
                    vec2(Math.random(), Math.random())
                ];

                colors = [ //black
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0)
                ];

                // Load the data into the GPU
                var cBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

                var vColor = gl.getAttribLocation(program, "vColor");
                gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
                gl.enableVertexAttribArray(vColor);

                var vBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

                // Associate out shader variables with our data buffer

                var vPosition = gl.getAttribLocation(program, "vPosition");
                gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
                gl.enableVertexAttribArray(vPosition);

                thetaLoc = gl.getUniformLocation(program, "theta");
                break;
        }
    };

    //give whatever the current object is random colors on click
    document.getElementById("randomColor").onclick = function () {
        //have to check how many vertices there are so that you have the correct number of color vectors
        if (numVertices == 4) { 
            colors = [
                vec3(Math.random(), Math.random(), Math.random()),
                vec3(Math.random(), Math.random(), Math.random()),
                vec3(Math.random(), Math.random(), Math.random()),
                vec3(Math.random(), Math.random(), Math.random())
            ];
        } else if (numVertices == 3) {
            colors = [
                vec3(Math.random(), Math.random(), Math.random()),
                vec3(Math.random(), Math.random(), Math.random()),
                vec3(Math.random(), Math.random(), Math.random())
            ];
        };

        // Load the data into the GPU
        var cBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

        var vColor = gl.getAttribLocation(program, "vColor");
        gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vColor);
    };

    //use a slider to select the amount of red in the object
    document.getElementById("red").onchange = function (event) {
        //get the value of the slider
        const red = parseFloat(event.target.value);
        //have to check how many vertices there are so that you have the correct number of color vectors
        if (numVertices == 4) { 
            colors = [ //set the first value to whatever the value for red is but keep the rest the same
                vec3(red, colors[0][1], colors[0][2]),
                vec3(red, colors[1][1], colors[1][2]),
                vec3(red, colors[2][1], colors[2][2]),
                vec3(red, colors[3][1], colors[3][2])
            ];
        } else if (numVertices == 3) {
            colors = [
                vec3(red, colors[0][1], colors[0][2]),
                vec3(red, colors[1][1], colors[1][2]),
                vec3(red, colors[2][1], colors[2][2])
            ];
        };

        // Load the data into the GPU
        var cBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

        var vColor = gl.getAttribLocation(program, "vColor");
        gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vColor);
    };

    document.getElementById("green").onchange = function (event) {
        //get the value of the slider
        const green = parseFloat(event.target.value);
        //have to check how many vertices there are so that you have the correct number of color vectors
        if (numVertices == 4) {
            colors = [ //set the second value to whatever the value for green is but keep the rest the same
                vec3(colors[0][0], green, colors[0][2]),
                vec3(colors[1][0], green, colors[1][2]),
                vec3(colors[2][0], green, colors[2][2]),
                vec3(colors[3][0], green, colors[3][2])
            ];
        } else if (numVertices == 3) {
            colors = [
                vec3(colors[0][0], green, colors[0][2]),
                vec3(colors[1][0], green, colors[1][2]),
                vec3(colors[2][0], green, colors[2][2])
            ];
        };

        // Load the data into the GPU
        var cBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

        var vColor = gl.getAttribLocation(program, "vColor");
        gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vColor);
    };

    document.getElementById("blue").onchange = function (event) {
        //get the value of the slider
        const blue = parseFloat(event.target.value);
        //have to check how many vertices there are so that you have the correct number of color vectors
        if (numVertices == 4) {
            colors = [ //set the third value to whatever the value for blue is but keep the rest the same
                vec3(colors[0][0], colors[0][1], blue),
                vec3(colors[1][0], colors[1][1], blue),
                vec3(colors[2][0], colors[2][1], blue),
                vec3(colors[3][0], colors[3][1], blue)
            ];
        } else if (numVertices == 3) {
            colors = [
                vec3(colors[0][0], colors[0][1], blue),
                vec3(colors[1][0], colors[1][1], blue),
                vec3(colors[2][0], colors[2][1], blue)
            ];
        };

        // Load the data into the GPU
        var cBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

        var vColor = gl.getAttribLocation(program, "vColor");
        gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vColor);
    };

    // Initialize event handler (key codes)
    window.onkeydown = function (event) {
        var key = String.fromCharCode(event.keyCode);
        switch (key) {
            case 'D': //direction
            case 'd':
                direction = !direction;
                break;
            case 'F': //faster
            case 'f':
                speed += 0.025;
                break;
            case 'S': //slower
            case 's':
                speed -= 0.025;
                if (speed <= 0.0) {
                    speed = 0.0;
                }
                break;
            case 'L': //black
            case 'l':

                //set the colors to black depending on the number of vertices
                if (numVertices == 4) {
                    colors = [
                        vec3(0.0, 0.0, 0.0),
                        vec3(0.0, 0.0, 0.0),
                        vec3(0.0, 0.0, 0.0),
                        vec3(0.0, 0.0, 0.0)
                    ];
                } else if (numVertices == 3) {
                    colors = [
                        vec3(0.0, 0.0, 0.0),
                        vec3(0.0, 0.0, 0.0),
                        vec3(0.0, 0.0, 0.0)
                    ];
                };

                // Load the data into the GPU
                var cBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

                var vColor = gl.getAttribLocation(program, "vColor");
                gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
                gl.enableVertexAttribArray(vColor);

                break;
            case 'R': //red
            case 'r':

                //set the colors to red depending on the number of vertices
                if (numVertices == 4) {
                    colors = [
                        vec3(1.0, 0.0, 0.0),
                        vec3(1.0, 0.0, 0.0),
                        vec3(1.0, 0.0, 0.0),
                        vec3(1.0, 0.0, 0.0)
                    ];
                } else if (numVertices == 3) {
                    colors = [
                        vec3(1.0, 0.0, 0.0),
                        vec3(1.0, 0.0, 0.0),
                        vec3(1.0, 0.0, 0.0)
                    ];
                };

                // Load the data into the GPU
                var cBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

                var vColor = gl.getAttribLocation(program, "vColor");
                gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
                gl.enableVertexAttribArray(vColor);

                break;
            case 'G': //green
            case 'g':

                //set the colors to green depending on the number of vertices
                if (numVertices == 4) {
                    colors = [
                        vec3(0.0, 1.0, 0.0),
                        vec3(0.0, 1.0, 0.0),
                        vec3(0.0, 1.0, 0.0),
                        vec3(0.0, 1.0, 0.0)
                    ];
                } else if (numVertices == 3) {
                    colors = [
                        vec3(0.0, 1.0, 0.0),
                        vec3(0.0, 1.0, 0.0),
                        vec3(0.0, 1.0, 0.0)
                    ];
                };

                // Load the data into the GPU
                var cBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

                var vColor = gl.getAttribLocation(program, "vColor");
                gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
                gl.enableVertexAttribArray(vColor);

                break;
            case 'B': //blue
            case 'b':

                //set the colors to blue depending on the number of vertices
                if (numVertices == 4) {
                    colors = [
                        vec3(0.0, 0.0, 1.0),
                        vec3(0.0, 0.0, 1.0),
                        vec3(0.0, 0.0, 1.0),
                        vec3(0.0, 0.0, 1.0)
                    ];
                } else if (numVertices == 3) {
                    colors = [
                        vec3(0.0, 0.0, 1.0),
                        vec3(0.0, 0.0, 1.0),
                        vec3(0.0, 0.0, 1.0)
                    ];
                };

                // Load the data into the GPU
                var cBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

                var vColor = gl.getAttribLocation(program, "vColor");
                gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
                gl.enableVertexAttribArray(vColor);

                break;
        }
    };

    render();
};

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    if (direction == true) {
        theta += speed;
    } else {
        theta -= speed;
    }
    //use our uniform variable theta
    gl.uniform1f(thetaLoc, theta);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, numVertices);
    window.requestAnimFrame(render);
}