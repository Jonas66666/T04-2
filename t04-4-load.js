// t04-4-load.js
// Load the tvBrandCount.csv file from /data
d3.csv("data/tvBrandCount.csv", d => {
    return {
        brand: d.brand,
        count: +d.count // '+' converts string to number
    };
}).then(data => {
    console.log("Data loaded:", data); // array of typed objects
    
    // Call the bar chart function (defined in t04-5-bars.js)
    createBarChart(data);
});