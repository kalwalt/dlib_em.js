#include <emscripten.h>
#include <image_example.h>

extern "C" {

    void transformImage(const std::string &file) {
        transform_image(file);
    };
    void transformLoadData(){
        std::vector<unsigned char> data(12, 1);
        transform_load_data(2, 2, data);
    };
};

#include "bindings.cpp"