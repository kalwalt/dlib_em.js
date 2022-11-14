#include <cstdint>
#include <emscripten.h>
#include <emscripten/val.h>
#include <image_example.h>
#include <vector>

using namespace emscripten;

extern "C" {

val transformImage(const std::string &file) {
  auto out = transform_image(file);
  val view{typed_memory_view(
      out.size(), reinterpret_cast<unsigned char *>(image_data(out)))};
  auto result = val::global("Uint8Array").new_(out.size());
  result.call<void>("set", view);
  return result;
};
};

#include "bindings.cpp"