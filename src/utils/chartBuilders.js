import * as d3 from 'd3';

export function myDrawChart(width, CHART_HEIGHT, dataObjArr) {
    
    const MARGINS = {top: 20, bottom: 10};
    const ADDED_MARGINS = MARGINS.top + MARGINS.bottom;
    const CHART_HEIGHT_wMARGINS = CHART_HEIGHT - MARGINS.top - MARGINS.bottom;
    
    // direction of scaling and range
    const x = d3.scaleBand()
    .range([0, width])
    .padding(0.1)
    // how many items should be placed
    .domain(dataObjArr.map(obj => obj.month));

    const y = d3
    .scaleLinear()
    .range([0, CHART_HEIGHT])
    .domain([d3.max(dataObjArr, d => d.count) + 1, 0]);
    
    // create svg container
    const chartContainer = d3.select("#chart")
        .append('svg')
        .attr('width', width)
        .attr('height', CHART_HEIGHT)

    // svg group for rectangles
    const chart = chartContainer.append('g');

    // make axis at bottom 
    chart.append('g')
        // (axisBottom === style of axis)  
        .call(d3.axisBottom(x).tickSizeOuter(0))
        .attr('transform', `translate(0, ${CHART_HEIGHT_wMARGINS})`)

    chart
        .selectAll('.bar')
        // .bar does not exist
        .data(dataObjArr)
        // data finds missing data or redundant - accesed with enter()
        .enter()
        // on enter append rectangles with .bar class 
        .append('rect')
        .classed('bar', true)
        // equal width for all bars
        .attr('width', x.bandwidth()) 
        // deduct scaled and domained value from chart height 
        .attr('x', d => x(d.month))
        // set inital bottom for transition
        .attr('y', d => y(0))
        .transition().duration(500)
        // set required height - leave space for axis
        .attr('height', d => CHART_HEIGHT - y(d.count) - ADDED_MARGINS)  
        .attr('y', d => y(d.count))

    chart
        .selectAll('.label')
        // join data with dummy data
        .data(dataObjArr)
        .enter()
        .append('text')
        .text(d => d.count)
        // starts in middle
        .attr('x', d => x(d.month) + x.bandwidth() / 2) 
        .attr('y', d => y(d.count) - 10)
        // svg text element align middle
        .attr('text-anchor', 'middle') 
        .classed('label', true);
}