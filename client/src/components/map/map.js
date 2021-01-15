import React from 'react';
import GoogleMapReact from 'google-map-react';
import '../map/map.css';
import { Icon } from '@iconify/react';
import locationIcon from '@iconify/icons-mdi/map-marker';

const LocationPin = ({ text }) => (
  <div className='pin'>
    <Icon icon={locationIcon} className='pin-icon' />
    <p className='pin-text'>{text}</p>
  </div>
);

const Map = ({ location, zoomLevel }) => {
  return (
    <div className='map'>
      <h2 className='map-h2'>This persons location</h2>

      <div className='google-map'>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCCVzzW0uVIFLXaen-0RaHEgwWzUPG-6vA' }}
          defaultCenter={location.center}
          center={location.center}
          defaultZoom={zoomLevel}
        >
          <LocationPin
            lat={location.lat}
            lng={location.lng}
            text={location.address}
          />
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default Map;
