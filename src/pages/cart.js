import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { changeCount, increase, minusItem } from "./../store"
function Cart() {
    const user = useSelector((state) => { return state.user })
    const cart = useSelector((state) => { return state.cart })
    const dispatch = useDispatch();//store.js로 요청을 보내주는 함수
    return (
        <div>
            <h6>{user.name} {user.age} 의 장바구니</h6>
            <button onClick={() => { dispatch(increase(100)) }}>버튼</button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart.map((e, i) => {
                            return (
                                < tr >
                                    <td>{e.id}</td>
                                    <td>{e.name}</td>
                                    <td>{e.count}</td>
                                    <td><button onClick={() => {
                                        dispatch(changeCount(e.id))
                                    }}>+</button></td>
                                    <td><button onClick={() => {
                                        dispatch(minusItem(e.id))
                                    }}>X</button></td>
                                </tr>
                            )

                        })
                    }

                </tbody>

            </Table>
        </div >
    )
}

export default Cart;