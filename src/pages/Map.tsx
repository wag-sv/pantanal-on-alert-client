import React from 'react';
import 'leaflet/dist/leaflet.css';
import * as turf from '@turf/turf';
import { v4 as uuidv4 } from 'uuid';
import L from 'leaflet';
import {
  MapContainer, TileLayer, GeoJSON, Marker, ZoomControl,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { getServiceStatus } from '../modules/getServiceStatus';
import { getProperties } from '../modules/getProperties';
import { getFireSpots } from '../modules/getFireSpots';
import { getFireScars } from '../modules/getFireScars';
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

export function Map() {
  const { appState, setAppState }: any = React.useContext(AppContext);
  const [ready, setReady] = React.useState(false);
  const [error, setError] = React.useState('');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [option, setOption] = React.useState('statistics');
  const [tileLayer, setTileLayer] = React.useState('satellite');
  const [showProperties, setShowProperties] = React.useState('all');
  const [showScars, setShowScars] = React.useState('none');

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
    const fireScars = await getFireScars();
    if (fireScars.error) {
      setError(fireScars.error);
      return;
    }
    const statistics = await getStatistics();
    if (statistics.error) {
      setError(statistics.error);
      return;
    }
    setAppState({
      properties: properties.data, fireSpots: fireSpots.data, fireScars: fireScars.data, statistics: statistics.data,
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

  const getPantanalPathOptions = () => {
    const color = tileLayer === 'street' ? colors.red : colors.yellow;
    const fillColor = tileLayer === 'street' ? colors.red : colors.yellow;
    const weight = 1;
    const fillOpacity = 0;
    return {
      color, fillColor, weight, fillOpacity,
    };
  };

  const getPropertiesPathOptions = () => {
    if (showProperties === 'priority' || showProperties === 'ignition') {
      const color = tileLayer === 'street' ? colors.orange : colors.orange;
      const fillColor = tileLayer === 'street' ? colors.orange : colors.orange;
      const weight = searchTerm ? 1 : 1;
      const fillOpacity = searchTerm ? 1 : 1;
      return {
        color, fillColor, weight, fillOpacity,
      };
    }
    const color = tileLayer === 'street' ? colors.red : colors.yellow;
    const fillColor = tileLayer === 'street' ? colors.red : colors.yellow;
    const weight = searchTerm ? 1 : 0.2;
    const fillOpacity = searchTerm ? 1 : 0;
    return {
      color, fillColor, weight, fillOpacity,
    };
  };

  const getPropertiesHoverOptions = () => {
    const color = tileLayer === 'street' ? colors.red : colors.yellow;
    const fillColor = tileLayer === 'street' ? colors.red : colors.yellow;
    const weight = 0.1;
    const fillOpacity = 0.5;
    return {
      color, fillColor, weight, fillOpacity,
    };
  };

  const fireScarStyle = {
    color: tileLayer === 'street' ? colors.darkGray : colors.deepRed,
    fillColor: tileLayer === 'street' ? colors.darkGray : colors.deepRed,
    weight: 1,
    fillOpacity: 1,
  };

  const defaultPantanalStyle = getPantanalPathOptions();
  const defaultPropertyStyle = getPropertiesPathOptions();
  const hoverPropertyStyle = getPropertiesHoverOptions();

  const onEachFeature = (feature: any, layer: any) => {
    if (!searchTerm) {
      layer.on('mouseover', () => layer.setStyle(hoverPropertyStyle));
      layer.on('mouseout', () => layer.setStyle(defaultPropertyStyle));
    }
  };

  const result = (function filterProperties() {
    let filtered = [];
    if (showProperties === 'priority') filtered = appState.properties.filter((property: any) => property.priority);
    else if (showProperties === 'ignition') filtered = appState.properties.filter((property: any) => property.ignitionPoint);
    else filtered = appState.properties;
    if (searchTerm) return filtered.filter((property: any) => property.properties.COD_IMOVEL.includes(searchTerm));
    return filtered;
  }());

  const fireScars = (function filterFireScars() {
    if (showScars === '1d') return appState.fireScars.periodOf1day;
    if (showScars === '7d') return appState.fireScars.periodOf7days;
    if (showScars === '15d') return appState.fireScars.periodOf15days;
    if (showScars === '30d') return appState.fireScars.periodOf30days;
    if (showScars === '60d') return appState.fireScars.periodOf60days;
    return [];
  }());

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
          maxZoom={17}
        >
          <ZoomControl position="bottomright" />

          {(tileLayer === 'satellite' || tileLayer === 'hybrid') && <TileLayer url="https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />}
          {tileLayer === 'street' && <TileLayer url="http://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}" />}
          {tileLayer === 'hybrid' && <TileLayer url="http://services.arcgisonline.com/arcgis/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}" />}
          {tileLayer === 'hybrid' && <TileLayer url="http://services.arcgisonline.com/arcgis/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}" />}

          <GeoJSON data={pantanal} pathOptions={defaultPantanalStyle} />

          {result.map((property: any) => (
            <GeoJSON key={uuidv4()} data={property} pathOptions={defaultPropertyStyle} onEachFeature={onEachFeature}>
              <StyledPopup property={property} />
            </GeoJSON>
          ))}

          <MarkerClusterGroup
            chunkedLoading
            removeOutsideVisibleBounds
            maxClusterRadius={(zoom: number) => zoom * 7}
            disableClusteringAtZoom={9}
            showCoverageOnHover={false}
          >
            {appState.fireSpots.map((fireSpot: any) => (
              <Marker key={uuidv4()} position={[fireSpot.latitude, fireSpot.longitude]} icon={flameIcon}>
                <StyledTooltip fireSpot={fireSpot} />
              </Marker>
            ))}
          </MarkerClusterGroup>

          {fireScars.map((fireScar: any) => <GeoJSON key={fireScar.properties.FID} data={fireScar} pathOptions={fireScarStyle} />)}
        </MapContainer>
      ) }
      <MapSideMenu setOption={setOption} />
      {option === 'statistics' && <Statistics statistics={appState.statistics} setOption={setOption} />}
      {option === 'search' && <Search setSearchTerm={setSearchTerm} setOption={setOption} />}
      {option === 'layers' && (
      <Layers
        setOption={setOption}
        tileLayer={tileLayer}
        setTileLayer={setTileLayer}
        showProperties={showProperties}
        setShowProperties={setShowProperties}
        showScars={showScars}
        setShowScars={setShowScars}
        serviceStatus={appState.fireScars.serviceStatus}
      />
      )}
    </>
  );
}
