#include <cstdint>
#include <emscripten.h>
#include <emscripten/val.h>
#include <image_example.h>
#include <vector>

using namespace emscripten;

extern "C" {

void transformImage(const std::string &file) { transform_image(file); };

val transformLoadData(int rows, int cols, val data) {
  std::vector<unsigned char> u8;
  u8 = convertJSArrayToNumberVector<unsigned char>(data);
  auto out = transform_load_data(rows, cols, u8);
  std::cout << out.size() << std::endl;

  val view{typed_memory_view(out.size(), reinterpret_cast<unsigned char*>(image_data(out)))};
  auto result = val::global("Uint8Array").new_(out.size());
  result.call<void>("set", view);
  return result;
};
};

#include "bindings.cpp"