# ngVk

[![Bower](https://img.shields.io/bower/l/bootstrap.svg)]()

![ngVk logo](https://raw.githubusercontent.com/shekspir55/ngVk/master/ngVk.png)


This is simple vk.com angular wrapper. Compatible with [ui.router](https://github.com/angular-ui/ui-router).

View [demo](http://shekspir55.github.io/ngVk/) here.

In this version only comments avialable.

You can install with just cloning this repo or via bower.

`bower install ngVk --save`

You can generate your App id(vkAppId) here https://vk.com/dev/Comments.

```js
//Add 'ngVk' to your module list of dependencies.
var app = angular.module('yourApp', [
	'ngVk'
]);
//Add vk.com app id
var yourVkAppId = '42';
app.value('vkAppId', yourVkAppId);

````

```html
    <vk-comments></vk-comments>
```
Then simply put this to your html. Good luck.

# OPTIONS
List of attributes can be used.
* `url` (not required) Input identifier for comment-box, by default it's value refers to page url.
