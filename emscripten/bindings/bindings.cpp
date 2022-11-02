#include <emscripten/bind.h>

using namespace emscripten;

EMSCRIPTEN_BINDINGS(dlib_em) { function("transformImage", &transformImage); };
