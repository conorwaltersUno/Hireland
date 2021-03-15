import React from 'react';
import GoogleMapReact from 'google-map-react';
import '../map/map.css';

const apiIsLoaded = (map, maps, center) => {
  // eslint-disable-next-line
  const circle = new maps.Circle({
    strokeColor: '#3AAFA9',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#3AAFA9',
    fillOpacity: 0.3,
    map,
    center: center,
    radius: 275,
  });
};

//params: location - contains longitude, latitude and center
//        zoomLevel - The zoom level of the map
const Map = ({ location, zoomLevel }) => {
  let tempObj = { lat: location.center[0], lng: location.center[1] };
  return (
    <div className='map'>
      <div className='google-map'>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCCVzzW0uVIFLXaen-0RaHEgwWzUPG-6vA' }}
          defaultCenter={location.center}
          defaultZoom={zoomLevel}
          onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, tempObj)}
        ></GoogleMapReact>
      </div>
    </div>
  );
};

export default Map;
