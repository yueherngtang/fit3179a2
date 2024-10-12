function renderDonutChart_race(selectedYear) {
    const spec = {
      "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
      "description": "A donut chart grouped by ethnicity, income group, and year with text in the center.",
      "background": "transparent",
      
      "view": {
      "stroke": "transparent", 
      "width": 300, 
      "height": 300  
    },
      "padding":55,
      "data": {
            "url": "https://raw.githubusercontent.com/yueherngtang/fit3179a2/refs/heads/main/IncomeGroupByYear.csv"
          },

      "transform": [
            {
              "filter": `datum.year == ${selectedYear}`
            },
            {
              "aggregate": [
                {"op": "average", "field": "population_ethnicity_year", "as": "eth_population"},
                {"op": "average", "field": "total_population_year", "as": "population_year"}
              ],
              "groupby": ["ethnicity"]
            },
            {
              "calculate": `${selectedYear}`,
              "as": "calculated_year"
            },
            {
              "calculate": "format(datum.eth_population * 100 / datum.population_year , '.2f') + '%' ",
              "as": "total_population_formatted"
            },
            {
                "calculate": "format(datum.eth_population * 100 / datum.population_year , '.2f')",
                "as": "total_population_raw"
            }
          ],
          "encoding": {
            "theta": {"field": "total_population_raw", "type": "quantitative", "stack": true},
            "color": {"field": "ethnicity", "type": "nominal", "legend": null, "scale": {
    "domain": ["Malay", "Chinese", "Indian", "Others"],  
    "range": ["#f40abf", "#66c2fb", "#932cf3", "#0a2af4"]  
  }}},
      "layer": [
        {
          
          "mark": {"type": "arc", "innerRadius": 100},
          "encoding": {
            
            "tooltip": [
              {"field": "calculated_year", "type": "nominal", "title": "Year"},
              {"field": "ethnicity", "type": "nominal", "title": "Ethnicity"},
              {"field": "total_population_formatted", "type": "nominal", "title": "Percentage Of Country Population"}
              
            ]
          }
        },
        
      {
        "mark": {"type": "text", "radius" :180, "fontSize": 20},
        "encoding": {
          "text": {"field": "ethnicity", "type": "nominal"},
          "theta": {"field": "total_population_raw", "type": "quantitative"},
          "fontSize": {"value": 16}
        }
      }
      ]
    };
  
    // Use Vega-Embed to render the chart in the #donut-chart div
    vegaEmbed('#donut-chart-race', spec, { renderer: "svg", actions: false });
  }
  