# Simple Callout
[![Build status][travis-badge]][travis-url] ![Size][size-badge] [![Version][tag-badge]][releases-url] [![Published][webcomponents-badge]][webcomponents-url]

A featherweight, style-agnostic callout bubble UI component. Built on Web Components.

<!---
```
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="simple-callout.html">
    <style>
      body {
        font-family: sans-serif;
        color: #303c46;
      }

      button {
        display: block
      }

      simple-callout {
        margin: 10px 0 20px;
        padding: 0.5em 1em;
        font-size: 0.85em;
      }
    </style>
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<button id="btn">open callout</button>

<simple-callout origin="top center" arrow>
  <span>callout</span>
</simple-callout>

<script>
  const callout = document.querySelector('simple-callout'),
        button = document.querySelector('#btn');

  button.addEventListener('click', () => callout.active = true);
</script>
```

### Contents

- [Installation & usage](#installation--usage)
    - [Polyfills for cross-browser support](#polyfills-for-cross-browser-support)
    - [Transpiling for IE11 support](#transpiling-for-ie11-support)
- [Options](#options)
- [Styling](#styling)


## Installation & usage

Install simple-callout with Bower

```sh
$ bower i SimpleElements/simple-callout --save
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

To open and close the callout, toggle its `active` property

```js
var callout = document.querySelector('simple-callout');

// Open callout
callout.active = true;

// Close callout
callout.active = false;
```


### Polyfills for cross-browser support

simple-callout relies on emerging standards, for full cross-browser support include the [WebComponentsJS](https://github.com/webcomponents/webcomponentsjs) polyfill on your page.

```html
<script src="https://unpkg.com/@webcomponents/webcomponentsjs@^1.0.0/webcomponents-loader.js"></script>
```

### Transpiling for IE11 support

Web Components like simple-callout are distributed as ES6 classes, which are supported in all evergreen browsers. To support Internet Explorer 11 you should transpile simple-callout to ES5 and use the `webcomponentsjs` `custom-elements-es5-adapter.js` shim. 

The easiest way to do this is by including [polymer-build][polymer-build] in your buildstep of choice. Then just include the ES5 adapter on your page

```html
<script src="https://unpkg.com/@webcomponents/webcomponentsjs@^1.0.0/custom-elements-es5-adapter.js"></script>
```

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

***

MIT © [Sean King](https://twitter.com/seaneking)

[tag-badge]: https://img.shields.io/github/tag/SimpleElements/simple-callout.svg
[releases-url]: https://github.com/SimpleElements/simple-callout/releases
[travis-badge]: https://img.shields.io/travis/SimpleElements/simple-callout.svg
[travis-url]: https://travis-ci.org/SimpleElements/simple-callout
[size-badge]: http://img.badgesize.io/SimpleElements/simple-callout/master/simple-callout.html?compression=gzip&label=size%20%28unminified%29
[webcomponents-badge]: https://img.shields.io/badge/webcomponents.org-published-blue.svg
[webcomponents-url]: https://www.webcomponents.org/element/SimpleElements/simple-callout
[polymer-build]: https://github.com/Polymer/polymer-build
