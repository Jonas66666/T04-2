// t04-5-bars.js
const createBarChart = (data) => {
    console.log("Creating bar chart with data:", data);
    
    // Sort data in descending order by count
    const sortedData = data.sort((a, b) => b.count - a.count);
    console.log("Sorted data (descending):", sortedData);
    
    // Choose a narrow width for scaling (forces x scaling)
    const viewW = 500; // narrow on purpose
    const viewH = 1600; // tall logical space for many bars
    
    // Physical display size (what you see on the page)
    const displayW = 640; // try 480–800 as you prefer
    const displayH = 420; // try 360–500
    
    const svg = d3.select(".responsive-svg-container")
        .append("svg")
        .attr("viewBox", `0 0 ${viewW} ${viewH}`) // logical coords
        .attr("width", displayW) // actual rendered size
        .attr("height", displayH) // actual rendered size
        .style("border", "1px solid black");
    
    // X scale (numeric) - for bar widths
    const xMax = d3.max(sortedData, d => d.count);
    const xScale = d3.scaleLinear()
        .domain([0, xMax]) // data space: from 0 to max count
        .range([0, viewW]); // pixels across the logical width
    
    // Y scale (categorical) - for bar positions
    // Use sorted data for domain to maintain descending order
    const yScale = d3.scaleBand()
        .domain(sortedData.map(d => d.brand)) // categorical values in sorted order
        .range([0, viewH]) // full height of SVG
        .paddingInner(0.2) // space between bars
        .paddingOuter(0.1); // space at top and bottom
    
    // Create bars using sorted data
    svg.selectAll("rect")
        .data(sortedData)
        .join("rect")
        .attr("class", d => `bar bar-${d.count}`)
        .attr("x", 0) // all bars start at left edge
        .attr("y", d => yScale(d.brand)) // position based on brand
        .attr("width", d => xScale(d.count)) // width scaled to count
        .attr("height", yScale.bandwidth()) // height from scale
        .attr("fill", "steelblue");
};