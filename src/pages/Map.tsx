import React from 'react';
import 'leaflet/dist/leaflet.css';
import * as turf from '@turf/turf';
import { v4 as uuidv4 } from 'uuid';
import L from 'leaflet';
import {
  MapContainer, TileLayer, GeoJSON, Marker,
} from 'react-leaflet';
import { AppContext } from '../contexts/AppContext';
import { api } from '../Services/api';
import { Loading } from '../components/Loading';
import { StyledPopup } from '../components/StyledPopup';
import { StyledTooltip } from '../components/StyledTooltip';
import { pantanal } from '../polygons/pantanal';
import flame from '../assets/images/flame/flame.svg';
import { Error } from './Error';

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
  const { appState, setAppState }: any = React.useContext(AppContext);
  const [ready, setReady] = React.useState(false);
  const [error, setError] = React.useState('');

  async function getServiceStatus() {
    try {
      const response = await api.get('/serviceStatus');
      const serviceStatus = response.data;
      if (serviceStatus !== 0 && serviceStatus !== 1) return { error: 'Não foi possível identificar o status do serviço.' };
      if (serviceStatus === 0) return { error: 'Dados de satélites indisponíveis no momento.' };
      return { error: null };
    } catch (err) {
      return { error: 'Erro de comunicação com o servidor. (001).' };
    }
  }

  async function getProperties() {
    try {
      const response = await api.get('/properties');
      const properties = response.data.activeProperties;
      return { data: properties, error: null };
    } catch (err) {
      return { data: null, error: 'Erro de comunicação com o servidor. (002).' };
    }
  }

  async function getFireSpots() {
    try {
      const response = await api.get('/fireSpots');
      const fireSpots = response.data;
      return { data: fireSpots, error: null };
    } catch (err) {
      return { data: null, error: 'Erro de comunicação com o servidor. (003).' };
    }
  }

  async function getStatistics() {
    try {
      const response = await api.get('/statistics');
      const statistics = response.data;
      return { data: statistics, error: null };
    } catch (err) {
      return { data: null, error: 'Erro de comunicação com o servidor. (004).' };
    }
  }

  const getData = async () => {
    const serviceStatus = await getServiceStatus();
    if (serviceStatus.error) {
      setError(serviceStatus.error);
      return;
    }

    const properties = await getProperties();
    if (properties.error) {
      setError(properties.error);
      return;
    }

    const fireSpots = await getFireSpots();
    if (fireSpots.error) {
      setError(fireSpots.error);
      return;
    }

    const statistics = await getStatistics();
    if (statistics.error) {
      setError(statistics.error);
      return;
    }

    setAppState({
      properties: properties.data,
      fireSpots: fireSpots.data,
      statistics: statistics.data,
    });
  };

  React.useEffect(() => {
    const runGetData = async () => {
      const properties = appState.properties.length > 0;
      const fireSpots = appState.fireSpots.length > 0;
      const statistics = appState.statistics.fireSpots && appState.statistics.affectedMunicipalities && appState.statistics.affectedProperties;
      if (!properties || !fireSpots || !statistics) await getData();
      setReady(true);
    };
    runGetData();
  }, []);

  const onEachFeature = (feature: any, layer: any) => {
    layer.on('mouseover', () => layer.setStyle(hoverPropertyStyle));
    layer.on('mouseout', () => layer.setStyle(defaultPropertyStyle));
  };

  return (
    <>
      {!ready && <Loading />}
      {ready && error && <Error error={error} /> }
      {ready && !error && (
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
      ) }
    </>
  );
}
