import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import './App.css';
import { useEffect, useState } from 'react';
import data from './data';
import { Routes, Route, useNavigate, Link } from 'react-router-dom'
import Detail from './pages/detail';
import axios from 'axios'
import Cart from './pages/cart';
import { useQuery } from 'react-query';

function App() {

  useEffect(() => {
    const watched = localStorage.getItem('watched');
    if (watched === null) {
      localStorage.setItem('watched', JSON.stringify([]));
    }
  }, []);

  const recently = localStorage.getItem("watched");
  const recentArray = JSON.parse(recently || "[]").reverse();




  const [user, setUser] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId == null) { //로컬스토리지에 저장된 아이디가없으면 로그인
      login();

    }
    if (userId) { // 로컬스토리지에 userId가 존재하는 경우
      setUser(userId);
    }
  }, [])

  const login = () => {
    const newUserId = prompt('닉네임을 입력해주세요!');
    localStorage.setItem('userId', newUserId);
    setUser(newUserId);
    alert('닉네임이 저장되었습니다.')
  }

  const logout = () => {
    localStorage.removeItem('userId');
    setUser('');
    alert("로그아웃 되었습니다.")
  }






  const [shoes, setShoes] = useState(data);
  const navigate = useNavigate();
  const [countBtn, setCountBtn] = useState(1);
  const [message, setMessage] = useState("");


  //useQuery 장점 (틈만나면 재요청함 , 실패시 재시도 알아서해줌 ,요청 시간도 조절가능{staleTime:2000}  )
  // const result = useQuery('user', () => {
  //   return axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
  //     return a.data
  //   })
  // })



  return (
    <div className="App">

      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate("/cart")}>Cart</Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
            {user ? ` ${user} 님 ` : <button onClick={login}>로그인</button>}
            {user && <button className="auto" onClick={logout}>로그아웃</button>}
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
      <p>{props.shoes.price.toLocaleString()}</p>
    </div>
  )
}


export default App;
