<p align="center">
  <a href="https://github.com/TianlunXiong/DataStore" target="_blank">
    <img width="100"src="https://github.com/TianlunXiong/DataStore/blob/master/build/icons/256x256.png?raw=true">
  </a><br>
</p>

<center><font size=10 color="#00BFA5">DataStore</font></center>
<center>

![GitHub release](https://img.shields.io/badge/version-0.1.0-teal.svg?longCache=true&style=flat)

</center>
<center>A Visual development-tool of creating mocked Json</center>

## Build and Dev Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

# lint all JS/Vue component files in `src/`
npm run lint

```

---
## User Guide
* Start development server
  In the Server Port field, you can type a Port not occupied, then choose a language. Finally open the Server by clicking the circle on the bottom left. If the Server was initiated successfully, the circle on the top right will be change.
* Change your image
  An Image URL field will be displayed by double clicking the image, then type a image's URL and double click the image again to show the new image.
<center>
<img src="https://github.com/TianlunXiong/myStaticResource/blob/master/1.JPG?raw=true">
</center>

---

* Create key-value pairs
  In the factory of creator, the name of key-value pairs can be edited in the Name field. If you want to add a key-value pair, type a key in the Key field and click + button. A new key will be added to the key-value pairs, what to do next is choosing a value, including primary and advanced types. Then, click the save button on the botton left to save the key-value pair. Finally, when you complete each key-value pair, click the check button on the top right to save the whole key-value pairs.
<center>
<img src="https://github.com/TianlunXiong/myStaticResource/blob/master/2.JPG?raw=true">
</center>

---

* Inspect key-value pairs
  In the dStore of creator, all the key-value pairs are shown in the data list. User can edit each key-value paris by clicking their name button and delete one by the red close button on the right.

<center>
<img src="https://github.com/TianlunXiong/myStaticResource/blob/master/3.JPG?raw=true">
</center>

---

* Get the data
> http://localhost:{{port your type in the first step, e.g  9090}}/?name={{the name of key-value pairs you want}}

<img src="https://github.com/TianlunXiong/myStaticResource/blob/master/4.JPG?raw=true">