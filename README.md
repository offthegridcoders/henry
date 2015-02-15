# Henry - Static HTML Generator

## Part of Off The Grid Coders

>Lints, Compiles Sass, Minifies CSS, JS and Images / And builds html files from partials and templates

#### How to start

Create a new directory for your project by typing these commands:

`git clone https://github.com/theWickedWebDev/henry.git <name-of-your-project>`

This will create a directory with all the files you need, as well as a very basic site already made.

`cd <name-of-your-project>`

`<sudo> npm install`

`gem install scss-lint`

> There are already some basic stuff in this build.  An index page as well as a subdirectory 'about'.  Small scss changes and one vendor library (normalize). These are here to get you started.

#### Commands
`gulp`
>This will build your files into a dist folder and then watches for changes. When a scss, js, html or images are changed or added, your site will be automatically recompiled. Just hit refresh on your browser to see the changes.

`gulp build`
>This does the same as above, but also minifies images and doesn't watch. Used for when you are ready to deploy your code.

##### Structure
- `/src`: folder where you make changes
  + `/assets`: all your images, videos, etc...
  + `/js`: all your script files (you can keep them in one directory, or subdirectories)
  + `/partials`: these are used with template files so that you can include portions of code throughout your site without having to make changes on each page. Specially useful for the head section, or navigation bars...
  + `/scss`: this is where you keep your sass files and vendor css files
  + `/templates`: these are your main html files that use partials to help construct them
- `/dist`: this folder gets erased and rebuilt with every change. Do not make changes here, you will lose them.

#### Contact
> Please feel free to contact me with any questions, or if you would like to help make this project better!