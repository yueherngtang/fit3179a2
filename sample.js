function renderMap(selectedYear) {
    const spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "title": "Poverty Rate by States",
        "background": "transparent",
        "width": 1240,
        "height": 600,
        "padding":0,

        "projection": {
            "type": "equalEarth",
            "scale": 4600,
            "center": [104.7, 4],
            "translate": [400, 300]
        },
        "layer": [
            {
                "mark": {"type": "geoshape", "fill": "#f1f1f1"},
                "data": {"sphere": true}
              },{
                "data": {
                    "url": "https://raw.githubusercontent.com/yueherngtang/fit3179w9hw/refs/heads/main/malaysia-states.topojson",
                    "format": { "type": "topojson", "feature": "states" }
                },
                "transform": [{
                    "calculate": "'Data is not available in ' + datum.properties.Name",
                    "as": "note"
                }],
                "mark": {
                    "type": "geoshape",
                    "fill": "#ddd",
                    "stroke": "white",
                    "strokeWidth": 1
                },
                "encoding": { "tooltip": { "field": "note" } }
            },
            {
                "data": {
                    "url": "https://raw.githubusercontent.com/yueherngtang/fit3179w10hw/refs/heads/master/States.csv"
                },
                "transform": [{
                        "lookup": "state",
                        "from": {
                            "data": {
                                "url": "https://raw.githubusercontent.com/yueherngtang/fit3179w9hw/refs/heads/main/malaysia-states.topojson",
                                "format": {
                                    "type": "topojson",
                                    "feature": "states"
                                }
                            },
                            "key": "properties.Name"
                        },
                        "as": "geo"
                    },
                    { "filter": `datum.year == ${selectedYear}` },
                    {
                        "calculate": "format(datum.absolute_poverty, '.2f')+ '%' ",
                        "as": "poverty_rate_percentage"
                      },
                      {
                        "calculate": `${selectedYear}`,
                        "as": "calculated_year"
                      }
                      
                ],
                "mark": { "type": "geoshape", "stroke": "#fff", "strokeWidth": 0.5 },
                "encoding": {
                    "shape": { "field": "geo", "type": "geojson" },
                    "color": {
                        "field": "absolute_poverty",
                        "type": "quantitative",
                        "scale": {
                             "type": "threshold", 
                            "domain": [2, 5, 10, 15], 
                            "range": ["#fee0d2", "#fc9272", "#fb6a4a", "#de2d26", "#a50f15"]  
          },
                        "title": "Poverty Rate (%)"
                      },
                    "tooltip": [
                        { "field": "state", "type": "nominal", "title": "State" },
                        { "field": "poverty_rate_percentage", "type": "nominal", "title": "Poverty Rate"},
                        { "field": "calculated_year", "type": "nominal", "title": "Year"}
                    ]
                }
            },
            {
                "data": {
                  "values": [
                    {"state": "Johor", "latitude": 1.9854, "longitude": 103.2618},
                    {"state": "Kedah", "latitude": 6.1184, "longitude": 100.3681},
                    {"state": "Kelantan", "latitude": 5.1456, "longitude": 101.9976},
                    {"state": "Melaka", "latitude": 2.296, "longitude": 102.2501},
                    {"state": "N.Sembilan", "latitude": 2.7255, "longitude": 102.1424},
                    {"state": "Pahang", "latitude": 3.8126, "longitude": 102.3256},
                    {"state": "Perak", "latitude": 4.5921, "longitude": 100.9901},
                    {"state": "Perlis", "latitude": 6.4431, "longitude": 100.1983},
                    {"state": "Penang", "latitude": 5.4141, "longitude": 100.3288},
                    {"state": "Sabah", "latitude": 5.38, "longitude": 114.0753},
                    {"state": "Sarawak", "latitude": 2.478, "longitude": 110.0592},
                    {"state": "Selangor", "latitude": 3.3738, "longitude": 101.3683},
                    {"state": "Terengganu", "latitude": 5.0117, "longitude": 102.8524},
                    {"state": "K.Lumpur", "latitude": 3.139, "longitude": 101.6869},
                    {"state": "Labuan", "latitude": 5.3831, "longitude": 112.2308},
                    {"state": "Putrajaya", "latitude": 2.8664, "longitude": 101.1764}
                  ]
                },
                "mark": {
                  "type": "text",
                  "color": "black",
                  "fontSize": 11,
                  "fontWeight": "bold",
                  "dx": 5,
                  "dy": -5
                },
                "encoding": {
                  "longitude": {"field": "longitude", "type": "quantitative"},
                  "latitude": {"field": "latitude", "type": "quantitative"},
                  "text": {"field": "state", "type": "nominal"}
                }
              },
              {
                "data": {
                    "url": "https://raw.githubusercontent.com/yueherngtang/fit3179w10hw/refs/heads/master/States.csv"
                },
                "transform": [
                    { "filter":  `datum.state == 'Sabah' && datum.year == ${selectedYear}` },
                    {
                        "calculate": "format(datum.absolute_poverty, '.2f') + '% Poverty Rate' ",
                        "as": "annotationText"
                    }, 
                    {
                      "calculate": "108.0",
                      "as": "longitude"
                  },
                  {
                    "calculate": "6.5",
                      "as": "latitude"
                }

                ],
                "mark": {
                    "type": "text",
                    "color": "red",
                    "fontSize": 40,
                    "fontWeight": "bold",
                    "align": "center",
                    "baseline": "middle"
                },
                "encoding": {
                    "longitude": { "field": "longitude", "type": "quantitative" },
                    "latitude": { "field": "latitude", "type": "quantitative" },    
                    "text": { "field": "annotationText", "type": "nominal" }
                }
            },
            
            {
                "data": {
                    "values": [
                        { "text": "in Sabah: Highest in Malaysia", "latitude": 6.0, "longitude": 108.0}
                    ]
                },
                "mark": {
                    "type": "text",
                    "color": "black",
                    "fontWeight": "bold",
                    "fontSize": 28,
                    "align": "center",
                    "baseline": "middle"
                },
                "encoding": {
                    "longitude": { "field": "longitude", "type": "quantitative" },
                    "latitude": { "field": "latitude", "type": "quantitative" },
                    "text": { "field": "text", "type": "nominal" }
                }
              },
              {
                "data": {
                    "values": [
                        { "latitude_start": 6.0, "longitude_start": 108.0, "latitude_end": 5.38, "longitude_end": 114.0753 }
                    ]
                },
                "mark": {
                    "type": "rule",
                    "stroke": "black",
                    "strokeWidth": 2
                },
                "encoding": {
                    "longitude": { "field": "longitude_start", "type": "quantitative" },
                    "latitude": { "field": "latitude_start", "type": "quantitative" },
                    "x2": { "field": "longitude_end", "type": "quantitative" },   
                    "y2": { "field": "latitude_end", "type": "quantitative" }     
                }
            }
        ],
        "config": {}
    }
  
    // Use Vega-Embed to render the chart in the #donut-chart div
    vegaEmbed('#mappy', spec, { renderer: "svg", actions: false });
  }
  


