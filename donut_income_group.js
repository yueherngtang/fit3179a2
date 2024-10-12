function renderDonutChart(selectedYear) {
  const spec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "description": "A donut chart grouped by income group and year with text in the center.",
    "background": "transparent",
    "view": {
      "stroke": "transparent", 
      "width": 400, 
      "height": 300  
    },
    "padding":-1,
    "data": {
      "url": "https://raw.githubusercontent.com/yueherngtang/fit3179a2/refs/heads/main/IncomeGroupByYear.csv"
    },
    "transform": [
      {
        "filter": `datum.year == ${selectedYear}`
      },
      {
        "aggregate": [
          {"op": "average", "field": "percentage_population", "as": "total_population"}
        ],
        "groupby": ["income_group"]
      },
      {
        "calculate": "format(datum.total_population * 100, '.2f') + '%' ",
        "as": "total_population_formatted"
      },
      {
        "calculate": `${selectedYear}`,
        "as": "calculated_year"
      },
    ],
    "encoding": {
          "theta": {"field": "total_population", "type": "quantitative", "stack": true},
          "color": {"field": "income_group", "type": "nominal", "legend": null}},
    "layer": [
      {
        "mark": {"type": "arc", "innerRadius": 100},
        "encoding": {
          "tooltip": [
            {"field": "calculated_year", "type": "nominal", "title": "Year"},
            {"field": "income_group", "type": "nominal", "title": "Income Group"},
            {"field": "total_population_formatted", "type": "nominal", "title": "Percentage Of Country Population"}
          ]
        }
      },
      {
        "mark": {"type": "text", "radius" :180, "fontSize": 20},
        "encoding": {
          "text": {"field": "income_group", "type": "nominal"},
          "theta": {"field": "total_population", "type": "quantitative"}
        }
      }
    ]
  };

  // Use Vega-Embed to render the chart in the #donut-chart div
  vegaEmbed('#donut-chart', spec, { renderer: "svg", actions: false });
}
