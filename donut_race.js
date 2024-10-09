function renderDonutChart_race(selectedYear) {
    const spec = {
      "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
      "description": "A donut chart grouped by ethnicity, income group, and year with text in the center.",
      "background": "transparent",
      "width": 400,
      "height": 300,
      "padding": -1,
      "layer": [
        {
          "data": {
            "url": "https://raw.githubusercontent.com/yueherngtang/fit3179w10hw/refs/heads/master/IncomeGroupByYear.csv"
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
          "mark": {"type": "arc", "innerRadius": 100},
          "encoding": {
            "theta": {"field": "total_population_raw", "type": "quantitative"},
            "color": {"field": "ethnicity", "type": "nominal", "legend": null},
            "tooltip": [
              {"field": "ethnicity", "type": "nominal", "title": "Ethnicity"},
              {"field": "total_population_formatted", "type": "nominal", "title": "Percentage"},
              {"field": "calculated_year", "type": "nominal", "title": "Year"}
            ]
          }
        }
      ]
    };
  
    // Use Vega-Embed to render the chart in the #donut-chart div
    vegaEmbed('#donut-chart-race', spec, { renderer: "svg", actions: false });
  }
  