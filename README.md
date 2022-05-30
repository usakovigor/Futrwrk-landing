# 133T Early Access landing page

Follow the below instructions to get started.

## Installation

As a tool for getting the application packed and minified, we use gulp.

#### Gulp installation:

1. Make sure you have `node` and `npm` installed

```
node --version
npm --version
```

2. Install the `gulp` command line utility.

```
npm install --global gulp-cli
```

If you meet any issues while installing gulp, please follow
the [link to Gulp documentation](https://gulpjs.com/docs/en/getting-started/quick-start/)

After gulp is installed successfully, we can run our project.

#### Running project

1. Install all required dependencies.

```
npm install
```

2. Use gulp command to start server

```
gulp
```

Server is running on `http://localhost:3000`

##### Additional abilities

**If you need only to build an application**, you can run a separate build task (All available gulp tasks you can check in [gulpfile.js](gulpfile.js) from 92 line)
```
gulp build
```
**It will create a dist folder with packed and minimized files, which you can deploy.**
