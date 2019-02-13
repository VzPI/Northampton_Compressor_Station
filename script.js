// This isn't necessary but it keeps the editor from thinking L and carto are typos
/* global L, carto */

var map = L.map('map').setView([36.538,-77.515], 14);

// Add base layer
L.tileLayer('https://api.mapbox.com/styles/v1/data-maps/cjejfzobh4dlm2rqphkdjnm2o/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGF0YS1tYXBzIiwiYSI6ImNqZWpmeXhoajNtb2Eyd3FldG93OGpxejgifQ.xzOcuUd0LChdzHktllsAHw', {
  maxZoom: 19
}).addTo(map);

// Initialize Carto
var client = new carto.Client({
  apiKey: 'f18cab8055a91a04b4b9953a1f0c8fec11fc547c',
  username: 'mappinghighlandny'
});


// Initialze source data - emission_pts
var source = new carto.source.SQL('SELECT * FROM emission_pts');

// Create style for the data - emission_pts
var style = new carto.style.CartoCSS(`
  #emission_pts{
    marker-fill-opacity: 0.9;
    marker-line-color: #000000;
    marker-line-width: .5;
    marker-line-opacity: 1;
    marker-placement: point;
    marker-type: ellipse;
    marker-width: 10;
    marker-fill: #FF7433;
    marker-allow-overlap: true;
    }
    `);

// Add style to the data - emission_pts
var layer = new carto.layer.Layer(source, style, {
        featureOverColumns: ['asset_name']
        });

// Add the data to the map as a layer - emission_pts
client.addLayer(layer);
client.getLeafletLayer().addTo(map);

// Add the popup to the map as a layer - emission_pts
var popup = L.popup({ closeButton: false });

        layer.on('featureOver', function (featureEvent) {
            popup.setLatLng(featureEvent.latLng);
            let name = featureEvent.data.asset_name;
            popup.setContent(`
                <h1 style="font-size: 14px; font-weight: bold;"> ${name} </h1>

            `);
            popup.openOn(map);
        });

        layer.on('featureOut', function (featureEvent) {
            popup.removeFrom(map);
        });

// Initialze source data - buffer
var source = new carto.source.SQL('SELECT * FROM table_2m_buffer');

// Create style for the data - buffer
var style = new carto.style.CartoCSS(`
    #table_2m_buffer{
      polygon-fill: #FFFFFF;
      polygon-opacity: 0;
      line-color: #D6301D;
      line-width: 3;
      line-opacity: 1;
      }
        `);

// Add style to the data - buffer
var layer = new carto.layer.Layer(source, style);

// Add the data to the map as a layer - buffer
client.addLayer(layer);
client.getLeafletLayer().addTo(map);


// Initialze source data - project_parcel
var source = new carto.source.SQL('SELECT * FROM project_parcel');

// Create style for the data - project_parcel
var style = new carto.style.CartoCSS(`
    #project_parcel{
      polygon-fill: #FF6600;
      polygon-opacity: 0;
      line-color: #90e5bc;
      line-width: 1.5;
      line-opacity: 1;
      }
        `);
// Add style to the data - project_parcel
var layer = new carto.layer.Layer(source, style);

// Add the data to the map as a layer - project_parcel
client.addLayer(layer);
client.getLeafletLayer().addTo(map);


// Initialze source data - project_extent
var source = new carto.source.SQL('SELECT * FROM project_extent');

// Create style for the data -project_extent
var style = new carto.style.CartoCSS(`
    #project_extent{
      polygon-opacity: 0;
      line-color: #90e5bc;
      line-width: 2.0;
      line-opacity: 0.9;
      }
      `);

// Add style to the data - project extent
var layer = new carto.layer.Layer(source, style, {
                        });

// Add the data to the map as a layer - project_extent
client.addLayer(layer);
client.getLeafletLayer().addTo(map);


function setemisssionpts() {
  source.setQuery('SELECT * FROM emission_pts');
  style.setContent(`
    #emission_pts{
      marker-fill-opacity: 0.9;
      marker-line-color: #000000;
      marker-line-width: .5;
      marker-line-opacity: 1;
      marker-placement: point;
      marker-type: ellipse;
      marker-width: 10;
      marker-fill: #D6301D;
      marker-allow-overlap: true;
      }
      `);
  }


function setbuffer() {
  source.setQuery('SELECT * FROM table_2m_buffer');
  style.setContent(`
    #table_2m_buffer{
      polygon-fill: #FFFFFF;
      polygon-opacity: 0;
      line-color: #FF7433;
      line-width: 6.0;
      line-opacity: 1;
      }
      `);
  }


function setparcel() {
  source.setQuery('SELECT * FROM project_parcel');
  style.setContent(`
    #project_parcel{
      polygon-fill: #FF6600;
      polygon-opacity: 0;
      line-color: #90e5bc;
      line-width: 5.0;
      line-opacity: 1;
      }
    `);
}


function setextent() {
  source.setQuery('SELECT * FROM project_extent');
  style.setContent(`
    #project_extent{
      polygon-opacity: 0;
      line-color: #90e5bc;
      line-width: 5.0;
      line-opacity: 0.9;
      }
      `);
}
