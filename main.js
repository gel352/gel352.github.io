// 设置 Mapbox 访问令牌
mapboxgl.accessToken = 'pk.eyJ1Ijoid3l6d2FuZ3lhemhvdSIsImEiOiJjbGc0Z3RiN3Qwa3lhM3JzYWFmdGdsaWtvIn0.g8f6kkGmPIkD1mXGRO9Q2g';

const map = new mapboxgl.Map({
    container: 'map',
    style: {
        version: 8,
        sources: {},
        layers: [
            {
                id: 'background',
                type: 'background',
                paint: {
                    'background-color': '#111111',
                },
            },
        ],
    },
    projection: 'globe',
    center: [116.32, 12.25],
    zoom: 1,
    pitch: 0,
    bearing: 0,
    maxZoom: 25,
    minZoom: 0,
    // attributionControl: false,
});

map.on('load', () => {
    // 设置大气效果
    map.setFog({
        color: 'rgba(135, 206, 250, 0.8)', 
        'horizon-blend': 0.006,              
        'high-color': 'rgba(173, 216, 230, 0.5)', 
        'space-color': '#000000',         
        'star-intensity': 0.6,            
    });
    
  
    
    // map.setFog(null)

    // 添加自定义影像瓦片
    map.addSource('custom-tiles', {
        type: 'raster',
        tiles: ['https://maps-for-free.com/layer/relief/z{z}/row{y}/{z}_{x}-{y}.jpg'],
        tileSize: 256,
        maxzoom: 18
    });

    map.addLayer({
        id: 'custom-tiles-layer',
        type: 'raster',
        source: 'custom-tiles',
        paint: {
            'raster-opacity': 1
        }
    });

    // 添加地形数据并设置地形
    map.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.terrain-rgb',
        tileSize: 256
    });

    map.setTerrain({
        source: 'mapbox-dem',
        exaggeration: 1
    });


    updateCenterCoordinates();

    map.on('move', updateCenterCoordinates);

    // map.on('moveend', updateCenterCoordinates);


});
function updateCenterCoordinates() {
    const center = map.getCenter();
    const lng = center.lng.toFixed(6);  // 保留6位小数
    const lat = center.lat.toFixed(6);

    const lang = document.getElementById("latng");
    lang.innerHTML = `经度: ${lng}  纬度: ${lat}`;
}
map.on('move', () => {
    const zoom = map.getZoom();
    const pitch = map.getPitch();

    const fogIntensity = Math.max(0, Math.min(1, 1 - (zoom - 8) * 0.2 - (pitch - 30) * 0.02));

    if (zoom <= 4) {

        map.setFog({
            color: 'rgba(135, 206, 250, 0.8)', 
            'horizon-blend': 0.006,              
            'high-color': 'rgba(173, 216, 230, 0.5)', 
            'space-color': '#000000',         
            'star-intensity': 0.6,            
        });
    } else {
        map.setFog({
            'color': `rgba(255, 255, 255, ${0.1 + fogIntensity * 0.5})`,
            'high-color': `rgba(255, 255, 255, ${1 + fogIntensity * 0})`,
            'horizon-blend': Math.max(0.2, fogIntensity * 0.4),
            'space-color': `rgba(0, 120, 255, ${1 + fogIntensity * 0})`,
            'star-intensity': 0
        });
    }

});
