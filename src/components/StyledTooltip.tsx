/* eslint-disable no-bitwise */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import styled from 'styled-components';
import { Tooltip } from 'react-leaflet';
import { colors } from '../resources/theme';

export const Item = styled.p`
    color: ${colors.red};
    font-size: 1.3rem;
    font-weight: 400;
`;

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
      <Item>Município: {fireSpot.municipio}</Item>
      <Item>Data: {fireSpot.data_hora.toLocaleString()}</Item>
      <Item>Latitude: {fireSpot.latitude} ({ConvertCoordinateFromDDToDMS(fireSpot.latitude)})</Item>
      <Item>Longitude: {fireSpot.longitude} ({ConvertCoordinateFromDDToDMS(parseFloat(fireSpot.longitude))})</Item>
      <Item>Satélite: {fireSpot.satelite}</Item>
    </Tooltip>
  );
}
