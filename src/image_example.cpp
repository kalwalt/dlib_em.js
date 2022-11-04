#include "include/image_example.h"

void transform_image(const std::string& file) {
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
};

void transform_load_data(int rows, int cols, std::vector<unsigned char>& data){
  array2d<rgb_pixel> img(rows, cols);
  //rgb_pixel pix(255, 0, 0);
  int i = 0;
  for (auto r = 0; r < rows; r++){
    for (auto c = 0; c < cols; c++){
      img[r][c].red = data[i];
      img[r][c].green = data[i + 1];
      img[r][c].blue = data[i + 2];
      i++;
    }
  }
  //img[0][0] = pix;
  std::cout << (int)img[0][0].red << std::endl;
}