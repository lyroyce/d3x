//vbar
var vbar = new d3x(".wrapper section").data(["61","9","43","31","17"]).marginTop(40).marginLeft(40).nameAxis().title("Vertical Bar").vbar();
//hbar
var hbar = new d3x(".wrapper section").data(["61","9","43","31","17"]).marginTop(40).marginLeft(40).nameAxis().valueAxis().title("Horizontal Bar").hbar();
//line
var line = new d3x(".wrapper section").data(["61","9","43","31","17"]).marginTop(40).marginLeft(40).nameAxis(true).valueAxis(true).title("Line").line();
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
var chart = new d3x().appendTo(".wrapper section")
    .data(dataFunc)
    .name(function(d,i){return d.name;})
    .value(function(d,i){return d.count;})
    .margin(40, 20, 50, 40)
    .nameAxis(true, 'Name').valueAxis(true, 'Count')
    .title("Auto Refreshed Chart")
    .colors(["darkorange",'steelblue'])
    .refresh(5000)
    .hbar();
    
    
