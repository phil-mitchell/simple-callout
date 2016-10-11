# Simple Callout
[![Build status][travis-badge]][travis-url] [![Bower dependencies][bowerdeps-badge]][bowerdeps-url] ![Version][bower-badge] ![Size][size-badge]
<br/>[![Cross browser test status][browser-badges]][travis-url]

A simple, style-agnostic callout box that can be shown and hidden from any position.

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

### Note for cross-browser support

You will need to include the [Web Components Polyfill][webcomponents] for all non-chrome browsers.

For IE 10-11 support you should also include a Promise polyfill, like [es6-promise][promise]

--

## Options

Property         | Type    | Default | Description                                                                                                                                 
---------------- | ------- | ------- | ------------                                                                                                                                
`active`         | Boolean | `false` | Controls whether the callout is visible or not                                                                                              
`arrow`          | String  | `''`    | The position of the arrow on the callout (also sets where the callout expands from). Can be any combination of top/bottom/left/right/center 
`noOutsideClick` | Boolean | `false` | Disable closing the callout on outside clicks                                                                                               
`noEscape`       | Boolean | `false` | Disable closing the callout on escape key presses                                                                                           

```html
<simple-callout arrow="bottom center" no-escape></simple-callout> 
```

## Methods

Method     | Arguments | Description                          
---------- | --------- | ------------                         
`open()`   | `none`    | Utility method to open the callout   
`close()`  | `none`    | Utility method to close the callout  
`toggle()` | `none`    | Utility method to toggle the callout 

## Styling
In addition to styling the callout directly, you can also set these CSS properties

Property                      | Default            | Description                 
----------------------------- | ------------------ | ------------                
`--simple-callout-arrow-size` | `0.75rem`          | Size of the callout's arrow 

Apply properties on simple-callout

```css
simple-callout {
  --simple-callout-arrow-size: 12px;
}
```

--

MIT © [Simpla](https://www.simpla.io)

[webcomponents]: https://github.com/webcomponents/webcomponentsjs
[promise]: https://github.com/stefanpenner/es6-promise

[bower-badge]: https://img.shields.io/bower/v/simple-callout.svg
[bowerlicense-badge]: https://img.shields.io/bower/l/simple-callout.svg
[travis-badge]: https://img.shields.io/travis/SimpleElements/simple-callout.svg
[travis-url]: https://travis-ci.org/SimpleElements/simple-callout
[bowerdeps-badge]: https://img.shields.io/gemnasium/SimpleElements/simple-callout.svg
[bowerdeps-url]: https://gemnasium.com/bower/simple-callout
[size-badge]: https://badges.herokuapp.com/size/github/SimpleElements/simple-callout/master/simple-callout.html?gzip=true&color=blue
[browser-badges]: https://badges.herokuapp.com/travis/SimpleElements/simple-callout/sauce/SimpleElements?labels=none
