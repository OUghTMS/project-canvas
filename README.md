# Canvas 🎨

Canvas is a simple program for drawing lines and rectangles, with the ability to colorize elements in different colors.
HTML Canvas usage was restricted by task rules.

## 👨‍💻Stack

### Front-end:

- HTML/CSS
- ES6
- React.js

### 📚Extra Libraries:

- memoize-one (for optimization)
- jest (for testing)

## ✍️Description

To start the application, you need to upload a file with data for drawing. Then the file will be checked and rendered on the specified canvas. It is important to remember that an application can only execute commands familiar to it.

### 📌Template for proper execution:

C w h<br>
L x1 y1 x2 y2<br>
R x1 y1 x2 y2<br>
B x y c<br>

- Canvas (C): creates a canvas of width w and height h.
- Line (L): draws a line from (x1, y1) to (x2, y2), using a pseudo-graphic for drawing character “x”. Only horizontal and vertical lines are supported.
- Rectangle (R): creates a rectangle with an angle at (x1, y1) and an opposite angle at (x2, y2). The vertical and horizontal lines are drawn with pseudographic “x” characters.
- Bucket Fill (B): fills the entire area (x, y) with color ("color", c), similar to the way the "Fill" tool works in graphic editors.

### 💡Remarks:

- There is a folder (examples) in the repository with several valid input files for drawing.
- In case of an unknown command or invalid arguments for drawing, the application will display errors.

## 👀Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Runs the tests for app.<br>
The test will run if you make edits.

## 🛀Author
- Github: [@OUghTMS](https://github.com/OUghTMS) 
