d3x
===

A object-oriented charting library based on d3.

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
            .title("My Horizontal Bar")
            .colors("darkorange", "lightgray", "dimgray", "#333")
            .refresh(5000)
            .vbar();
            
Demo
-----
[Click here to view a live demo](http://lyroyce.github.io/d3x/)

API
-----
- Data

    - **data(data, dataLoaded)**

        Sets the dataset of the chart. `data` could be an array, a function that returns an array, or an Web Service endpoint that returns a JSON array. `dataLoaded` is an optional function used to receive and process the real data array each time the chart is refreshed.

    - **name(getNameFunc)**

        Sets the conversion function of data name, which is used to get the name of each data element.

    - **value(getValueFunc)**

        Sets the conversion function of data value, which is used to get the value of each data element.

- Position & Size

    - **appendTo(parent)**
        
        Appends the chart to the HTML element specified by `parent` selector.

    - **prependTo(parent)**

        Prepends the chart to the HTML element specified by `parent` selector.

    - **size(width, height)**

        Sets the width and height of the chart.

    - **margin(top, right, bottom, left)**

        Sets the base margin of the chart. The actual margin will be calculated when rendered.

- Display & Effect

    - **color(chartColor, axisColor, tickTextColor, LabelColor)**
    
        Sets the color of the chart. `chartColor` default to `darkorange`, other colors default to `black`.

    - **title(title)**

        Sets the title of the chart.
        
    - **ratio(ratio)**

        Sets the display ratio of the chart.
        
    - **nameAxis(tickEnabled, label)**

        Displays name axis and set the tick and label of the axis.
        
    - **valueAxis(tickEnabled, label)**

        Displays value axis and set the tick and label of the axis.
        
    - **refresh(interval)**

        Redraws the chart after the specified interval. Dataset will be reloaded before each redraw.
        
- UI Elements

    - **elements()**
        
        Selects the element groups corresponding to current dataset.
        
    - **selectAll(selector)**
        
        Selects all elements that match the specified selector.
        
    - **select(selector)**
    
        Selects the first element that matches the specified selector.
        
    - **append(selector)**
    
        Appends a new element with the specified name as the last child of the chart.
    
    - **insert(selector, before)**
    
        Inserts a new element with the specified name before the element matching the specified before selector.
        
- Events

    - **click(function(name, value, event))**
    
        Adds a listener for click event.
   
- Chart Type     
    
    Please note that Chart Type API has to be called at the end of the method chain.

    - **hbar()**
        
        Renders a horizontal bar chart.
        
    - **vbar()**
    
        Renders a vertical bar chart.
        
    - **line()**
    
        Renders a line chart.
        
