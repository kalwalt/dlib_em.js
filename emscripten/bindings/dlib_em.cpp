#include <emscripten.h>
#include <image_example.h>

extern "C" {

    void transformImage(const std::string &file) {
        transform_image(file);
    };
};

#include "bindings.cpp"