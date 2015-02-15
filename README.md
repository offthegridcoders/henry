# Henry - Static HTML Generator

## Part of Off The Grid Coders

#### Dependancies
`sudo npm install`
`gem install scss-lint`

#### Builds Static Website
>Lints, Compiles Sass, Minifies CSS, JS and Images / And builds html files from partials and templates
`gulp`

#### How to use
`gulp`
>This will build your files into a dist folder and then watches for changes. When a scss, js, html or images are changed or added, your site will be automatically recompiled.

`gulp build`
>This does the same as above, but also minifies images and doesn't watch

#### How to start
> There are already some basic stuff in this build.  An index page as well as a subdirectory 'about'.  Small scss changes and one vendor library (normalize). These are here to get you started.

##### Structure
> assets: all your images
> js: all your js files (you can keep them in one directory, or subdirectories)
> partials: these are used with template files so that you can include portions of code throughout your site without having to make changes on each page. Specially useful for the <head> section, or navigation bars...
> scss: this is where you keep your sass files and vendor css files
> templates: these are you main html files that use partials to help construct them