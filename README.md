## Website Performance Optimization portfolio project

### Running the project

####Part 1: Optimize PageSpeed Insights score for index.html

1. Copy the URL http://tbelunis.github.io/FENDProject4/build/index.html and run it through [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)

Optimizations:
* Used gulp-image-resize and imagemin-jpeg-recompress in a gulp task to reduce the size and compress the file pizzeria.jpg to optimize the download of the image.
* Minified and inlined the stylesheet style.css.
* Added the attribute media="print" to the link for the stylesheet print.css so it will only be downloaded when printing.
* Loaded the Javascript file perfmatters.js asynchronously
* Loaded the web font asynchronously as demonstrated at http://github.com/typekit/webfontloader.

####Part 2a: Optimize Frames per Second in pizza.html

1. Open the URL http://tbelunis.github.io/FENDProject4/build/views/pizza.html in the Chrome browser.
2. Open the Developer Tools and select Timeline.
3. Hit the record button and scroll the screen for a few seconds to move the pizzas.
4. Hit the record button again to stop scrolling.
5. Observe the output in the Timeline.

Optimizations:
* Removed the calculation of the items and count of items out of updatePositions so they were not calculated every time throught the function.
* Created global variables to hold the items and itemsCount and initialized their value in the DOMContentLoaded event handler.

####Part 2b: Optimize resizing pizzas in pizza.html

1. Open the URL http://tbelunis.github.io/FENDProject4/build/views/pizza.html in the Chrome browser.
2. Open the Developer Tools and select Console.
3. Use the slider to resize the pizzas.
4. Observe the console output for the time it took to resize the pizzas.

Optimizations:
* Took the vars out of the for loop.
* Used document.getElementsByClassName to get the array of pizza elements
* Created a var to hold the length of the array of pizza elements
* Since all the pizzas are the same size, determined dx and newwidth from the first pizza element in the array
* Since we had an array of pizza elements there was no need to find them again before executing the for loop.