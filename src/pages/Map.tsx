import React from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {
  MapContainer, TileLayer, GeoJSON, Marker,
} from 'react-leaflet';
import * as turf from '@turf/turf';
import { v4 as uuidv4 } from 'uuid';
import { AppContext } from '../contexts/AppContext';
import { pantanal } from '../polygons/pantanal';
import flame from '../assets/images/flame/flame.svg';
import { StyledPopup } from '../components/StyledPopup';
import { StyledTooltip } from '../components/StyledTooltip';

const position: L.LatLngExpression = [
  turf.center(turf.multiPolygon(pantanal.features[0].geometry.coordinates)).geometry.coordinates[1],
  turf.center(turf.multiPolygon(pantanal.features[0].geometry.coordinates)).geometry.coordinates[0],
];

const flameIcon = L.icon({
  iconUrl: flame,
  iconSize: [15, 15],
  iconAnchor: [7.5, 15],
  popupAnchor: [0, 15],
});

const defaultPantanalStyle = {
  color: '#fdf117',
  fillColor: '#fdf117',
  weight: 1,
  fillOpacity: 0,
};

const defaultPropertyStyle = {
  color: '#fdf117',
  fillColor: '#fdf117',
  weight: 0.2,
  fillOpacity: 0,
};

const hoverPropertyStyle = {
  color: '#fdf117',
  fillColor: '#fdf117',
  weight: 0.1,
  fillOpacity: 0.5,
};

export function Map() {
  const { appState }: any = React.useContext(AppContext);

  const onEachFeature = (feature: any, layer: any) => {
    layer.on('mouseover', () => layer.setStyle(hoverPropertyStyle));
    layer.on('mouseout', () => layer.setStyle(defaultPropertyStyle));
  };

  return (
    <MapContainer
      id="map"
      center={position}
      zoom={7}
      zoomSnap={1}
    >
      <TileLayer url="https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />

      <GeoJSON data={pantanal} pathOptions={defaultPantanalStyle} />

      {appState.properties.map((property: any) => (
        <GeoJSON key={uuidv4()} data={property} pathOptions={defaultPropertyStyle} onEachFeature={onEachFeature}>
          <StyledPopup property={property} />
        </GeoJSON>
      ))}

      {appState.fireSpots.map((fireSpot: any) => (
        <Marker key={uuidv4()} position={[fireSpot.latitude, fireSpot.longitude]} icon={flameIcon}>
          <StyledTooltip fireSpot={fireSpot} />
        </Marker>
      ))}

    </MapContainer>
  );
}
