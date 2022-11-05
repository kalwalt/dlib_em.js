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

std::vector<unsigned char> transform_load_data(int rows, int cols, std::vector<unsigned char>& data) {
  array2d<rgb_pixel> img(rows, cols);
  //array2d<rgb_pixel> img(rows, cols);
  //rgb_pixel pix(255, 0, 0);
  int i = 0;
  // this is not correct. Look at dlib/image_loader/jpeg_loader.h
  for (auto r = 0; r < rows; r++){
    for (auto c = 0; c < cols; c++){
      img[r][c].red = data[i*4];
      img[r][c].green = data[i * 4 + 1];
      img[r][c].blue = data[i * 4 + 2];
      //img[r][c].alpha = data[i + 3];
      i++;
    }
  }
  //img[0][0] = pix;
  std::cout << (int)img[0][0].red << std::endl;
  array2d<unsigned char> blurred_img;
  gaussian_blur(img, blurred_img);
  std::cout << (int)blurred_img[0][0] << std::endl;

  std::vector<unsigned char> out(rows*cols, 0);

for (auto r = 0; r < rows; r++){
    for (auto c = 0; c < cols; c++){
      out[i] = blurred_img[r][c];
      //out[i * 4] = blurred_img[r][c];
      //out[i * 4 + 1] = blurred_img[r][c];
      //out[i * 4 + 2] = blurred_img[r][c];
      //out[i * 4 + 3] = blurred_img[r][c];
      //std::cout << (int)blurred_img[r][c] << std::endl;
      //std::cout << (int)out[i] << std::endl;
      i++;
    }
  }
  return out;
}