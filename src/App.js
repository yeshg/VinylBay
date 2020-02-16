import React, { Component } from 'react'
import './App.css';
import Authenticate from "./Authenticate"
import NavigationBar from './NavigationBar';
import NavigationBarMinimal from './NavigationBarMinimal'
import { Button } from 'react-bootstrap'
import { Container } from 'react-bootstrap'



// function App() {

//   return (
//       <div>
//           <MenuBar></MenuBar>
//           <h1 style={{ textAlign: "center" }}>Subscribe</h1>
//           <hr></hr>
//           <Container>
//               <WebForm></WebForm>
//           </Container>
//       </div>
//   );
// }

// export default App;

class App extends Component {

  constructor(props) {

    super(props);
    this.state = {
    };
  }

  handle_authentication = (username) => {
    this.props.sendAuthentication(username)
  }

  submitClick = event => {
      event.preventDefault()
      alert("Form submitted")
  }
  render() {
      return (
          <div>
              <NavigationBarMinimal></NavigationBarMinimal>
              <hr></hr>
                <h1 style={{ textAlign: "center" }}>Log In / Sign Up</h1>
                <hr></hr>
              <Container>
                  <Authenticate sendAuthentication={this.handle_authentication} unauthenticate={this.props.unauthenticate}></Authenticate>
              </Container>
          </div>
      )
  }
}

export default App