import styled from 'styled-components';
import { colors } from '../resources/theme';

export const GreenButton = styled.button`
    background-color: ${colors.green};
    border: none;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.16);
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
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.16);
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
    background-color: transparent;
    border: none;
    display: block;
    margin: 10px 0px;
    width: 100%;

    a {
        align-items: center;
        background-color: ${colors.hover};
        color: ${colors.white};
        cursor: pointer;
        display: flex;
        font-size: 1.3rem;
        font-weight: 400;
        height: 35px;
        justify-content: center;
        padding: 0px 10px;
        text-decoration: none;
    }

    &:hover {
        transform: scale(1.03);
    }
`;

// FIXME: colocar a cor utilizada no box-shadow no root
