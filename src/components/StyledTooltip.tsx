// FIXME resolver estas pendências do ESLint
/* eslint-disable no-bitwise */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Tooltip } from 'react-leaflet';

export function StyledTooltip({ fireSpot } : any) {
  function ConvertCoordinateFromDDToDMS(coordinateInDecimalDegreesFormat: any) {
    let D = parseFloat(coordinateInDecimalDegreesFormat);
    const Degrees = 0 | D;
    const Minutes = 0 | (((D < 0 ? (D = -D) : D) % 1) * 60);
    const Seconds = 0 | (((D * 60) % 1) * 60);
    const coordinateInDegreesMinutesSecondsFormat = `${Degrees}° ${Minutes}' ${Seconds}"`;
    return coordinateInDegreesMinutesSecondsFormat;
  }

  return (
    <Tooltip>
      <div>Município: {fireSpot.municipio}</div>
      <div>Data: {fireSpot.data_hora.toLocaleString()}</div>
      <div>Latitude: {fireSpot.latitude} ({ConvertCoordinateFromDDToDMS(fireSpot.latitude)})</div>
      <div>Longitude: {fireSpot.longitude} ({ConvertCoordinateFromDDToDMS(parseFloat(fireSpot.longitude))})</div>
      <div>Satélite: {fireSpot.satelite}</div>
    </Tooltip>
  );
}
