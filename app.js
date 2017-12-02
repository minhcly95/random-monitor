Vue.use(Vuetify);

const FAB_TIME = 1000;

var data = [];
var chart;
var colors = {
    red: "#F44336",
    orange: "#ff9800",
    yellow: "#ffeb3b",
    green: "#4CAF50",
    blue: "#2196F3",
    indigo: "#3f51b5",
    purple: "#9c27b0"
};

var app = new Vue({
    el: "#main",
    data: {
        time: 5,
        randomVar: 0,
        interval: 50,
        withDots: false,
        hidden: false,
        mouseOver: false,

        dialog: false,
        about: false,

        theme: "dark",

        colors: colors,
        chosenColor: 'green',

        // Show FAB for 1s
        showFab: _.throttle(function () {
            app.hidden = false;
        }, FAB_TIME),

        // Hide FAB after 1s
        hideFab: _.debounce(function () {
            app.hidden = true;
        }, FAB_TIME),
    },
    computed: {
        length: function () {
            return this.time * 1000 / this.interval + 1;
        },
        noDialog: function () {
            return !this.dialog && !this.about;
        }
    },
    methods: {
        randomWalk () {
            if (Math.random() < 0.5)
                this.randomVar++;
            else
                this.randomVar--;
        },

        move () {
            if (this.noDialog) {
                this.showFab();
                this.hideFab();
            }
        },

        showDialog() {
            this.dialog = true;
            this.showFab.cancel();
            this.hideFab.flush();
        },

        showAbout() {
            this.about = true;
            this.dialog = false;
        }
    },

    watch: {
        time: function (val) {
            chart.options.scales.xAxes[0].ticks.min = -val;
            chart.update(0);
        },
        withDots: function (val) {
            chart.options.elements.point.radius = val ? 3 : 0;
            chart.update(0);
        },
        chosenColor: function (val) {
            var code = colors[val];

            this.$vuetify.theme.primary = code;
            chart.options.elements.line.borderColor = code;
            chart.update(0);
        },
        theme: function (val, oldVal) {
            $("#app").removeClass("theme--" + oldVal).addClass("theme--" + val);
        }
    },

    created () {
        this.$vuetify.theme.primary = colors[this.chosenColor];
        
        window.setInterval(this.randomWalk, 1);
        
        window.setInterval(function () {
            var deltaT = app.interval / 1000.0;
            data.forEach(p => p.x -= deltaT);

            data.push({
                x: 0,
                y: app.randomVar
            });
            if (data.length > app.length)
                data.splice(0, data.length - app.length);

            if (chart)
                chart.update(0);
        }, this.interval);
    },

    mounted () {
        this.hideFab();
        chart = new Chart('canvas', {
            type: 'line',
            data:  {
                //labels: labels,
                datasets: [{ 
                    label: 'data',
                    data: data,
                    fill: false
                }]
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                        type: 'linear',
                        ticks: {
                            maxRotation: 0,
                            autoSkipPadding: 10,
                            min: -this.time,
                            max: 0,
                            stepSize: 0.5,
                            fontFamily: "Roboto,sans-serif"
                        },
                        gridLines: {
                            color: this.$vuetify.theme.secondary
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            color: this.$vuetify.theme.secondary,
                            zeroLineColor: this.$vuetify.theme.secondary
                        },
                        ticks: {
                            fontFamily: "Roboto,sans-serif"
                        }
                    }]
                },
                elements: {
                    point: {
                        radius: 0
                    },
                    line: {
                        borderColor: colors[this.chosenColor]
                    }
                },
                legend: {
                    display: false
                }
            }
        });   
    }
});