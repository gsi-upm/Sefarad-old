// New widget
var widgetBarrasR = {
		// Widget name.
		name: "widgetBarrasR",
		// Widget description.
		description: "Widget Barras Ruben",
		// Path to the image of the widget.
		img: "img/widgetBarrasR.png",
		// Type of the widget.
		type: "widgetBarrasR",
		// [OPTIONAL] data taken from this field.
		// field: "polarityValue",

		render: function () {
			var id = 'A' + Math.floor(Math.random() * 10001);
			var field = widgetBarrasR.field || "";
			vm.activeWidgetsRight.push({"id":ko.observable(id),"title": ko.observable(widgetBarrasR.name), "type": ko.observable(widgetBarrasR.type), "field": ko.observable(field),"collapsed": ko.observable(false)});
			
			// widgetBarrasR.paint(field, id, widgetBarrasR.type);
			widgetBarrasR.paint(id);
		},

		// paint: function (field, id, type) {	
		paint: function (id) {			
				
			d3.select('#'+id).selectAll('svg').remove();
			var div = d3.select('#'+id);
			div.attr("align", "center");

			var data = new Array();
			
			$.each(vm.filteredData(), function(index, item) {

				var bank = new Object();
				bank.organization = item.organization();
				bank.employees = item.employees();

				data.push(bank);					
					
			});

			console.log(data);

			var margin = {top: 20, right: 20, bottom: 30, left: 40},
			    width = 700 - margin.left - margin.right,
			    height = 365 - margin.top - margin.bottom;

			var x = d3.scale.ordinal()
			    .rangeRoundBands([0, width], .1)
			    .domain(data.map(function(d) { return d.organization; }));

			var y = d3.scale.linear()
			    .range([height, 0])			    
			    .domain([0, d3.max($.map(data, function(d) { return d.employees; }))]); 

			var xAxis = d3.svg.axis()
			    .scale(x)
			    .orient("bottom");

			var yAxis = d3.svg.axis()
			    .scale(y)
			    .orient("left");
		
			var svg = div.append("svg")
			    .attr("width", width + margin.left + margin.right)
			    .attr("height", height + margin.top + margin.bottom)
			  .append("g")
			    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			svg.append("g")
			      .attr("class", "x axis")
			      .attr("transform", "translate(0," + height + ")")
			      .call(xAxis);

			svg.append("g")
			      .attr("class", "y axis")
			      .call(yAxis)
			    .append("text")
			      .attr("transform", "rotate(-90)")
			      .attr("y", 6)
			      .attr("dy", ".71em")
			      .style("text-anchor", "end")
			      .text("Empleados");

			svg.selectAll(".bar")
			      .data(data)
			    .enter().append("rect")
			      .attr("class", "bar")
			      .attr("x", function(d) { return x(d.organization); })
			      .attr("width", x.rangeBand())
			      .attr("y", function(d) { return y(d.employees); })
			      .attr("height", function(d) { return height - y(d.employees); });
		
		}	
			
};