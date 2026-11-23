// 1. Initialisiere die Karte
let activeLayer = null;
let geoLayer;

const accessToken = //MapBox Access Token hier eingeben
const map = L.map('map', {
    center: [51.1657, 10.4015],  // geografischer Mittelpunkt Deutschlands
    zoom: 7,

});

// 2. Hintergrundkarte hinzufügen
L.tileLayer(`https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/{z}/{x}/{y}?access_token=${accessToken}`, {
    tileSize: 512,
    zoomOffset: -1,
    attribution: '© <a href="https://www.mapbox.com/">Mapbox</a> © OpenStreetMap'
}).addTo(map);

// 3. Farbzuordnung für Parteien
function getParteiColor(partei) {
    const parteienFarben = {
        'Christlich Demokratische Union Deutschlands': '#1a1a1a',
        'Christlich-Soziale Union in Bayern e.V.': '#1a1a1a',
        'Sozialdemokratische Partei Deutschlands': '#d03030',
        'BÜNDNIS 90/DIE GRÜNEN': '#2baf2b',
        'Freie Demokratische Partei': '#e6b800',
        'Alternative für Deutschland': '#1296db',
        'DIE LINKE': '#9316af',
        'Bündnis Sahra Wagenknecht': '#9f003f',
        'Sonstige': '#cccccc'
    };
    return parteienFarben[partei] || '#888888';
}

function getChartColor(partei) {
    const chartFarben = {
        'CDU/CSU': '#1a1a1a',
        'SPD': '#d03030',
        'GRÜNE': '#2baf2b',
        'FDP': '#e6b800',
        'AFD': '#1296db',
        'Die Linke': '#9316af',
        'BSW': '#9f003f',
        'Sonstige': '#cccccc'
    };
    return chartFarben[partei] || '#888888';
}



// 4. Stilfunktion
function style(feature) {
    return {
        fillColor: getParteiColor(feature.properties.Gewählte_Partei),
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
    };
}

let wahlkreisMap = {};


// 5. GeoJSON laden
fetch('wahlkreise.json')
    .then(response => response.json())
    .then(data => {
        const dataList = document.getElementById('wahlkreis-liste');

        geoLayer = L.geoJSON(data, {
            style: style,
            onEachFeature: function (feature, layer) {
                const props = feature.properties;

                // Tooltip-Info vorbereiten
                const wkName = props.Wahlkreis;
                const wkNum = props.Wahlkreis_Nr;
                const wahlbeteiligung = props.Wahlbeteiligung_Percent_2025;

                const name = props.Wahlkreis;
                const nr = props.Wahlkreis_Nr;
                const label = `${name} (#${nr})`;

                const opt = document.createElement('option');
                opt.value = label;
                dataList.appendChild(opt);

                wahlkreisMap[label] = layer;

                const parteienDaten = [
                    { name: 'CDU/CSU', value: props["CDU/CSU_Percent_2025"] },
                    { name: 'SPD', value: props["SPD_Percent_2025"] },
                    { name: 'GRÜNE', value: props["GRÜNE_Percent_2025"] },
                    { name: 'FDP', value: props["FDP_Percent_2025"] },
                    { name: 'AFD', value: props["AFD_Percent_2025"] },
                    { name: 'Die Linke', value: props["Die_Linke_Percent_2025"] },
                    { name: 'BSW', value: props["BSW_Percent_2025"] },

                ].filter(p => p.value !== null); // Entferne null-Werte

                // Event: Mouseover
                layer.on('mouseover', function (e) {
                    const tooltip = document.getElementById('custom-tooltip');
                    const info = document.getElementById('tooltip-info');

                    info.innerHTML = `
            <strong>${wkName}</strong> (${wkNum})<br>
            Wahlbeteiligung: ${wahlbeteiligung}%
        `;

                    Highcharts.chart('tooltip-chart', {
                        chart: {
                            type: 'column',
                            backgroundColor: 'transparent',
                            height: 150
                        },
                        title: { text: null },
                        xAxis: {
                            categories: parteienDaten.map(p => p.name),
                            labels: { style: { fontSize: '10px' } }
                        },
                        yAxis: {
                            max: 100,
                            tickInterval: 10,
                            title: { text: 'Zweitstimmen (%)' }
                        },
                        plotOptions: {
                            column:{
                                pointPadding: 0.8,
                                groupPadding: 1,
                                borderWidth: 0.5,
                            }
                        },
                        series: [{
                            name: '2025',
                            colorByPoint: false,
                            data: parteienDaten.map(p => ({
                                name: p.name,
                                y: p.value,
                                color: getChartColor(p.name)
                            }))
                        }],
                        credits: { enabled: false },
                        legend: { enabled: false },
                        tooltip: { enabled: false }
                    });

                    tooltip.style.display = 'block';
                });

                // Event: Mausposition folgen
                layer.on('mousemove', function (e) {
                    const tooltip = document.getElementById('custom-tooltip');
                    tooltip.style.left = (e.originalEvent.pageX + 15) + 'px';
                    tooltip.style.top = (e.originalEvent.pageY + 15) + 'px';
                });

                // Event: Mouseout
                layer.on('mouseout', function () {
                    document.getElementById('custom-tooltip').style.display = 'none';
                });
            }
        }).addTo(map);
    });


document.getElementById('wahlkreis-suche').addEventListener('change', function (e) {
    const eingabe = e.target.value;
    const layer = wahlkreisMap[eingabe];

    if (layer) {
        // Zurücksetzen, falls vorher etwas aktiv war und sich geändert hat
        if (activeLayer && activeLayer !== layer) {
            geoLayer.resetStyle(activeLayer);
        }

        // Neuen Layer hervorheben
        layer.setStyle({
            weight: 3,
            color: 'red',
            fillOpacity: 0.8
        });

        // Karte zoomen
        map.fitBounds(layer.getBounds(), { padding: [20, 20] });

        // Optional: Tooltip anzeigen
        layer.fire('mouseover');

        // Aktiven Layer speichern
        activeLayer = layer;
    }
});




