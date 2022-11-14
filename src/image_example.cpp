#include "include/image_example.h"

array2d<unsigned char> transform_image(const std::string &file) {
  array2d<rgb_pixel> img;
  load_image(img, file);
  array2d<unsigned char> blurred_img;
  gaussian_blur(img, blurred_img);

  // Now find the horizontal and vertical gradient images.
  array2d<short> horz_gradient, vert_gradient;
  array2d<unsigned char> edge_image;
  sobel_edge_detector(blurred_img, horz_gradient, vert_gradient);

  // now we do the non-maximum edge suppression step so that our edges are nice
  // and thin
  suppress_non_maximum_edges(horz_gradient, vert_gradient, edge_image);
  return edge_image;
};