d3x
===

A chart library based on d3.

Example
-------
- Create a default horizontal bar chart under HTML `body`.

        var hbar = new d3x("body")
            .data(["61","9","43","31","17"])
            .hbar();

- Create a custom vertical bar chart, and prepend to HTML `body`. 

        var vbar = new d3x().prependTo("body")
            .data([{name:'a',count:12},{name:'b',count:10},{name:'c',count:22},{name:'d',count:15}])
            .name(function(d,i){return d.name;})
            .value(function(d,i){return d.count;})
            .nameAxis(true, 'Name')
            .valueAxis(true, 'Count')
            .margin(50, 20, 50, 50)
            .title("My Horizontal Bar")
            .colors("orange")
            .refresh(5000)
            .vbar();
            
Demo
-----
[Click here to view a live demo](http://lyroyce.github.io/d3x/)

API
-----
- **appendTo(parent)**
- **prependTo(parent)**
- **marginLeft(left)**
- **size(width, height)**
- **margin(top, right, bottom, left)**
- **marginTop(top)**
- **marginRight(right)**
- **marginBottom(bottom)**
- **marginLeft(left)**

- **data(data)**
- **name(getNameFunc)**
- **value(getValueFunc)**

- **color(colorArray)**
- **title(title)**
- **ratio(ratio)**
- **nameAxis(tickEnabled, label)**
- **valueAxis(tickEnabled, label)**
- **refresh()**

- **elements()**
- **selectAll(selector)**
- **select(selector)**
- **append(selector)**
- **insert(selector, before)**
- **selectOrAppend(selector, append, before)**

- **hbar()**
- **vbar()**
- **line()**
