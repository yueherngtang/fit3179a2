var vg_1 = "sample.vg.json";
var vg_2 = "bubble.vg.json";
var vg_3 = "bar_chart_expenditure_group.vg.json";
var vg_4 = "bump_chart_expenditure_group.vg.json";
var vg_5 = "line_scrub.vg.json";
var vg_6 = "parallel_coordinated_plot.vg.json";

vegaEmbed("#map", vg_1, { actions: false } ).then(function(result) {
    // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
}).catch(console.error);

vegaEmbed("#bubble", vg_2, { actions: false }).then(function(result) {
    // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
    console.log("Bubble chart successfully embedded!");
}).catch(console.error);

vegaEmbed("#bar_expenditure", vg_3, { actions: false }).then(function(result) {
    // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
}).catch(console.error);

vegaEmbed("#bump", vg_4, { actions: false }).then(function(result) {
    // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
}).catch(console.error);

vegaEmbed("#line_scrub", vg_5, { actions: false }).then(function(result) {
    // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
}).catch(console.error);

vegaEmbed("#parallel", vg_6, { actions: false }).then(function(result) {
    // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
}).catch(console.error);


