let selectedYear = 2022;

const margin = { top: 10, right: 10, bottom: 10, left: 10 },
  width =860 - margin.left - margin.right,
  height = 460 - margin.top - margin.bottom;

// Append the SVG container for the alluvial diagram
const svg = d3.select("#alluvial")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("text")
  .attr("x", (width / 2))  // Center the title horizontally
  .attr("y", -5)  // Position it above the diagram
  .attr("text-anchor", "middle")  // Center the text
  .style("font-size", "16px")  // Adjust the font size
  .style("font-weight", "bold")  // Make the font bold
  .text("Population Distribution by Income Group and Ethnicity - " + selectedYear);

// Select the tooltip div
const tooltip = d3.select("#tooltip");

let allData; // Variable to hold the entire dataset

const colorByIncomeGroup = {
    "B40": "#4c78a8",
    "M40": "#f58518",
    "T20": "#e35454"
  };

  const nodeColor = d3.scaleOrdinal()
  .domain(["B40", "M40", "T20", "Malay", "Chinese",  "Indian", "Others",]) 
  .range(["#4c78a8", "#f58518", "#e35454", "#f40abf", "#66c2fb", "#932cf3", "#0a2af4"]); 

// Function to draw the Sankey diagram
function drawSankey(data) {
  // Clear any existing content in the SVG
  svg.selectAll("*").remove();

  const nodes = [];
  const links = [];

  const nodeMap = {};

  // Helper function to get or create node index
  function getNodeIndex(name) {
    if (nodeMap[name] === undefined) {
      nodeMap[name] = nodes.length;
      nodes.push({ name });
    }
    return nodeMap[name];
  }

  // Process the CSV data to create nodes and links
  data.forEach(d => {
    const incomeGroup = d.income_group;
    const ethnicity = d.ethnicity;
    const flowValue = (+d.population_ethnicity_income_group_year * 100) / +d.total_population_year; // Convert to number

    // Get or create the node indices
    const sourceIndex = getNodeIndex(incomeGroup); // Left-side node (Income group)
    const targetIndex = getNodeIndex(ethnicity);   // Right-side node (Ethnicity)

    // Push the link (flow) between the income group and ethnicity
    links.push({
      source: sourceIndex,
      target: targetIndex,
      value: flowValue,
      income_group: incomeGroup
    });
  });

  // Set up the sankey diagram properties
  const sankey = d3.sankey()
    .nodeWidth(36)
    .nodePadding(10)
    .extent([[1, 1], [width - 1, height - 6]]);

  // Apply the data to the sankey layout
  const { nodes: sankeyNodes, links: sankeyLinks } = sankey({
    nodes: nodes.map(d => Object.assign({}, d)),
    links: links.map(d => Object.assign({}, d))
  });

  const formatPercentage = d3.format(".2f");

  // Draw the links (flows)
  svg.append("g")
    .attr("fill", "none")
    .attr("stroke-opacity", 0.5)
    .selectAll("path")
    .data(sankeyLinks)
    .join("path")
    .attr("d", d3.sankeyLinkHorizontal())
    .attr("stroke", d => colorByIncomeGroup[d.income_group] || "#000")
    .attr("stroke-width", d => Math.max(1, d.width))
    .on("mouseover", function(event, d) {
      // Show the tooltip on mouseover
      tooltip.transition().duration(200).style("opacity", 0.9);
      tooltip.html(`
        <div style="text-align: left;">
          <div><span style="float: left; width: 200px; text-align: right; color: grey;">Income Group:</span> <span style="margin-left: 10px; font-weight: bold;">${d.source.name}</span></div>
          <div><span style="float: left; width: 200px; text-align: right;color: grey;">Ethnicity:</span> <span style="margin-left: 10px; font-weight: bold;">${d.target.name}</span></div>
          <div><span style="float: left; width: 200px; text-align: right;color: grey;">Percentage of Country Population:</span> <span style="margin-left: 10px; font-weight: bold;">${formatPercentage(d.value)}%</span></div>
          <div><span style="float: left; width: 200px; text-align: right;color: grey;">Year:</span> <span style="margin-left: 10px; font-weight: bold;">${selectedYear}</span></div>
        </div>
      `)
      .style("top", (event.pageY - 28) + "px");
    })
    .on("mousemove", function(event) {
      // Move the tooltip with the mouse
      tooltip.style("left", (event.pageX + 5) + "px")
        .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function() {
      // Hide the tooltip when the mouse leaves
      tooltip.transition().duration(500).style("opacity", 0);
    });

  // Draw the nodes (entities)
  svg.append("g")
    .selectAll("rect")
    .data(sankeyNodes)
    .join("rect")
    .attr("x", d => d.x0)
    .attr("y", d => d.y0)
    .attr("height", d => d.y1 - d.y0)
    .attr("width", d => d.x1 - d.x0)
    .attr("fill", d => nodeColor(d.name))
    .attr("stroke", "#000")
    .on("mouseover", function(event, d) {
      tooltip.transition().duration(200).style("opacity", 0.9);
    
      // Check if the node is an income group or an ethnicity to show appropriate details
      let tooltipContent = "";
      if (["B40", "M40", "T20"].includes(d.name)) {
        tooltipContent = `
          <div style="text-align: left;">
          <div><span style="float: left; width: 200px; text-align: right;color: grey;">Year:</span> <span style="margin-left: 10px; font-weight: bold;">${selectedYear}</span></div>
            <div><span style="float: left; width: 200px; text-align: right; color: grey;">Income Group:</span> 
              <span style="margin-left: 10px; font-weight: bold;">${d.name}</span></div>
            <div><span style="float: left; width: 200px; text-align: right; color: grey;">Population Percentage:</span> <span style="margin-left: 10px; font-weight: bold;">${formatPercentage(d.value)}%</span></div>
          </div>`;
      } else {
        tooltipContent = `
          <div style="text-align: left;">
          <div><span style="float: left; width: 200px; text-align: right;color: grey;">Year:</span> <span style="margin-left: 10px; font-weight: bold;">${selectedYear}</span></div>
            <div><span style="float: left; width: 200px; text-align: right; color: grey;">Ethnicity:</span> 
              <span style="margin-left: 10px; font-weight: bold;">${d.name}</span></div>
            <div><span style="float: left; width: 200px; text-align: right; color: grey;">Population Percentage:</span> <span style="margin-left: 10px; font-weight: bold;">${formatPercentage(d.value)}%</span></div>
          </div>`;
      }
    
      tooltip.html(tooltipContent)
        .style("left", (event.pageX + 5) + "px")
        .style("top", (event.pageY - 28) + "px");
    })
    .on("mousemove", function(event) {
      tooltip.style("left", (event.pageX + 5) + "px")
        .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function() {
      tooltip.transition().duration(500).style("opacity", 0);
    });
  

  // Add the labels for the nodes
  svg.append("g")
    .style("font", "10px sans-serif")
    .selectAll("text")
    .data(sankeyNodes)
    .join("text")
    .attr("x", d => d.x0 - 6)
    .attr("y", d => (d.y1 + d.y0) / 2)
    .attr("dy", "0.35em")
    .attr("text-anchor", "end")
    .text(d => d.name)
    .filter(d => d.x0 < width / 2)
    .attr("x", d => d.x1 + 6)
    .attr("text-anchor", "start");
}

// Function to filter data by year and update the chart
function updateChart(year) {
    selectedYear = year;
  const filteredData = allData.filter(d => +d.year === +year); // Filter by selected year
  drawSankey(filteredData); // Draw the Sankey diagram with filtered data
}

// Import the CSV file from a URL
d3.csv("IncomeGroupByYear.csv").then(function (data) {
  allData = data; // Save the full data set

  // Initially draw the chart with the first year
  updateChart(selectedYear); // You can change the default year to whatever you want
});

// Set up an event listener for the dropdown
d3.select("#yearSelect").on("change", function() {
  const selectedYear = d3.select(this).property("value");
  updateChart(selectedYear); // Update chart when a new year is selected
});
