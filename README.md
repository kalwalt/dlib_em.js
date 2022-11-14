# dlib_em.js

A testing repository to port [dlib](https://github.com/davisking/dlib) to WASM thanks to emscripten. 

## Examples

Go to example folder, start a http server and try `example.html`. The example load a simple RGB jpeg image and return a modified version with a sobel filter applied.

## Build

If you make some changes/improves to the C++ code you need to rebuild the project. You need cmake for this.
In a terminal run the build script:
`./build.sh`