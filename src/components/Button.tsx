import styled from 'styled-components';
import { colors } from '../resources/theme';

export const GreenButton = styled.button`
    background-color: ${colors.green};
    border: none;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.5);
    color: ${colors.white};
    cursor: pointer;
    font-family: "Roboto", sans-serif;
    font-size: 1.6rem;
    font-weight: 700;
    overflow: hidden;
    padding: 20px;
    
    &:hover {
        transform: scale(1.03);
    }
`;

export const YellowButton = styled.button`
    background-color: ${colors.yellow};
    border: none;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.5);
    color: ${colors.red};
    cursor: pointer;
    font-family: "Roboto", sans-serif;
    font-size: 1.6rem;
    font-weight: 700;
    overflow: hidden;
    padding: 20px;

    &:hover {
        transform: scale(1.03);
    }
`;

export const LinkButton = styled.button`
    background-color: ${colors.darkRed};
    border: none;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.5);
    color: ${colors.white};
    cursor: pointer;
    font-family: "Roboto", sans-serif;
    font-size: 1.3rem;
    font-weight: 400;
    overflow: hidden;
    padding: 7px;

    a {
        text-decoration: none;
        color: ${colors.white};
    }

    &:hover {
        transform: scale(1.03);
    }
`;

export const SmallYellowButton = styled.button`
    background-color: ${colors.yellow};
    border: none;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.5);
    color: ${colors.red};
    cursor: pointer;
    font-family: "Roboto", sans-serif;
    font-size: 1.3rem;
    font-weight: 700;
    overflow: hidden;
    padding: 10px;

    &:hover {
        transform: scale(1.03);
    }
`;

export const SmallGreenButton = styled.button`
    background-color: ${colors.green};
    border: none;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.5);
    color: ${colors.white};
    cursor: pointer;
    font-family: "Roboto", sans-serif;
    font-size: 1.3rem;
    font-weight: 700;
    overflow: hidden;
    padding: 10px;

    &:hover {
        transform: scale(1.03);
    }
`;

export const SmallRedButton = styled.button`
    background-color: ${colors.red};
    border: none;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.5);
    color: ${colors.white};
    cursor: pointer;
    font-family: "Roboto", sans-serif;
    font-size: 1.3rem;
    font-weight: 700;
    overflow: hidden;
    padding: 10px;

    &:hover {
        transform: scale(1.03);
    }
`;
