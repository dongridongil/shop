import { configureStore, createSlice } from '@reduxjs/toolkit'

//useState 역할임
const user = createSlice({
    name: 'user',
    initialState: { name: "kim", age: 20 },
    reducers: { //state 수정해주는 함수
        changeName(state) { // () 에들어가는것은 기존 state
            state.name = "park"
        },
        increase(state, a) {
            state.age += a.payload;
        }
    }
})

export const { changeName, increase } = user.actions;


const cart = createSlice({

    name: 'cart',
    initialState:
        [
            { id: 1, name: 'White and Black', count: 1 },
            { id: 2, name: 'Grey Yordan', count: 1 }
        ],
    reducers: {
        changeCount(state, action) {
            const number = state.findIndex((a) => { return a.id === action.payload })
            state[number].count++
        },
        addItem(state, action) {
            const { id, name } = action.payload;
            const existingItem = state.find(item => item.name === name);
            if (existingItem) {
                // 이미 있는 상품인 경우 count만 증가시킴
                existingItem.count += 1;
            } else {
                // 새로운 상품을 추가함
                state.push({ id, name, count: 1 });
            }
        },

        minusItem(state, action) {
            const number = state.findIndex((a) => { return a.id === action.payload })
            state.splice(number, 1)
        }



    }
}
)

export const { changeCount, addItem, minusItem } = cart.actions;

export default configureStore({
    //등록을해야 사용이가능
    reducer: {
        user: user.reducer,
        cart: cart.reducer


    }
}) 