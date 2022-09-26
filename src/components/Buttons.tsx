import styled from 'styled-components';
import { devices } from '../resources/devices';

export const AHundredPerCentButton = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    margin: 10px 0px;
    width: 100%;

    button {
        width: 100%;
    }
`;

export const FlexStartButtons = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    margin: 10px 0px;
    width: 100%;

    button {
        width: 100%;
    }

    @media ${devices.tablet} {
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;

        button {
            flex-grow: 1;
        }
    }
`;
