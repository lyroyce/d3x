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
- Data

    - **data(data)**

        Set the dataset of the chart. `data` could be an array, a function that returns an array, or an URL that returns a JSON array.

    - **name(getNameFunc)**

        Set the conversion function of data name, which is used to get the name of each data element.

    - **value(getValueFunc)**

        Set the conversion function of data value, which is used to get the value of each data element.

- Position & Size

    - **appendTo(parent)**
        
        Append the chart to the HTML element specified by `parent` selector.

    - **prependTo(parent)**

        Prepend the chart to the HTML element specified by `parent` selector.

    - **size(width, height)**

        Set the width and height of the chart.

    - **margin(top, right, bottom, left)**

        Set the margin of the chart.

    - **marginTop(top)**

        Set the margin of the chart.

    - **marginRight(right)**

        Set the margin of the chart.

    - **marginBottom(bottom)**

        Set the margin of the chart.

    - **marginLeft(left)**

        Set the margin of the chart.

- Display & Effect

    - **color(color)**
    
        Set the color of the chart. `color` could be CSS color or an array of CSS color.

    - **title(title)**

        Set the title of the chart.
        
    - **ratio(ratio)**

        Set the display ratio of the chart.
        
    - **nameAxis(tickEnabled, label)**

        Display name axis and set the tick and label of the axis.
        
    - **valueAxis(tickEnabled, label)**

        Display value axis and set the tick and label of the axis.
        
    - **refresh(interval)**

        Redraw the chart after the specified interval. Dataset will be reloaded before each redraw.
        
- UI Elements

    - **elements()**
        
        Select the element groups corresponding to current dataset.
        
    - **selectAll(selector)**
        
        Selects all elements that match the specified selector.
        
    - **select(selector)**
    
        Selects the first element that matches the specified selector.
        
    - **append(selector)**
    
        Appends a new element with the specified name as the last child of the chart.
    
    - **insert(selector, before)**
    
        Inserts a new element with the specified name before the element matching the specified before selector.
   
- Chart Type     

    - **hbar()**
        
        Render a horizontal bar chart.
        
    - **vbar()**
    
        Render a vertical bar chart.
        
    - **line()**
    
        Render a line chart.
        
