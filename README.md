##:bangbang:

Now that I think of it more, I do not think it is needed — you should just mixin the classes from `bootstrap.css`.  
So disregard everyhing below (and this project).

##Overview

The purpose of this project is to provide one single `bootstrap.less`.  

LESS seems to be the only reasonable way to use Bootstrap (e.g. see http://ruby.bvision.com/blog/please-stop-embedding-bootstrap-classes-in-your-html). But Bootstrap only provides combined `bootstrap.css` — LESS files are componentized.

While that is useful for Bootstrap development, for projects using Bootstrap it is more of nuisance (especially since I do not really use Bower). So here is that single file.

##Disclaimer
I am hardly an expert on node.js, so I am pretty sure a lot of things are done incorrectly here.  
E.g. `bundler.js` should be in a `Gruntfile` instead.

Please feel free to improve those and raise pull requests, or just create issues. I appreciate education.

##Copyrights
###Bootstrap
Copyright 2013 Twitter, Inc under [the Apache 2.0 license](https://github.com/twbs/bootstrap/blob/master/LICENSE).
