let gridApi;

// Grid Options: Configuration for AG Grid
const gridOptions = {
    columnDefs: [
        { field: "Wahlkreis_Nr", headerName: "Nr", width: 80, sort: 'asc'},
        { field: "Wahlkreis", headerName: "Wahlkreis", width: 600 },
        {
            field: "Wahlbeteiligung_Percent_2025",
            headerName: "Wahlbeteiligung",
            width: 150,
            valueFormatter: (params) => params.value != null ? params.value.toFixed(1) + " %" : ""
        },
        {
            headerName: "CDU/CSU",
            width: 100,
            valueGetter: (params) => params.data["CDU/CSU_Percent_2025"],
            valueFormatter: (params) => params.value != null ? params.value.toFixed(1) + " %" : ""
        },
        {
            field: "SPD_Percent_2025",
            headerName: "SPD",
            width: 90,
            valueFormatter: (params) => params.value != null ? params.value.toFixed(1) + " %" : ""
        },
        {
            field: "AFD_Percent_2025",
            headerName: "AFD",
            width: 90,
            valueFormatter: (params) => params.value != null ? params.value.toFixed(1) + " %" : ""
        },
        {
            field: "GRÜNE_Percent_2025",
            headerName: "Grüne",
            width: 90,
            valueFormatter: (params) => params.value != null ? params.value.toFixed(1) + " %" : ""
        },
        {
            field: "Die_Linke_Percent_2025",
            headerName: "Linke",
            width: 90,
            valueFormatter: (params) => params.value != null ? params.value.toFixed(1) + " %" : ""
        },
        {
            field: "BSW_Percent_2025",
            headerName: "BSW",
            width: 90,
            valueFormatter: (params) => params.value != null ? params.value.toFixed(1) + " %" : ""
        },
        {
            field: "FDP_Percent_2025",
            headerName: "FDP",
            width: 90,
            valueFormatter: (params) => params.value != null ? params.value.toFixed(1) + " %" : ""
        }
    ],
    rowData: []
};

// Create Grid
gridApi = agGrid.createGrid(document.querySelector("#myGrid"), gridOptions);

// Fetch GeoJSON and extract needed properties
fetch("wahlkreise.json")
    .then((response) => response.json())
    .then((geojson) => {
        const extractedData = geojson.features.map(feature => {
            const p = feature.properties;
            return {
                Wahlkreis_Nr: p.Wahlkreis_Nr,
                Wahlkreis: p.Wahlkreis,
                Wahlbeteiligung_Percent_2025: p.Wahlbeteiligung_Percent_2025,
                "CDU/CSU_Percent_2025": p["CDU/CSU_Percent_2025"],
                SPD_Percent_2025: p.SPD_Percent_2025,
                AFD_Percent_2025: p.AFD_Percent_2025,
                GRÜNE_Percent_2025: p.GRÜNE_Percent_2025,
                Die_Linke_Percent_2025: p.Die_Linke_Percent_2025,
                BSW_Percent_2025: p.BSW_Percent_2025,
                FDP_Percent_2025: p.FDP_Percent_2025
            };
        });

        gridApi.setGridOption("rowData", extractedData);

    })
    .catch((error) => {
        console.error("Fehler beim Laden des GeoJSON:", error);
    });