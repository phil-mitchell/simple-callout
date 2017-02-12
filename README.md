# Simple Callout
[![Build status][travis-badge]][travis-url] [![Bower dependencies][bowerdeps-badge]][bowerdeps-url] ![Version][bower-badge] ![Size][size-badge] [![Published][webcomponents-badge]][webcomponents-url]

A simple, (very) lightweight, style-agnostic callout box that can be shown and hidden from any position.

<!---
```
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="../iron-icons/iron-icons.html">
    <link rel="import" href="simple-button.html">
    <style>
       body {
        font-family: sans-serif;
      }

      button {
        display: block;
      }

      simple-callout {
        padding: 0.75em;
        margin: 12px;
        font-size: 14px;
      }
    </style>
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<button id="button">toggle callout</button>

<simple-callout id="callout" origin="top left" arrow>
  <span>an example callout</span>
</simple-callout>

 <script>
  var callout = document.querySelector('#callout'),
      button = document.querySelector('#button');

  button.addEventListener('click', function() {
    callout.active = true;
  });
</script>
```

## Installation & usage

Install simple-callout with Bower

```sh
$ bower install simple-callout --save
```

Import it into the `<head>` of your page

```html
<link rel="import" href="/bower_components/simple-callout/simple-callout.html">
```

Then use simple-callout in your project

```html
<simple-callout arrow="top left">
  <span>My callout contents</span>
</simple-callout>
```

To ensure that the content inside the callout is layered on top of the callout's arrow, always use elements rather than just text nodes (eg: `<span>text</span>` instead of `text`);

To open/close the callout, toggle its `active` property

```js
var callout = document.querySelector('simple-callout');

// Open callout
callout.active = true;

// Close callout
callout.active = false;
```

### Polyfills for cross-browser support

Simple callout relies on emerging web standards, and you'll need to include the [Web Components Lite][webcomponents] polyfill for full cross-browser support:

```shell
bower install webcomponentsjs --save
```

```html
<script src="/bower_components/webcomponentsjs/webcomponents-lite.js"></script>
```

--

## Options

Property         | Type    | Default     | Description                                                                                               
---------------- | ------- | ----------- | ------------                                                                                              
`active`         | Boolean | `false`     | Whether the callout is open or not
`origin`         | String  | `undefined` | The origin position that the callout expands from. Can be any combination of top/bottom/left/right/center 
`arrow`          | Boolean | `false`     | Whether the callout has a little arrow at its origin                                                      
`noBlur`         | Boolean | `false`     | Disable closing the callout when it loses focus                                                             
`noEscape`       | Boolean | `false`     | Disable closing the callout on escape key presses                                                         

Properties can either be set as attributes on the element, or imperitively with Javascript
```html
<simple-callout origin="bottom center" arrow no-escape></simple-callout> 

<script>
  document.querySelector('simple-callout').noBlur = true;
</script>
```

## Styling
In addition to styling the callout directly, you can also set these CSS properties

Property                      | Default  | Description                 
----------------------------- | ---------| ------------                
`--simple-callout-arrow-size` | `8px`    | Size of the callout's arrow 

Apply properties on simple-callout

```css
simple-callout {
  --simple-callout-arrow-size: 12px;
}
```

--

MIT © [Simpla](https://www.simpla.io)

[webcomponents]: https://github.com/webcomponents/webcomponentsjs
[webanimations]: https://github.com/web-animations/web-animations-js
[promise]: https://github.com/stefanpenner/es6-promise

[bower-badge]: https://img.shields.io/bower/v/simple-callout.svg
[bowerlicense-badge]: https://img.shields.io/bower/l/simple-callout.svg
[travis-badge]: https://img.shields.io/travis/SimpleElements/simple-callout.svg
[travis-url]: https://travis-ci.org/SimpleElements/simple-callout
[bowerdeps-badge]: https://img.shields.io/gemnasium/SimpleElements/simple-callout.svg
[bowerdeps-url]: https://gemnasium.com/bower/simple-callout
[size-badge]: https://badges.herokuapp.com/size/github/SimpleElements/simple-callout/master/simple-callout.html?gzip=true&color=blue
[webcomponents-badge]: https://img.shields.io/badge/webcomponents.org-published-blue.svg
[webcomponents-url]: https://www.webcomponents.org/element/SimpleElements/simple-callout
