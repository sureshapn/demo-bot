import React from "react"
import styled from "styled-components";

const OuterDiv = styled.div`
display: flex;
background-color: rgb(37, 206, 209);
color: rgb(255, 255, 255);
text-align: center;
padding: 0.8rem;
`;

const Title = styled.h1`
font-size: 32px;
width: 100%
`;
export default () =>
    (
        <OuterDiv>
            <Title>Echo Bot</Title>
        </OuterDiv>
    )