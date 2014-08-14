//vbar
var vbar = new d3x(".wrapper > section")
    .size("100%",400)
    .data(["61","9","43","31","17"])
    .title("Vertical Bar Chart")
    .vbar();
//hbar
var hbar = new d3x(".wrapper > section")
    .size("100%",400)
    .data([{"name":"2012", "value": 61},{"name":"2013", "value": 75},{"name":"2014", "value": 99}])
    .name(function(d,i){return d.name;})
    .value(function(d,i){return d.value;})
    .nameAxis().valueAxis()
    .title("Horizontal Bar Chart with Axises")
    .hbar();
//line
var line = new d3x(".wrapper > section")
    .size("100%",400)
    .data([{"name":"Jan", "value": "61"},{"name":"Feb", "value": "75"},{"name":"Mar", "value": "99"},{"name":"Apr", "value": "93"},{"name":"May", "value": "125"}])
    .name(function(d,i){return d.name;})
    .value(function(d,i){return +d.value;})
    .nameAxis(true, "Name")
    .valueAxis(true, "Value")
    .title("Line Chart with Axises/Ticks/Labels")
    .line();
//custom
var dataFunc = function(){
    var numValues = Math.random() * 5,
        dataset = [];
    for (var i = 0; i < numValues; i++) {
        var newNumber = Math.floor(Math.random() * 25);
        dataset.push({index:i, count:newNumber});
    }
    return dataset;
}
var chart = new d3x().appendTo(".wrapper > section")
    .size("100%",400)
    .data(dataFunc)
    .name(function(d,i){return d.index;})
    .value(function(d,i){return d.count;})
    .nameAxis(true, "Index").valueAxis(true, "Count")
    .title("Auto Refreshed Bar Chart with Color Customized")
    .colors("darkorange", "lightgray", "dimgray", "#333")
    .refresh(5000)
    .hbar();
