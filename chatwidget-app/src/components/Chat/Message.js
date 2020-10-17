import React from "react"
import styled from "styled-components";

const userStyle = `
align-self: flex-end;
padding: 1em;
margin-right: 0px;
box-shadow: rgba(50, 50, 50, 0.1) 0px 0.2em 0.3em;
border-radius: 2em 2em 0px;
background: rgb(245, 249, 252);
color: rgb(141, 141, 141);
border: 0px;
max-width: 35%;
`

const botStyle = `
acolor: rgb(141, 141, 141);
box-shadow: rgba(50, 50, 50, 0.2) 0px 0.2em 0.4em;
border-radius: 2em 2em 2em 0px;
margin-left: 0px;
background: rgb(250, 250, 250);
border: 0px;
`
const Wrapper = styled.div`
${props => props.userType === 'user' && userStyle}
${props => props.userType === 'bot' && botStyle}
    flex-shrink: 0;
    word-break: break-word;
    position: relative;
    display: inline-block;
    max-width: calc(100% - 5em);
    width: max-content;
    box-shadow: rgba(50, 50, 50, 0.2) 0px 0.2em 0.3em;
    margin-top: 0.7em;
    margin-bottom: 0.3em;
    padding: 0.7em;
`;


export default ({userType, message}) =>
    (
        <Wrapper userType={userType}>
            <span>{message}</span>
        </Wrapper>
    )