document.addEventListener('DOMContentLoaded', function () {
    fetch('deutschland.json')
        .then(response => response.json())
        .then(data => {
            const properties = data.features[0].properties;

            // Categories including 'Union' for CDU and CSU
            const categories = ['CDU/CSU', 'AFD', 'SPD', 'Grüne', 'Linke', 'BSW', 'FDP'];

            // Sum CDU and CSU for the 'Union' category
            const union2021 = properties.CDU_zweit_2021_percent + properties.CSU_zweit_2021_percent;
            const union2025 = properties.CDU_zweit_2025_percent + properties.CSU_zweit_2025_percent;

            const series2021 = [
                union2021,
                properties.AFD_zweit_2021_percent,
                properties.SPD_zweit_2021_percent,
                properties.GRUENE_zweit_2021_percent,
                properties.Die_Linke_zweit_2021_percent,
                properties.BSW_zweit_2021_percent,
                properties.FDP_zweit_2021_percent




            ];
            const series2025 = [
                union2025,
                properties.AFD_zweit_2025_percent,
                properties.SPD_zweit_2025_percent,
                properties.GRUENE_zweit_2025_percent,
                properties.Die_Linke_zweit_2025_percent,
                properties.BSW_zweit_2025_percent,
                properties.FDP_zweit_2025_percent
            ];

            Highcharts.chart('results-chart', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: categories,
                    crosshair: false
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ''
                    }
                },
                tooltip: {
                    shared: true,
                    valueSuffix: ' %'
                },
                plotOptions: {
                    column: {
                        grouping: false,
                        pointPadding: 0.1,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: '',
                    data: series2021,
                    colorByPoint: true,
                    colors: ['#b0b0b0', '#a0d1e0', '#f3a5a5', '#bfe3bf', '#d6b0e5', '#d9a5b5', '#f7e3a1'],
                    pointPlacement: -0.2
                }, {
                    name: '',
                    data: series2025,
                    colorByPoint: true,
                    colors: ['#1a1a1a', '#1296db', '#d03030', '#2baf2b', '#9316af', '#9f003f', '#e6b800'],
                    pointPlacement: 0.2
                }]
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});




Highcharts.chart('seats-semiCircle', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false
    },
    title: {
        text: 'Sitzverteilung',
        align: 'left',
        verticalAlign: 'top',
        y: 60,
        style: {
            fontFamily: 'Roboto, sans-serif',
            fontSize: '1.1em'
        }
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
    },
    accessibility: {
        point: {
            valueSuffix: ''
        }
    },
    plotOptions: {
        pie: {
            dataLabels: {
                enabled: true,
                distance: -30,
                style: {
                    fontWeight: 'bold',
                    color: 'white'
                }
            },
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '75%'],
            size: '110%'
        }
    },
    series: [{
        type: 'pie',
        name: 'Anzahl Sitze',
        innerSize: '50%',
        colors: ['#9316af', '#2baf2b', '#d03030', '#1a1a1a', '#1296db'],
        data: [
            ['Linke', 64],
            ['Grüne', 85],
            ['SPD', 120],
            ['CDU/CSU', 208],
            ['AFD', 152]
        ]
    }]
});

Highcharts.chart('seats-coalition', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Mögliche Koallitionen',
        align: 'left',
        style:{
            fontFamily: 'Roboto, sans-serif',
            fontSize: '1.1em'
        }
    },
    xAxis: {
        categories: [
            'Große Koalition', 'Kenia-Koallition', 'Schwarz-Blau', 'Rot-Rot-Grün', 'Rot-Grün'
        ]
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        },
        plotLines:[{
            value: 315,
            color: 'black',
            width: 2,
            label: {
                text: 'Erforderliche Sitzzahl',
                align: 'middle',
                verticalAlign: 'middle'
            }
        }]
    },
    legend: {
        reversed: true
    },
    plotOptions: {
        series: {
            stacking: 'normal',
            dataLabels: {
                enabled: true
            }
        }
    },
    series: [{
        name: 'Linke',
        data: ['', '', '', 64, ''],
        color: '#9316af'
    }, {
        name: 'Grüne',
        data: ['', 85, '', 85, 85],
        color: '#2baf2b'
    }, {
        name: 'SPD',
        data: [120, 120, '', 120, 120],
        color: '#d03030'
    }, {
        name: 'CDU/CSU',
        data: [208, 208, 208, '', ''],
        color: '#1a1a1a'
    }, {
        name: 'SPD',
        data: ['', '', 152, '', ''],
        color: '#1296db'
    }]
});


