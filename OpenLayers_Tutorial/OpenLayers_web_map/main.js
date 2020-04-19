window.onload=init;

//Attribution Control

const attributionControl = new ol.control.Attribution({
    collapsible: true
})


function init(){
    const map=new ol.Map({
        view:new ol.View({
            center:[0,0],
            zoom:1,
            
            
        }),
        
        target:'js-map',
        controls: ol.control.defaults({attribution: false}).extend([attributionControl])
        
    })

    //Base Layers
    //Openstreet Map Standard
    const openstreetMapStandard = new ol.layer.Tile({
        source:new ol.source.OSM(),
        visible: true,
        title: 'OSMStandard'
    })

    //Openstreet Map Humanitarian
    const openstreetMapHumanitarian = new ol.layer.Tile({
        source: new ol.source.OSM({
            url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        }),
        visible: false,
        title: 'OSMSHumanitarian'
    })

    //Bing Maps Basemap Layer
    const bingMaps = new ol.layer.Tile({
        source: new ol.source.BingMaps({
            key: "AtQfHHFZiihxRDksmgsT75NzE24JQwtN9PXaPEGCAA9Hl1HjKKZd7lBk288tDZP9",
            imagerySet: 'CanvasDark'
        }),
        visible: false,
        title: 'BingMaps'
    })

    //Stamen basemap layer
   const stamenBase = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg'
        }),
        visible: false,
        title: 'Stamen'
    })

     //Base Vector Layers
    //Vector Tile Layer OpenstreetMap
    const openstreetMapVectorTile = new ol.layer.VectorTile({
        source: new ol.source.VectorTile({
            url: 'https://api.maptiler.com/tiles/v3/{z}/{x}/{y}.pbf?key=w5e15HYlgbkWQwXXBfpK',
            format: new ol.format.MVT(),
            attributions: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>' 
            
        }),
        visible: false,
        title: 'VectorTileLayerOpenstreetMap'
    })


    const openstreetMapVectorTileStyles = 'https://api.maptiler.com/maps/fd54e8fb-64c9-42d3-a843-c57a7799227c/style.json?key=w5e15HYlgbkWQwXXBfpK';
    //olms.apply(map,openstreetMapVectorTileStyles);

    //map.addLayer(openstreetMapVectorTile);
    fetch(openstreetMapVectorTileStyles).then(function(response){
        response.json().then(function(glStyle){
            //console.log(glStyle);
            olms.applyStyle(openstreetMapVectorTile, glStyle, 'c8d958ad-ff6d-4678-9730-893520ecf11a');
        });
    });


    //Base Layer Group
    const baseLayerGroup = new ol.layer.Group({
        layers: [
            openstreetMapStandard, openstreetMapHumanitarian, bingMaps, stamenBase, openstreetMapVectorTile
        ]
    })
        
    map.addLayer(baseLayerGroup);



   

    //Layer Switcher Logic for BaseLayers
    const baseLayerElements = document.querySelectorAll('.sidebar > input[type=radio]')
    //console.log(baseLayerElements);
    for(let baseLayerElement of baseLayerElements){
        baseLayerElement.addEventListener('change',function(){
            //console.log(this.value);
            let baseLayerElementvalue = this.value;
            baseLayerGroup.getLayers().forEach(function(element, index, array){
                //console.group(element.get('title'));
                let baseLayerName = element.get('title');
                element.setVisible(baseLayerName === baseLayerElementvalue)
            })
        })
    }


   //map.addLayer(stamenBaseLayer);

    //TileDebug
    const tileDebugLayer = new ol.layer.Tile({
        source: new ol.source.TileDebug(),
        visible: false,
        title: 'TileDebugLayer'
    })

   //tile ArcGIS rest API Layer
   const tileArcGISLayer= new ol.layer.Tile({
       source: new ol.source.TileArcGISRest({
           url: 'http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Population_World/MapServer'
       }),
       visible: false,
       title: 'TileArcGISLayer'
   })
   //map.addLayer(tileArcGISLayer);

   //Static Image OpenstreetMap
   const openstreetMapFragmentStatic = new ol.layer.Image({
        source: new ol.source.ImageStatic({
            url: './data/static_images/openlayers_static_humanitarian.PNG',
            imageExtent: [5022643.370072493, 5045237.675958514, 10057623.685735293, 9990307.62884162 ],
        
        }),
        title: 'openstreetMapFragmentStatic'
    })


    //Vector Layers
    //Central EU_countries GeoJSON Vector Layer
    /*const EUCountriesGeoJSON = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: './data/vector_data/Central_EU_countries_GeoJSON.GEOJSON',
            format: new ol.format.GeoJSON()
        }),
        visible: true
    })

    map.addLayer(EUCountriesGeoJSON);*/

    //Styling of Vector features
    /*const fillStyle = new ol.style.Fill({
        color: [40, 119, 247, 1]
    })


    //Style for Lines
    const strokeStyle = new ol.style.Stroke({
        color: [30, 30, 31, 1],
        width: 1.2,
        linecap:'square',
        //lineJoin: 'bevel',
        lineDash: [1, 6]
    })
    

    const regularShape= new ol.style.RegularShape({
        fill: new ol.style.Fill({
            color: [245, 49, 5, 1]
        }),
        stroke: strokeStyle,
        points: 3,
        radius1: 10,
        radius2: 2
    })


    //Icon MarkerStyle
    const iconMarkerStyle = new ol.style.Icon({
        src: './data/static_images/marker.png',
        size: [100, 100],
        offset: [0, 0],
        opacity: 0.5,
        scale: 0.35,
        color: [10, 98, 240, 1]

    })

    const circleStyle = new ol.style.Circle({
        fill: new ol.style.Fill({
            color: [245, 49, 5, 1]
        }),
        radius: 7,
        stroke: strokeStyle
    })*/

    //Points Style
    const pointStyle = new ol.style.Style({
        image: new ol.style.Circle({
            fill: new ol.style.Fill({
                color: [245, 10, 14, 1]
            }),
            radius: 7,
            stroke: new ol.style.Stroke({
                color: [245, 10, 14, 1],
                width: 2
            })
        })
    })

    //Line Style
    const lineStringStyle = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: [59, 59, 59, 1],
            width: 2
        })
    })
    
    //Polygon Style
    //Blue Polygons
    const blueCountriesStyle = new ol.style.Style({
        fill: new ol.style.Fill({
            color: [56, 41, 194, 1]
        })
    })

    //Purple Polygons
    const purpleCountriesStyle = new ol.style.Style({
        fill: new ol.style.Fill({
            color: [164, 63, 204, 1]
        })
    })
    



    const EUCountriesStyle = function(feature){
        //console.log(feature);
        let geometryType = feature.getGeometry().getType();
        //console.log(feature.getKeys('income'));
        let incomeProperty = feature.get('income');

        //Text Styles
        let featureId = feature.get('id');
        //console.log(featureId);
        let featureIdString = featureId.toString();
        let textStyles = new ol.style.Style({
            text: new ol.style.Text({
                text: featureIdString,
                scale: 1.5,
                fill: new ol.style.Fill({
                    color: [18, 18, 18, 1]
                })
            })
        })

        if(geometryType === 'Point'){
            feature.setStyle([pointStyle, textStyles]);

        }

        if(geometryType === 'LineString'){
            feature.setStyle([lineStringStyle, textStyles]);

        }

        if(geometryType === 'Polygon'){
            //console.log(incomeProperty);
            if(incomeProperty === 'Blue'){
                feature.setStyle([blueCountriesStyle, textStyles]);
            }
            if(incomeProperty === 'Purple'){
                feature.setStyle([purpleCountriesStyle, textStyles]);
            }

        }
    }

    //Central EU Countries GeoJSON VectorImage Layer
    const EUCountriesGeoJSONVectorImage = new ol.layer.VectorImage({
        source: new ol.source.Vector({
            url: './data/vector_data/Central_EU_countries_GeoJSON.GEOJSON',
            format: new ol.format.GeoJSON()
        }),
        visible: false,
        title: 'CentralEUCountriesGeoJSON',
        /*style: new ol.style.Style({
            fill: fillStyle,
            stroke: strokeStyle,
            image: iconMarkerStyle 
        })*/
        style: EUCountriesStyle
    })

    //map.addLayer(EUCountriesGeoJSONVectorImage);


    //HeatMap
    const heatMapOnlineFBUsers = new ol.layer.Heatmap({
        source: new ol.source.Vector({
            url: './data/vector_data/onlineFBUsers.geojson',
            format: new ol.format.GeoJSON()
        }),
        radius: 20,
        blur: 12,
        gradient: ['#00f', '#0ff', '#0f0', '#f00'],
        title: 'OnlineFBUsers',
        visible: false
    })

    //map.addLayer(heatMapOnlineFBUsers);


   //Layer Group
   const layerGroup = new ol.layer.Group({
       layers: [
           tileDebugLayer, tileArcGISLayer, openstreetMapFragmentStatic, EUCountriesGeoJSONVectorImage, heatMapOnlineFBUsers
       ]
   })
   map.addLayer(layerGroup);

   //Layer Switcher Logic for Raster Tile Layer
    const tileRasterLayerElements = document.querySelectorAll('.sidebar > input[type=checkbox]');
   //console.log(tileRasterLayerElements);
   for(let tileRasterLayerElement of tileRasterLayerElements){
       tileRasterLayerElement.addEventListener('change', function(){
           let tileRasterLayerElementValue = this.value;

           layerGroup.getLayers().forEach(function(element, index, array){
               //console.log(element.get('title'));
               if(tileRasterLayerElementValue  === element.get('title')){
                   tileRasterLayer = element;
               }
           })
           this.checked ? tileRasterLayer.setVisible(true):tileRasterLayer.setVisible(false)
       })
   }

    
    /*map.addLayer(openstreetMapFragmentStatic);
    map.on('click', function(e){
        console.log(e.coordinate);
    })*/

    //Vector Feature Popup Information
    const overlayContainerElement = document.querySelector('.overlay-container');
    const overlayLayer = new ol.Overlay({
        element: overlayContainerElement
    })
    map.addOverlay(overlayLayer);
    const overlayFeatureName = document.getElementById('feature-name');
    const overlayFeatureAdditionalInfo = document.getElementById('feature-additional-info');



    //Vector Feature Popup Logic
    map.on('click', function(e){
        overlayLayer.setPosition(undefined);
        map.forEachFeatureAtPixel(e.pixel, function(feature, layer){
            //console.log(feature.getKeys());
            let clickedFeatureName = feature.get('name');
            let clickedFeatureAdditionalInfo = feature.get('additionalinfo');
            //console.log(e.coordinate);
            let clickedCoordinate = e.coordinate;

            //if(clickedFeatureName && clickedFeatureAdditionalInfo != undefined){
                overlayLayer.setPosition(clickedCoordinate);
                overlayFeatureName.innerHTML = clickedFeatureName;
                overlayFeatureAdditionalInfo.innerHTML = clickedFeatureAdditionalInfo;

            //}
        },
        {
            layeerFilter: function(layerCandidate){
                return layerCandidate.get('title') === 'CentralEUCountriesGeoJSON'
            }
        })
    })

}
