import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import './App.css';
import { useState } from 'react';
import data from './data';

function App() {
  const [shoes] = useState(data);


  return (
    <div className="App">

      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Cart</Nav.Link>

          </Nav>
        </Container>
      </Navbar>

      <div className='main-bg' ></div>

      <div className="container">
        <div className="row">

          {
            shoes.map((e, i) => {
              return (
                <Card shoes={shoes[i]} i={i} />
              )
            })
          }
        </div>
      </div>

    </div>
  );
}

const Card = (props) => {
  return (
    <div className="col-md-4">
      <img src={`https://codingapple1.github.io/shop/shoes${props.i + 1}.jpg`} width="80%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  )
}
export default App;
