//vbar
var vbar = new d3x(".wrapper section").data(["61","9","43","31","17"]).nameAxis().marginTop(50).title("Vertical Bar").vbar();
//hbar
var hbar = new d3x(".wrapper section").data(["61","9","43","31","17"]).marginTop(50).title("Horizontal Bar").hbar();
//line
var line = new d3x(".wrapper section").data(["61","9","43","31","17"]).nameAxis(true).valueAxis().marginTop(50).title("Line").line();
//dynamic
var chart = new d3x().appendTo(".wrapper section")
    .data(function(){
        var numValues = Math.random() * 5;
        dataset = [];
        for (var i = 0; i < numValues; i++) {
            var newNumber = Math.floor(Math.random() * 25);
            dataset.push(newNumber);
        }
        console.log(dataset);
        return dataset;
    })
    .margin(50, 20, 50, 50)
    .nameAxis(true, 'Name').valueAxis(true, 'Value')
    .title("Dynamic Horizontal Bar")
    .colors("orange")
    .refresh(5000)
    .hbar();
    
    
