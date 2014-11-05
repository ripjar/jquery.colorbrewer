jquery.colorbrewer
==================

A simple bootstrap colour picker utilising the [ColorBrewer][1] scales.

![Colors](http://i.imgur.com/R4NLaff.png)


## Usage

    this.$('.color-picker').colorBrewer({
      container: '#color-picker-modal',        // selector or modal element
      colors: colorbrewer,                     // colour swatches
      preview: this.$('.color-picker-preview') // selector element to populate with selected colour for preview
    });

The example utilises the ColorBrewer JavaScript collection provided by [mbostock][2] [here][3].

[1]: http://colorbrewer2.org/
[2]: https://github.com/mbostock
[3]: https://raw.githubusercontent.com/mbostock/d3/master/lib/colorbrewer/colorbrewer.js
