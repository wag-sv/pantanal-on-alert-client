import styled from 'styled-components';

export const GreenButton = styled.button`
    background-color: var(--green);
    border: none;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.16);
    color: var(--white);
    cursor: pointer;
    font-family: "Roboto", sans-serif;
    font-size: 1.6rem;
    font-weight: 700;
    overflow: hidden;
    padding: 20px;
`;

export const YellowButton = styled.button`
    background-color: var(--yellow);
    border: none;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.16);
    color: var(--red);
    cursor: pointer;
    font-family: "Roboto", sans-serif;
    font-size: 1.6rem;
    font-weight: 700;
    overflow: hidden;
    padding: 20px;
`;

// FIXME: colocar a cor utilizada no box-shadow no root
