#include "include/image_example.h"

/* This example was taken by dlib exmples https://github.com/davisking/dlib/blob/master/examples/image_ex.cpp 
   For more informations refer to comments in that. 
   In this case we simply load a jpeg image and apply a gaussian filter and a sobel edge detector.
   The result of image processing is returned outside the function. See transformImage in dlib_em.cpp how is handled.
*/
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