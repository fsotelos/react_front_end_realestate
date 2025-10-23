import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Map = ({ address, className = "map-container" }) => {
  // Default coordinates (you can implement geocoding later)
  const defaultCenter = [40.7128, -74.0060]; // New York City coordinates as default

  // Simple geocoding simulation - in a real app, you'd use a geocoding service
  const getCoordinatesFromAddress = (address) => {
    // This is a placeholder - implement proper geocoding
    // For now, return default coordinates
    return defaultCenter;
  };

  const position = getCoordinatesFromAddress(address);

  return (
    <div className={className}>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            <strong>Property Location</strong><br />
            {address}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;