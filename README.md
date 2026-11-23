# 🗳️ Bundestagswahl 2025 – Interaktives Dashboard

Ein modernes, interaktives Web-Dashboard zur Visualisierung und Analyse der Ergebnisse der Deutschen Bundestagswahl 2025. Die Anwendung kombiniert geografische Daten mit interaktiven Diagrammen und einer durchsuchbaren Datentabelle, um Wahlergebnisse auf Bundes- und Wahlkreisebene übersichtlich darzustellen.

![Dashboard Vorschau](./Demo_WebApp.png)

---

## ✨ Hauptfunktionen

* **🗺️ Interaktive Wahlkreiskarte (Leaflet & Mapbox):**
  * Farbliche Darstellung der stimmenstärksten Partei pro Wahlkreis auf Basis von GeoJSON-Daten (`wahlkreise.json`).
  * **Live-Tooltips:** Beim Überfahren eines Wahlkreises erscheint ein dynamisches Popup mit der Wahlbeteiligung sowie einem eingebetteten Balkendiagramm der Zweitstimmen-Verteilung.
* **🔍 Wahlkreis-Suche mit Auto-Complete:**
  * Über die Suchleiste in der Navigationsleiste können gezielt Wahlkreise (nach Name oder Nummer) gesucht werden.
  * Bei Auswahl zoomt die Karte automatisch auf den entsprechenden Wahlkreis, hebt ihn visuell hervor und öffnet die Detailansicht.
* **📊 Amtliches Endergebnis & Vergleich (Highcharts):**
  * Gegenüberstellung der Zweitstimmenanteile (2021 vs. 2025) für CDU/CSU, AfD, SPD, Grüne, Die Linke, BSW und FDP auf Basis von `deutschland.json`.
  * Anzeige der gesamten Wahlbeteiligung im Vergleich zur vorherigen Wahl.
* **🏛️ Sitzverteilung & Koalitionsrechner (Highcharts):**
  * **Sitzverteilung:** Halbkreis-Diagramm (Semi-Circle Donut) der im Bundestag vertretenen Fraktionen.
  * **Mögliche Koalitionen:** Gestapeltes Balkendiagramm zur Visualisierung potenzieller Regierungsbündnisse (z. B. Große Koalition, Kenia-Koalition, Schwarz-Blau, Rot-Rot-Grün, Rot-Grün) inklusive einer Markierungslinie für die erforderliche Mehrheit (315 Sitze).
* **📋 Sortierbare Wahlkreis-Tabelle (AG Grid):**
  * Tabellarische Übersicht aller Wahlkreise inklusive Wahlkreisnummer, Wahlbeteiligung und den prozentualen Zweitstimmenanteilen aller relevanten Parteien.

---

## 🛠️ Verwendete Technologien & Bibliotheken

* **Frontend:** HTML5, CSS3 (CSS Grid, Flexbox, Custom Properties / CSS-Variablen), Vanilla JavaScript (ES6+)
* **Karten & Geodaten:** [Leaflet.js](https://leafletjs.com/) (v1.9.4), [Mapbox GL / Tiles API](https://www.mapbox.com/), GeoJSON
* **Datenvisualisierung:** [Highcharts](https://www.highcharts.com/)
* **Datentabelle:** [AG Grid Community](https://www.ag-grid.com/) (v34.0.1)
* **Icons & Typografie:** Google Fonts (*Noto Sans*, *Roboto*) & *Material Icons / Symbols Sharp*

---

## 📁 Projektstruktur

```text
├── .idea/                  # IDE-Konfigurationsdateien
├── images/                 # Bild- und Grafik-Assets des Projekts
│   ├── icons/              # Benutzeroberflächen- und Karten-Icons
│   ├── logos/              # Parteilogos (Union, AfD, SPD, Grüne, Die Linke etc.)
│   └── wahlkreise.svg      # Vektorgrafik der deutschen Wahlkreise
├── node_modules/           
├── pages/                  # HTML-Seiten und zugehörige GeoJSON-Datensätze
│   ├── Dashboard_2.html    # Haupt-HTML-Dokument des Dashboards
│   ├── deutschland.json    # Aggregierte Wahldaten auf Bundesebene (2021 & 2025)
│   └── wahlkreise.json     # GeoJSON-Polygone und Wahldaten der einzelnen Wahlkreise
├── Demo_WebApp.png         
├── README.md               # Projektdokumentation
├── charts.js               # Logik für Highcharts (Endergebnis, Sitzverteilung, Koalitionen)
├── dashboard-2.css         # Stylesheet für das CSS-Grid-Layout, Farbschema und UI-Komponenten
├── img.png                 # Zusätzliches Bild-Asset
├── logo.svg                # Hauptlogo der Anwendung
├── map.js                  # Leaflet-Karteninitialisierung, GeoJSON-Layer, Suche & Hover-Tooltips
├── package-lock.json       
├── package.json            
├── profil.jpg              
└── table.js                # Konfiguration und Daten-Mapping für die AG Grid Tabelle
```

---

