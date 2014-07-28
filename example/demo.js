//vbar
var vbar = new d3x("#customerTrend")
    .size("100%",400)
    .data(["61","9","43","31","17"])
    .marginTop(40).marginLeft(40)
    .title("Vertical Bar")
    .vbar();
//hbar
var hbar = new d3x("#customerTrend")
    .size("100%",400)
    .marginTop(40).marginLeft(40)
    .data([{"name":"2012", "value": 61},{"name":"2013", "value": 75},{"name":"2014", "value": 99}])
    .name(function(d,i){return d.name;})
    .value(function(d,i){return d.value;})
    .nameAxis().valueAxis()
    .title("Horizontal Bar")
    .hbar();
//line
var line = new d3x("#customerTrend")
    .size("100%",400)
    .marginTop(40).marginLeft(40)
    .data(["61","9","43","31","17"])
    .nameAxis(true, "Name")
    .valueAxis(true, "Value")
    .title("Line")
    .line();
//custom
var dataFunc = function(){
    var numValues = Math.random() * 5,
        dataset = [];
    for (var i = 0; i < numValues; i++) {
        var newNumber = Math.floor(Math.random() * 25);
        dataset.push({name:i,count:newNumber});
    }
    return dataset;
}
var chart = new d3x().appendTo("#customerTrend")
    .size("100%",400)
    .data(dataFunc)
    .name(function(d,i){return d.name;})
    .value(function(d,i){return d.count;})
    .margin(40, 20, 50, 40)
    .nameAxis(true, "Name").valueAxis(true, "Count")
    .title("Auto Refreshed Chart")
    .colors("darkorange", "darkorange", "darkorange", "darkorange")
    .refresh(5000)
    .hbar();
