import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import './App.css';
import { useEffect, useState } from 'react';
import data from './data';
import { Routes, Route, useNavigate, Link } from 'react-router-dom'
import Detail from './pages/detail';
import axios from 'axios'
import Cart from './pages/cart';

function App() {

  useEffect(() => {
    const watched = localStorage.getItem('watched');
    if (!watched) {
      localStorage.setItem('watched', JSON.stringify([]))
    }



  }, [])

  const [shoes, setShoes] = useState(data);
  const navigate = useNavigate();
  const [countBtn, setCountBtn] = useState(1);
  const [message, setMessage] = useState("");
  const recently = localStorage.getItem("watched")
  const recentArray = JSON.parse(recently).reverse();
  console.log(recentArray, "recentArray")

  return (
    <div className="App">



      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate("/cart")}>Cart</Nav.Link>

          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={
          <><div className='main-bg'></div><div className="container">
            <div className="row">
              {shoes.map((e, i) => {
                return (

                  <Card shoes={shoes[i]} i={i} key={i} />



                );
              })}
            </div>
            <button onClick={() => {
              setCountBtn(countBtn + 1)

              if (countBtn == 1) {
                axios.get('https://codingapple1.github.io/shop/data2.json').then((result) => {
                  const copy = [...shoes, ...result.data]
                  console.log(copy, "copy")
                  setShoes(copy)
                })
              } else if (countBtn == 2) {
                axios.get('https://codingapple1.github.io/shop/data3.json').then((result) => {
                  const copy = [...shoes, ...result.data]
                  console.log(copy, "copy")
                  setShoes(copy)
                })
              } else if (countBtn > 2) {

                setMessage("더보기할수없습니다.")

              }

            }}>더 보기</button>
            <p>{message}</p>
            <div className='recently-view'>
              최근 본 상품


              <div className='recently-item'>
                {recentArray.map((e, i) => {
                  return <img src={`https://codingapple1.github.io/shop/shoes${e + 1}.jpg`} width="100%" key={i} />
                })}
              </div>
            </div>


          </div></>} />
        <Route path='/detail/:id' element={<Detail shoes={shoes} />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>

    </div>
  );
}


const Card = (props) => {



  return (
    <div className="col-md-4">
      <Link to={`/detail/${props.shoes.id}`} >
        <img src={`https://codingapple1.github.io/shop/shoes${props.i + 1}.jpg`} width="80%" />
      </Link>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  )
}


export default App;
