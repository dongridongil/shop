import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../App.css';
import { Nav } from 'react-bootstrap'
import { useDispatch } from "react-redux";
import { addItem } from "./../store";


const Detail = (props) => {

    const [alert, setAlert] = useState(false);
    const [tab, setTab] = useState(0);
    const { id } = useParams()
    const shoesId = props.shoes.find((x) => {
        return x.id == id;
    })

    useEffect(() => {
        //Array Set 정렬 배열안에서 중복되는 내용 막아주기
        let watch = localStorage.getItem('watched');
        watch = JSON.parse(watch)
        watch.push(shoesId.id)
        watch = new Set(watch)
        watch = Array.from(watch)
        localStorage.setItem('watched', JSON.stringify(watch))
    }, [])

    const dispatch = useDispatch();

    useEffect(() => {
        let a = setTimeout(() => {
            setAlert(true)
        }, 2000)
        return () => {
            clearTimeout(a)
        }
    }, [])


    const [fade, setFade] = useState("")

    useEffect(() => {
        setTimeout(() => { setFade("stop ") }, 100)

        return () => {
            setFade('')
        }
    }, [tab])

    return (
        <div className={`container ${fade}`}>
            {alert == false ? <div className="alert-waring"> 2초이내 구매시 할인</div> : null}
            <div className="row">
                <div className="col-md-6">
                    <img src={`https://codingapple1.github.io/shop/shoes${shoesId.id + 1}.jpg`} width="100%" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{shoesId.title}</h4>
                    <p>{shoesId.content}</p>
                    <p>{shoesId.price.toLocaleString()}</p>
                    <button onClick={() => { dispatch(addItem({ id: shoesId.id, name: shoesId.title, count: 1 })) }} className="btn btn-danger">장바구니</button>
                </div>
            </div>

            <Nav variant="tabs" defaultActiveKey="link0">
                <Nav.Item >
                    <Nav.Link onClick={() => { setTab(0) }} eventKey="link0">상품</Nav.Link>
                </Nav.Item>
                <Nav.Item  >
                    <Nav.Link onClick={() => { setTab(1) }} eventKey="link1">원산지</Nav.Link>
                </Nav.Item>

            </Nav>

            <TabComponent shoesId={shoesId} tab={tab} />


        </div>
    )
}

const TabComponent = ({ tab, shoesId }) => {

    const [fade, setFade] = useState("")

    useEffect(() => {
        setTimeout(() => { setFade("end") }, 100)

        return () => {
            setFade('')
        }
    }, [tab])
    return (
        <div className={`start ${fade}`}>

            {tab === 0 && <div>{shoesId.title}</div>}
            {tab === 1 && <div>{shoesId.content}</div>}

        </div>

    )


}



export default Detail;