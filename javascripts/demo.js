    var dataFunc = function(){
        var numValues = Math.random() * 5 -1;				//Count original length of dataset
        dataset = [];  						 				//Initialize empty array
        for (var i = 0; i < numValues; i++) {				//Loop numValues times
            var newNumber = Math.floor(Math.random() * 25); //New random integer (0-25)
            dataset.push(newNumber);			 			//Add new number to array
        }
        console.log(dataset);
        return dataset;
    };
    //hbar
    var chart = new d3x(".wrapper section").data(["61","9","43","31","17"]).hbar();
    var chart = new d3x().appendTo(".wrapper section")
        .size(400, 400)
        .margin(50, 20, 120, 100)
        .data(dataFunc)
        .nameAxis().valueAxis()
        .colors("orange")
        .title("Page Report")
        .refresh(5000)
        .hbar();
    
    //vbar
    var chart = new d3x(".wrapper section").data(["61","9","43","31","17"]).nameAxis().vbar();
    var chart = new d3x().appendTo(".wrapper section")
        .size(400, 400)
        .margin(50, 20, 50, 100)
        .data(dataFunc)
        .nameAxis(false, "Page Views")
        .colors("orange")
        .title("Page Report")
        .refresh(5000)
        .vbar();
    
    //line
    var chart = new d3x(".wrapper section").data(["61","9","43","31","17"]).line();
    var chart = new d3x().appendTo(".wrapper section")
        .size(400, 400)
        .margin(50, 20, 120, 100)
        .data(dataFunc)
        .nameAxis(false, "Page Views")
        .colors("orange")
        .title("Page Report")
        .refresh(5000)
        .line();
