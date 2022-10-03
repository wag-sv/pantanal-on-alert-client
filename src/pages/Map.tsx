import React from 'react';
import 'leaflet/dist/leaflet.css';
import * as turf from '@turf/turf';
import { v4 as uuidv4 } from 'uuid';
import L from 'leaflet';
import {
  MapContainer, TileLayer, GeoJSON, Marker, ZoomControl,
} from 'react-leaflet';
import { getServiceStatus } from '../modules/getServiceStatus';
import { getProperties } from '../modules/getProperties';
import { getFireSpots } from '../modules/getFireSpots';
import { getStatistics } from '../modules/getStatistics';
import { AppContext } from '../contexts/AppContext';
import { Loading } from '../components/Loading';
import { Error } from './Error';
import { StyledPopup } from '../components/StyledPopup';
import { StyledTooltip } from '../components/StyledTooltip';
import { pantanal } from '../polygons/pantanal';
import flame from '../assets/images/flame/flame.svg';
import { MapSideMenu } from '../components/MapSideMenu';
import { Statistics } from '../components/Statistics';
import { Search } from '../components/Search';
import { Layers } from '../components/Layers';
import { colors } from '../resources/theme';

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

// const defaultPantanalStyle = {
//   color: colors.yellow,
//   fillColor: colors.yellow,
//   weight: 1,
//   fillOpacity: 0,
// };

// const defaultPropertyStyle = {
//   color: colors.yellow,
//   fillColor: colors.yellow,
//   weight: 0.2,
//   fillOpacity: 0,
// };

// const hoverPropertyStyle = {
//   color: colors.yellow,
//   fillColor: colors.yellow,
//   weight: 0.1,
//   fillOpacity: 0.5,
// };

// const foundtPropertyStyle = {
//   color: colors.yellow,
//   fillColor: colors.yellow,
//   weight: 1,
//   fillOpacity: 1,
// };

export function Map() {
  const { appState, setAppState }: any = React.useContext(AppContext);
  const [ready, setReady] = React.useState(false);
  const [error, setError] = React.useState('');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [option, setOption] = React.useState('statistics');
  const [tileLayer, setTileLayer] = React.useState('satellite');

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
    setAppState({ properties: properties.data, fireSpots: fireSpots.data, statistics: statistics.data });
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

  const getPantanalPathOptions = () => {
    const color = tileLayer === 'street' ? colors.red : colors.yellow;
    const fillColor = tileLayer === 'street' ? colors.red : colors.yellow;
    const weight = 1;
    const fillOpacity = 0;
    return {
      color, fillColor, weight, fillOpacity,
    };
  };
  const defaultPantanalStyle = getPantanalPathOptions();

  const getPropertiesPathOptions = () => {
    const color = tileLayer === 'street' ? colors.red : colors.yellow;
    const fillColor = tileLayer === 'street' ? colors.red : colors.yellow;
    const weight = searchTerm ? 1 : 0.2;
    const fillOpacity = searchTerm ? 1 : 0;
    return {
      color, fillColor, weight, fillOpacity,
    };
  };
  const defaultPropertyStyle = getPropertiesPathOptions();

  const getPropertiesHoverOptions = () => {
    const color = tileLayer === 'street' ? colors.red : colors.yellow;
    const fillColor = tileLayer === 'street' ? colors.red : colors.yellow;
    const weight = 0.1;
    const fillOpacity = 0.5;
    return {
      color, fillColor, weight, fillOpacity,
    };
  };
  const hoverPropertyStyle = getPropertiesHoverOptions();

  const onEachFeature = (feature: any, layer: any) => {
    if (!searchTerm) {
      layer.on('mouseover', () => layer.setStyle(hoverPropertyStyle));
      layer.on('mouseout', () => layer.setStyle(defaultPropertyStyle));
    }
  };

  const result = !searchTerm
    ? appState.properties
    : appState.properties.filter((property: any) => property.properties.COD_IMOVEL.includes(searchTerm));

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
          zoomControl={false}
          doubleClickZoom
        >
          <ZoomControl position="bottomright" />
          {tileLayer === 'satellite' && <TileLayer url="https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />}
          {tileLayer === 'street' && <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />}
          {tileLayer === 'hybrid' && <TileLayer url="https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}" subdomains={['mt0', 'mt1', 'mt2', 'mt3']} />}

          <GeoJSON data={pantanal} pathOptions={defaultPantanalStyle} />

          {result.map((property: any) => (
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
      <MapSideMenu setOption={setOption} />
      {option === 'statistics' && <Statistics statistics={appState.statistics} setOption={setOption} />}
      {option === 'search' && <Search setSearchTerm={setSearchTerm} setOption={setOption} />}
      {option === 'layers' && <Layers setOption={setOption} setTileLayer={setTileLayer} />}
    </>
  );
}
