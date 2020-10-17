import React from "react"
import styled from "styled-components";

const Wrapper = styled.div`
width: 100%;
height: 100%;
display: flex;
-webkit-box-align: center;
align-items: center;
-webkit-box-pack: center;
justify-content: center;
flex-direction: row;
overflow: hidden;
`;

const TextArea = styled.textarea`
box-sizing: border-box;
resize: none;
outline: none;
width: 90%;
font-size: 1em;
background-color: rgb(255, 255, 255);
color: rgb(90, 90, 90);
border: 1px solid rgb(202, 201, 201);
border-radius: 2em;
padding: 0.9em;
height: 3.2em;
overflow: hidden;
`

const Button = styled.button`
box-sizing: border-box;
width: 10%;
background-color: rgb(255, 255, 255);
color: rgb(90, 90, 90);
border: 1px solid rgb(202, 201, 201);
border-radius: 2em;
height: 3.2em;
`

export default ({handleUserInput, userInput, sendMessage}) =>
    (
        <Wrapper>
            <TextArea
                maxlength="750"
                placeholder="Write reply..."
                pressenterinfo="Press enter to send"
                autocomplete="off"
                onChange={handleUserInput}
                value={userInput} 
            />
            <Button disabled={userInput.trim() === ""} onClick={sendMessage}>Send</Button>
        </Wrapper>
    )