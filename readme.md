# USING GULP

In this project, I used the task runner Gulp to prepare a front-end website for deployment. The meat of the work I did can be seen in the gulpfile.js file.

This project was done in conjunction with my TeamTreehouse full-stack JavaScript TechDegree, as the eighth project of twelve. I was provided with the project files in the src directory and instructed to prepare these files for deployment and to find appropriate Gulp modules on npm. Gulp compiles the SCSS files into CSS, concatenates and minifies the JS and CSS files, creates associated map files for the JS and CSS files, optimizes the image files, dynamically changes elements and source properties of various elements in the HTML file to be compatible with the modified project files, and starts a development server to serve the modified project files. All files created through this process are placed into the dist directory. Gulp then watches for changes to any of the SCSS files in the src directory, automatically updates the changes to the files in the dist directory, and if the project is being viewed in a browser, automatically reloads the page, displaying the changes.

## Installation:

With npm and node.js installed on your computer and the project files downloaded, use `npm install` to download all of the project's dependencies.

**NOTE:** This project utilizes Gulp version 3.9.1, as it was the default npm release at the time I completed this project. This project will not work with Gulp versions 4.0.0 and above, mainly due to the deprecation of the gulp.start() method. However, there may be other small changes necessary to enable this project to be compatible with newer versions of Gulp.

## Usage:

Use `gulp copy` to copy the contents of the icons directory in the src directory to the directory of the same name in the dist directory.

Use `gulp scripts` to concatenate and minify the JS files, create an associate map file, rename the new JS file, and place the new JS and map files into the dist directory.

Use `gulp styles` to compile the SCSS files in a global CSS file, minify the global CSS file, create an associated map file, rename the new CSS file, and place the new CSS and map files into the dist directory. This task also includes a reload method for the development server that automatically reloads the server upon changes to the underlying source files.

Use `gulp images` to compress the jpg and png files in the images directory and place the newly compressed files into the dist directory.

Use `gulp html` to modify the src paths for the CSS link, script tag and img tags in the HTML file, and place the modified HTML file into the dist directory.

Use `gulp clean` to delete the contents of the dist folder, effectively removing all files modified through the above Gulp tasks.

Use `gulp build` to first execute the clean task above, and to then execute the scripts, styles, images and copy tasks above.

Use `gulp connect` to first execute the html task above, and to then start a local server to serve the project from the dist directory.

Use `gulp watch` to watch for any changes to the SCSS/SASS source files. Upon any change followed by a save, this task executes the styles task above, automatically updating the associated files in the dist directory, and if the project is being viewed in a browser, automatically refreshes the page.

Use `gulp` to execute the default task, which first executes the build task above, then executes the connect and watch tasks above.
