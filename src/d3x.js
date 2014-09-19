!function() {
    var d3x = function(selector){
        this._data = [];
        this._renderer = null;
        this._colors = ["darkorange"];
        this._ratio = 0.6;
        this._canvasSize = {};
        this._userMargin = {top:10, right:10, bottom:10, left:10};
        if(selector) this.appendTo(selector);
    }
    d3x.prototype.margin = function(top, right, bottom, left){
        this._userMargin.top = top;
        this._userMargin.right = right;
        this._userMargin.bottom = bottom;
        this._userMargin.left = left;
        return this;
    }
    d3x.prototype.size = function(width, height){
        if(this._container) this._container.attr("width", width).attr("height", height);
        return this;
    }
    d3x.prototype.prependTo = function(parent){
        return this._newSvg(parent, ":first-child");
    }
    d3x.prototype.appendTo = function(parent){
        return this._newSvg(parent);
    }
    d3x.prototype._newSvg = function(parent, before){
        this._container = d3.select(parent).insert("svg", before).classed("chart", true);
        this._svg = this._container[0][0];
        this._fontSize = parseFloat(getComputedStyle(this._svg).fontSize);
        this._canvas = this._container.append("g").classed("canvas", true);
        this._canvas.append('g').classed('elements', true);
        return this;
    }
    d3x.prototype._updateCanvasSize = function(){
        this._calcMargin();
        if(this._svg && this._canvas){
            var clientWidth = this._svg.clientWidth || window.getComputedStyle(this._svg).width.slice(0, -2),
                clientHeight = this._svg.clientHeight || window.getComputedStyle(this._svg).height.slice(0, -2);
            this._canvasSize = {
                width: clientWidth-this._margin.left-this._margin.right, 
                height: clientHeight-this._margin.top-this._margin.bottom
            };
            this._canvas.attr("transform", "translate(" + this._margin.left + "," + this._margin.top + ")");
        }
    }
    d3x.prototype._maxNameWidth = function(){
        var maxWidth = 0;
        if(this._data){
            var temp = document.body.appendChild(document.createElement('div'));
            temp.style.opacity = 0;
            temp.style.fontSize = "" + this._fontSize + "px";
            temp.style.position = "absolute";
            var that = this;
            this._data.forEach(function(d, i){
                temp.innerHTML = that._getName(d, i);
                maxWidth = Math.max(maxWidth, temp.clientWidth);
            });
            document.body.removeChild(temp);
        }
        return maxWidth;
    }
    d3x.prototype._calcMargin = function(orient, diff){
        this._margin = Object.create(this._userMargin);
        if(this._titleLabel) this._margin.top += this._fontSize;      
        if(this._valueLabel) this._margin[this._valueAxisOptions.orient] += this._fontSize * 2;
        if(this._nameLabel) this._margin[this._nameAxisOptions.orient] += this._fontSize * 2;
        if(this._valueAxisEnabled){
            this._margin[this._valueAxisOptions.orient] += this._fontSize;
            if(this._valueTickEnabled)this._margin[this._valueAxisOptions.orient] += 6;
        }  
        if(this._nameAxisEnabled){
            var maxNameWidth = this._maxNameWidth();
            if(this._nameAxisOptions.orient=="bottom" || this._nameAxisOptions.orient=="top"){
                var maxRange = this._svg.clientWidth || window.getComputedStyle(this._svg).width.slice(0, -2);
                var nameTickSpacing = this._data.length<=1 ? maxRange : (maxRange / this._data.length);
                if(maxNameWidth>nameTickSpacing){
                    this._nameTextTooLong = true;
                    this._margin[this._nameAxisOptions.orient] += maxNameWidth * Math.sin(Math.PI * 60 / 180);
                }else{
                    this._nameTextTooLong = false;
                    this._margin[this._nameAxisOptions.orient] += this._fontSize;
                }
            }else{
                this._margin[this._nameAxisOptions.orient] += maxNameWidth;
            }
            if(this._nameTickEnabled)this._margin[this._nameAxisOptions.orient] += 6;
        }
    }
    d3x.prototype.data = function(data, dataLoaded){
        if(Array.isArray(data)){
            this._data = data;
        }else if(typeof(data) == "function"){
            this._dataFunc = data;
        }else if(typeof(data) == "string"){
            this._dataUrl = data;
        }
        this._dataLoaded = dataLoaded;
        this.name();
        this.value();
        return this;
    }
    d3x.prototype.value = function(getValue){
        if(getValue) this.__getValue = getValue;
        if(!this._getValue){
            var that = this;
            this._getValue = function(d,i){
                if(typeof(that.__getValue) == "function") return that.__getValue.apply(null, arguments);
                else return +d;
            }
        }
        return this;
    }
    d3x.prototype.name = function(getName){
        if(getName) this.__getName = getName;
        if(!this._getName){
            var that = this;
            this._getName = function(d,i){
                if(typeof(that.__getName) == "function") return that.__getName.apply(null, arguments);
                else return i;
            }
        }
        return this;
    }
    d3x.prototype.colors = function(){
        for(var i in arguments){
            if(i<this._colors.length) this._colors[i] = arguments[i];
            else this._colors.push(arguments[i]);
        }
        return this;
    }
    d3x.prototype.getColor = function(index){
        if(index < this._colors.length){
            return this._colors[index];
        }else{
            return 'black';
        }
    }
    d3x.prototype.title = function(title){
        this._titleLabel = title;
        return this;
    }
    d3x.prototype.nameAxis = function(tickEnabled, label){
        this._nameAxisEnabled = true;
        this._nameTickEnabled = tickEnabled;
        this._nameLabel = label;
        return this;
    }
    d3x.prototype.valueAxis = function(tickEnabled, label){
        this._valueAxisEnabled = true;
        this._valueTickEnabled = tickEnabled;
        this._valueLabel = label;
        return this;
    }
    d3x.prototype.ratio = function(ratio){
        this._ratio = ratio;
        return this;
    }
    d3x.prototype.elements = function(){
        return this.select("g.elements").selectAll("g.element").data(this._data, this._getName);
    }
    d3x.prototype.selectAll = function(selector){
        return this._canvas.selectAll(selector);
    }
    d3x.prototype.select = function(selector){
        return this._canvas.select(selector);
    }
    d3x.prototype.append = function(selector){
        return this._canvas.append(selector);
    }
    d3x.prototype.insert = function(selector, before){
        return this._canvas.insert(selector, before);
    }
    d3x.prototype.selectOrAppend = function(select, append, before){
        var selection = this.selectAll(select);
        if(selection.size()>0) return selection;
        else return this.insert(append, before);
    }
    d3x.prototype._scaleName = function(diff, multiplier){
        var that = this;
        return function(){ return that._nameScale(that._getName.apply(null, arguments))*(multiplier?multiplier:1) + (diff?diff:0);};
    }
    d3x.prototype._scaleValue = function(diff, multiplier){
        var that = this;
        return function(){ return that._valueScale(that._getValue.apply(null, arguments))*(multiplier?multiplier:1) + (diff?diff:0); };
    }
    d3x.prototype._loadData = function(done){
        if(typeof(this._dataUrl) == "string"){
            var that = this;
            d3.json(this._dataUrl, function(data){
                that._data = data;
                if(that._dataLoaded) that._dataLoaded(that._data);
                if(done) done();
            });
        }else{
            if(typeof(this._dataFunc) == "function"){
                this._data = this._dataFunc();
            }
            if(this._dataLoaded) this._dataLoaded(this._data);
            if(done) done();
        }
    }
    d3x.prototype.refresh = function(interval){
        if(isNaN(interval)){
            this._loadDataAndRender();
        }else{
            clearTimeout(this._refreshHandle);
            var that = this;
            this._refreshHandle = setTimeout(function(){
                that._loadDataAndRender(function(){
                    that.refresh(interval);
                });
            }, interval);
        }
        return this;
    }
    d3x.prototype._loadDataAndRender = function(done){
        if(d3x.isActive===false){ 
            if(done) done();
        }else{
            var that = this;
            this._loadData(function(){
                that._render();
                if(done) done();
            });
        }
    }
    d3x.prototype._render = function(){
        this._updateCanvasSize();
        this._updateNameAxis();
        this._updateValueAxis();
        this.selectAll(".axis path, .axis line").style("fill", "none").style('stroke', this.getColor(1));
    
        this.elements().exit().style("opacity", 1).remove(); // remove immediately
        var element = this.elements().enter().append("g").classed("element",true);
        if(this._onClick) element.style("cursor", "pointer");
        var background = element.append("rect").classed("background", true).style("fill-opacity", "0");
        this._onEnter(element, background);
        this._onRender(this.elements(), this.elements().select("rect.background"));
        
        if(!this._titleElement) this._appendTitle();
        if(!this._tooltip) this._appendTooltip();
        this._hideTooltip();
        this._setupEvent();
    }
    d3x.prototype._setupEvent = function(){
        var that = this;
        this.selectAll("g.element").on('mouseover', function(d){
            var currentElement = this;
            that.selectAll("g.element").style({opacity: function(d){
                return (this === currentElement) ? 1 : 0.2;
            }}).interrupt().transition();
            d3.select(this).select("circle.point").attr("r", that._pointRadius+1);
        }).on('mouseout', function(d){
            that.selectAll("g.element").transition().delay(250).duration(500).style({opacity: 1});
            that._hideTooltip();
            d3.select(this).select("circle.point").attr("r", that._pointRadius);
        }).on('mousemove', function(d, i){
            that._showTooltip(d, i);
        }).on('click', function(d, i){
            if(typeof that._onClick === 'function')
                that._onClick(that._getName(d, i), that._getValue(d, i), d3.event);
        });
    }
    d3x.prototype.click = function(onClick){
        this._onClick = onClick;
    }
    d3x.prototype._appendTitle = function(){
        this._titleElement = this.append("text").classed("title", true)
            .style("text-anchor", "middle").style('fill', this.getColor(3))
            .attr("x", this._canvasSize.width/2).attr("y", "-1em").text(this._titleLabel);
    }
    d3x.prototype._appendTooltip = function(){
        this._tooltip = this.append("g").classed("tooltip", true).style("opacity", 0).style("pointer-events", "none");
        this._tooltip.padding = {left: 10, top: 20};
        this._tooltip.append("rect").classed("background", true).style("fill", "#555")
            .attr("x", 0).attr("y", 0).attr("height", 60);
        this._tooltip.append('text').classed("name", true).style("fill", "#bbb")
            .attr("x", this._tooltip.padding.left).attr("y", this._tooltip.padding.top);
        this._tooltip.append('text').classed("value", true).style("fill", "#fff")
            .attr("x", this._tooltip.padding.left).attr("y", this._tooltip.padding.top).attr("dy", "1.5em");
    }
    d3x.prototype._showTooltip = function(d, i){
        var maxWidth = Math.max(40,
            this._tooltip.select("text.name").text(this._getName(d, i))[0][0].getBBox().width,
            this._tooltip.select("text.value").text(this._getValue(d, i))[0][0].getBBox().width
        );
        this._tooltip.select("rect.background").attr('width', maxWidth + 20);
        
        var width = this._tooltip[0][0].getBBox().width,
            height = this._tooltip[0][0].getBBox().height,
            point = this._tooltipPoint(d, i, width, height, 10);
        this._tooltip.attr("transform", "translate("+point.x+","+point.y+")");
        this._tooltip.style("opacity", 0.95).style("visibility", 'visible').interrupt().transition();
    }
    d3x.prototype._hideTooltip = function(delay){
        if(!delay) delay = 1000;
        this._tooltip.transition().delay(delay).duration(500).style("opacity", 0);
        this._tooltip.transition().delay(delay+500).style("visibility", 'hidden');
    }
    d3x.prototype.hbar = function(){
        this._nameAxisOptions = {orient: "left"};
        this._valueAxisOptions = {orient: "bottom"};
    
        var that = this;
        this._onEnter = function(element, background){
            background.attr("width", that._canvasSize.width)
            element.append("rect").classed("shape", true).attr("width", 0)
                .style("fill", function(d,i){return that.getColor(0)});
        }
        this._onRender = function(elements, backgrounds){
            var padding = that._nameTickSpacing * (1-that._ratio);
            backgrounds.transition().duration(500)
                .attr("y", that._scaleName())
                .attr("height", that._nameTickSpacing);
            elements.select("rect.shape").transition().duration(500)
                .attr("width", that._scaleValue())
                .attr("y", that._scaleName(padding/2))
                .attr("height", that._nameTickSpacing-padding);
            elements.select("text.value").transition().duration(500)
                .attr("x", that._scaleValue())
                .attr("y", that._scaleName(that._nameTickSpacing/2))
                .text(that._getValue);
        }
        this._tooltipPoint = function(d, i, width, height, offset){
            var x = that._scaleValue()(d,i),
                y = that._scaleName(that._nameTickSpacing/2)(d,i);
            if(x + width + offset <= that._canvasSize.width) x = x + offset;
            else x = that._canvasSize.width - width - offset;
            if(y - height/2 < 0) y = 0;
            else y = y - height/2;
            return {x: x, y: y};
        }
        this.refresh();
        return this;
    }
    d3x.prototype.vbar = function(){
        this._nameAxisOptions = {orient: "bottom"};
        this._valueAxisOptions = {orient: "left"};
        var that = this;
        this._onEnter = function(element, background){
            background.attr("height", that._canvasSize.height);
            element.append("rect").classed("shape", true).attr("y", that._canvasSize.height).attr("height", 0)
                .style("fill", function(d,i){return that.getColor(0)});
        }
        this._onRender = function(elements, backgrounds){
            var padding = that._nameTickSpacing * (1-that._ratio);
            backgrounds.transition().duration(500)
                .attr("x", that._scaleName())
                .attr("width", that._nameTickSpacing)
            elements.select("rect.shape").transition().duration(500)
                .attr("x", that._scaleName(padding/2))
                .attr("y", that._scaleValue())
                .attr("width", that._nameTickSpacing-padding)
                .attr("height", that._scaleValue(that._canvasSize.height, -1));
            elements.select("text.value").transition().duration(500)
                .attr("y", that._scaleValue())
                .attr("x", that._scaleName(that._nameTickSpacing/2))
                .text(that._getValue);
        }
        this._tooltipPoint = function(d, i, width, height, offset){
            var x = that._scaleName(that._nameTickSpacing/2)(d,i),
                y = that._scaleValue()(d,i);
            if(x + width/2 > that._canvasSize.width) x = that._canvasSize.width - width;
            else x = x - width/2;
            if(y - height - offset >= 0) y = y - height - offset;
            else y = y + offset;
            return {x: x, y: y};
        }
        this.refresh();
        return this;
    }
    d3x.prototype.line = function(){
        this._nameAxisOptions = {orient: "bottom", tryLinear: "linear"};
        this._valueAxisOptions = {orient: "left"};
        var that = this;
        this._pointRadius = 8 * that._ratio;
        this._onEnter = function(element, background){
            background.attr("height", that._canvasSize.height);
            element.append("circle").attr("r", that._pointRadius).attr("class", "point")
                .style("fill", that.getColor(0));
        }
        this._onRender = function(elements, backgrounds){
            backgrounds.transition().duration(500)
                .attr("x", that._scaleName(that._nameScaleType=="linear"?-that._nameTickSpacing/2:0))
                .attr("width", that._nameTickSpacing);
            elements.select("circle").transition().duration(500)
                .attr("cx", that._scaleName(that._nameScaleType=="linear"?0:that._nameTickSpacing/2))
                .attr("cy", that._scaleValue())
            if(that._data.length){
                var line = d3.svg.line()
                    .x(this._scaleName(this._nameScaleType=="linear"?0:this._nameTickSpacing/2))
                    .y(that._scaleValue());
                that.selectOrAppend("path.line", "svg:path", ":first-child").attr("class", "line")
                    .style("fill", "none").style("stroke", this.getColor(0)).style("stroke-width", this._pointRadius/1.5)
                    .data([that._data]).transition().duration(500)
                    .attr("d", line);
            }else{
                that.selectAll("path.line").remove();
            }
        }
        this._tooltipPoint = function(d, i, width, height, offset){
            var x = that._scaleName(that._nameScaleType=="linear"?0:that._nameTickSpacing/2)(d,i),
                y = that._scaleValue()(d,i);
            if(x + width/2 > that._canvasSize.width) x = that._canvasSize.width - width;
            else x = x - width/2;
            if(y - height - offset >= 0) y = y - height - offset;
            else y = y + offset;
            return {x: x, y: y};
        }
        this.refresh();
        return this;
    }
    d3x.prototype._updateValueAxis = function(){
        var orient = this._valueAxisOptions.orient;
        if(!this._valueAxis){
            this._valueAxis = d3.svg.axis();
            if(!this._valueTickEnabled) this._valueAxis.tickSize(0, 0);
        }
        if(this._valueAxisEnabled){
            this._updateAxis(orient, "value", this._valueLabel);
        }
        var maxRange = (orient=='bottom'||orient=='top')?this._canvasSize.width:this._canvasSize.height;
        var range = (orient=='bottom'||orient=='top')?[0,maxRange]:[maxRange,0];
        this._valueScale = d3.scale.linear()
            .domain([0, d3.max(this._data, this._getValue)])
            .range(range);
        this._valueAxis.scale(this._valueScale).orient(orient).ticks(maxRange/50);
        this.selectAll("g.value.axis").transition().duration(500).call(this._valueAxis)
            .selectAll(".tick text").style('fill',this.getColor(2));
        return this;
    }
    d3x.prototype._updateNameAxis = function(){
        var orient = this._nameAxisOptions.orient;
        var tryLinear = this._nameAxisOptions.tryLinear;
        if(!this._nameAxis){
            this._nameAxis = d3.svg.axis();
            if(!this._nameTickEnabled) this._nameAxis.tickSize(0, 0);
        }
        if(this._nameAxisEnabled){
            this._updateAxis(orient, "name", this._nameLabel);
        }
        var maxRange = (orient=="bottom"||orient=="top")?this._canvasSize.width:this._canvasSize.height;
        var maxDomain = d3.max(this._data, this._getName);
        if(tryLinear && typeof(maxDomain) == "number"){
            this._nameScale = d3.scale.linear().domain([0, maxDomain]).range([0, maxRange]);
            this._nameScaleType = "linear";
        }else{
            this._nameScale = d3.scale.ordinal().domain(this._data.map(this._getName))
                .rangeBands([0, maxRange]);
        }
        this._nameTickSpacing = this._data.length<=1 ? maxRange : (maxRange / this._data.length);
        this._nameAxis.scale(this._nameScale).orient(orient).ticks(this._data.length);
        var tickText = this.selectAll("g.name.axis").transition().duration(500).call(this._nameAxis)
            .selectAll(".tick text").style('fill',this.getColor(2));
        if(orient=="bottom"){
            if(this._nameTextTooLong) tickText.style("text-anchor", "end").attr("transform", "rotate(-60)").attr("x",'-.5em').attr("y",'0');
            else tickText.style("text-anchor", "middle").attr("transform", null);
        }
        return this;
    }
    d3x.prototype._updateAxis = function(orient, classed, label){
        var axis = this.selectOrAppend("g.axis."+classed, "g").attr("class", "axis "+classed);
        this._updateAxisLabel(axis, orient, label);
        switch (orient) {
            case "top":
                axis.attr("transform", "translate(0,0)");
                break;
            case "right":
                axis.attr("transform", "translate("+this._canvasSize.width+",0)");
                break;
            case "bottom":
                axis.attr("transform", "translate(0,"+this._canvasSize.height + ")");
                break;
            case "left":
                axis.attr("transform", "translate(0,0)");
                break;
        }
    }
    d3x.prototype._updateAxisLabel = function(axis, orient, label){
        if(label){
            var labelElement = axis.select("text");
            if(labelElement.size()==0) labelElement = axis.append("text");
            labelElement.text(label).style("text-anchor", "middle").style('fill', this.getColor(3));
            switch (orient) {
                case "bottom":
                    return labelElement.attr("x", this._canvasSize.width/2)
                        .attr("y", this._margin.bottom)
                        .attr("dy", "-1.5em");
                case "left":
                    return labelElement.attr("transform", "rotate(-90)")
                        .attr("x", -this._canvasSize.height/2)
                        .attr("y", -this._margin.left)
                        .attr("dy", "1.5em");
                case "top":
                    return labelElement.attr("x", this._canvasSize.width/2)
                        .attr("y", -10)
                        .attr("dy", "-1em");
                case "right":
                    return labelElement.attr("transform", "rotate(90)")
                        .attr("x", this._canvasSize.height/2)
                        .attr("y", -10)
                        .attr("dy", "-2em");
            }
        }
    }
    window.onfocus = function () { d3x.isActive = true; }; 
    window.onblur = function () { d3x.isActive = false; }; 
    this.d3x = d3x;
}();
