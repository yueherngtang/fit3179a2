function renderDonutChart(selectedYear) {
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
              {"op": "average", "field": "percentage_population", "as": "total_population"}
            ],
            "groupby": ["income_group"]
          },
          {
            "calculate": `${selectedYear}`,
            "as": "calculated_year"
          },
          {
            "calculate": "format(datum.total_population * 100, '.2f') + '%' ",
            "as": "total_population_formatted"
          }
        ],
        "mark": {"type": "arc", "innerRadius": 100},
        "encoding": {
          "theta": {"field": "total_population", "type": "quantitative"},
          "color": {"field": "income_group", "type": "nominal", "legend": null},
          "tooltip": [
            {"field": "income_group", "type": "nominal", "title": "Income Group"},
            {"field": "total_population_formatted", "type": "nominal", "title": "Percentage"},
            {"field": "calculated_year", "type": "nominal", "title": "Year"}
          ]
        }
      }
    ]
  };

  // Use Vega-Embed to render the chart in the #donut-chart div
  vegaEmbed('#donut-chart', spec, { renderer: "svg", actions: false });
}
