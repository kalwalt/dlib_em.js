#include <emscripten.h>
#include <image_example.h>
#include <emscripten/val.h>

using namespace emscripten;

extern "C" {

    void transformImage(const std::string &file) {
        transform_image(file);
    };
    void transformLoadData(int rows, int cols, val data){
        //std::vector<unsigned char> data(12, 1);
        std::vector<unsigned char> u8;
        u8 = emscripten::convertJSArrayToNumberVector<unsigned char>(data);
        transform_load_data(rows, cols, u8);
    };
};

#include "bindings.cpp"