import React from "react"
import styled from "styled-components";
import Input from "./Input"

const Wrapper = styled.div`
display: flex;
    flex-direction: row;
    align-items: flex-end;
    position: relative;
    width: 100%;
    height: 76px;
    border: 0px;
    box-sizing: border-box;
    font-size: 12px;
    flex-shrink: 0;
`;

export default (props) =>
    (
        <Wrapper>
            <Input {...props} />
        </Wrapper>
    )