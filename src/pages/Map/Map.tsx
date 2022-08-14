import React from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {
  MapContainer, LayersControl, TileLayer, LayerGroup, GeoJSON, Marker,
} from 'react-leaflet';
import * as turf from '@turf/turf';
import { v4 as uuidv4 } from 'uuid';
import { AppContext } from '../../contexts/AppContext';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../Services/api';
import { pantanal } from '../../polygons/pantanal';
import flame from '../../assets/images/flame/flame.svg';
import { Loading } from '../../components/Loading';

const {
  BaseLayer,
  // Overlay,
} = LayersControl;

const mapCenterPosition: L.LatLngExpression = [
  turf.center(turf.multiPolygon(pantanal.features[0].geometry.coordinates)).geometry.coordinates[1],
  turf.center(turf.multiPolygon(pantanal.features[0].geometry.coordinates)).geometry.coordinates[0],
];

const flameIcon = L.icon({
  iconUrl: flame,
  iconSize: [15, 15],
  iconAnchor: [7.5, 15],
  popupAnchor: [0, 15],
});

const pantanalOptions = {
  color: '#fdf117',
  fillColor: '#fdf117',
  weight: 1,
  fillOpacity: 0,
};

const propertiesOptions = {
  color: '#fdf117',
  fillColor: '#fdf117',
  weight: 0.2,
  fillOpacity: 0,
};

export function Map() {
  const { appState, setAppState }: any = React.useContext(AppContext);
  const { authenticatedUser, setAuthenticatedUser }: any = React.useContext(AuthContext);
  const [subscribing, setSubscribing] = React.useState(false);

  const refreshUser = async () => {
    if (authenticatedUser.token) {
      const response = await api.post('/refresh_user', authenticatedUser.user);
      setAuthenticatedUser({ ...response.data });
      localStorage.setItem('authenticatedUser', JSON.stringify({ ...response.data }));
    }
  };

  React.useEffect(() => { refreshUser(); }, []);

  return (
    <MapContainer
      id="map"
      center={mapCenterPosition}
      zoom={7}
      zoomSnap={1}
    >
      {subscribing && <Loading />}
      {/* <LayersControl>
        <Overlay checked name="World Transportation">
          <TileLayer url="http://services.arcgisonline.com/arcgis/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}" />
        </Overlay>
        <Overlay checked name="World Boundaries and Places">
          <TileLayer url="http://services.arcgisonline.com/arcgis/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}" />
        </Overlay>
      </LayersControl> */}

      <LayersControl>
        <BaseLayer checked name="World Imagery">
          <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
        </BaseLayer>

        {/* <BaseLayer checked name="World Street Map">
          <TileLayer url="http://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}" />
        </BaseLayer> */}

        {/* <BaseLayer checked name="World Topo Map">
          <TileLayer url="http://services.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}" />
        </BaseLayer> */}
      </LayersControl>

      <LayerGroup>
        <GeoJSON data={pantanal} pathOptions={pantanalOptions} />
      </LayerGroup>

      <LayerGroup>
        {appState.properties.map((property: any) => (
          <GeoJSON key={uuidv4()} data={property} pathOptions={propertiesOptions} />
        ))}
      </LayerGroup>

      <LayerGroup>
        {appState.fireSpots.map((fireSpot: any) => (
          <Marker key={uuidv4()} position={[fireSpot.latitude, fireSpot.longitude]} icon={flameIcon} />
        ))}
      </LayerGroup>

    </MapContainer>
  );
}
