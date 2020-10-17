import React from "react"
import Header from "../Header"
import Chat from "../Chat"
import Footer from "../Footer"
import styled from "styled-components";
import axios from 'axios';


const Wrapper = styled.div`
width: 100%;
background-color: transparent;
position: inherit;
height: 100%;
right: initial;
bottom: initial;
display: flex;
flex-direction: column;
z-index: 0;
`; 

const Container = styled.div`
    flex-direction: column;
    color: rgb(90, 90, 90);
    font-size: 12px;
    width: 100%;
    min-width: 100%;
    max-width: initial;
    display: flex;
    background-color: rgb(255, 255, 255);
    height: 100%;
    position: initial;
`; 

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chat: [],
            isTyping: false,
            userInput: '',
            isSendDisabled: true
        }
        this.scrollRef = React.createRef();
    }

    scrollToBottom = () => {
        this.scrollRef.current.scrollIntoView({ behavior: "smooth" });
      }
      
      componentDidUpdate() {
        this.scrollToBottom();
      }
      

    handleUserInput = (event) => {
        const userInput = event.target.value
        this.setState({userInput})
    }

    sendMessage=() => {
        const chat = [...this.state.chat, {
            userType: "user",
            message: this.state.userInput.trim()
        }]
        this.setState({chat, isTyping: true})
        axios.post(process.env.REACT_APP_apiUrl, { input: this.state.userInput.trim() })
      .then(res => {
        this.setState({chat: [...this.state.chat, res.data.data, ], isTyping: false, userInput: '' })
      })
      .catch(err => {
          this.setState({isTyping: false, userInput: ''})
      })

    }


    render() {
        return (
            <Wrapper>
                <Container>
                    <Header/>
                    <Chat chat={this.state.chat} scrollRef={this.scrollRef}/>
                    <Footer handleUserInput={this.handleUserInput} sendMessage={this.sendMessage} userInput={this.state.userInput}  />
                </Container>
            </Wrapper>
        )
    }

}

export default App