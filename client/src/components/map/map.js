import React from 'react';
import GoogleMapReact from 'google-map-react';
import '../map/map.css';
import { Icon } from '@iconify/react';
import locationIcon from '@iconify/icons-mdi/map-marker';

const LocationPin = () => (
  <div className='pin'>
    <Icon icon={locationIcon} className='pin-icon' />
  </div>
);

const apiIsLoaded = (map, maps, center) => {
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

const Map = ({ location, zoomLevel }) => {
  console.log(location);
  let temp = { lat: location.center[0], lng: location.center[1] };
  return (
    <div className='map'>
      <div className='google-map'>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCCVzzW0uVIFLXaen-0RaHEgwWzUPG-6vA' }}
          defaultCenter={location.center}
          defaultZoom={zoomLevel}
          onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, temp)}
        ></GoogleMapReact>
      </div>
    </div>
  );
};

export default Map;
