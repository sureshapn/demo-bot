import React from "react"
import styled from "styled-components";
import Message from "./Message"

const Wrapper = styled.div`
    overflow: hidden auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    padding-top: 1em;
    font-size: 12px;
    padding: 0.8rem;
`;

export default ({chat, scrollRef}) =>
    (
        <Wrapper>
            {
                chat.map(({message, userType}, index) => (   
                        <Message key={index} userType={userType} message={message} />
                ))
            }
            <div style={{ float:"left", clear: "both" }}
             ref={scrollRef}>
            </div>
        </Wrapper>
    )