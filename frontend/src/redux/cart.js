import { createSlice } from '@reduxjs/toolkit'
import { decryptData, encryptData } from '../utility/Functions';

const salt = process.env.REACT_APP_SALT;
function initialiseCart() {
  const items = localStorage.getItem('cartItems');
  if (items === undefined || items === null) {
    localStorage.setItem('cartItems', encryptData([], salt));
  }
}
initialiseCart();


const initialState = decryptData(localStorage.getItem("cartItems"), salt);
console.log(initialState);

//Use return for methods that directly manipulates the state
//Use 'state = ...' for methods that update the state's properties
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setItems(state, action) {
      return action.payload;
    },
    deleteItem(state, action) {
      const items = state.filter(item => item.id !== action.payload);
      return items;
    },
    updateItemQuantity(state, action) {
      const items = [...state];
      items.find(item => item.id === action.payload.id).quantity = action.payload.num;
      state = items;
    },
    updateItemPrice(state, action) {
      const items = [...state];
      items.find(item => item.id === action.payload.id).price = action.payload.num;
      state = items;
    },
    updateItemExtras(state, action) {
      const items = [...state];
      items.find(item => item.id === action.payload.id).extra = action.payload.extra;
      state = items;
    },
    updateItemIngredients(state, action) {
      const items = [...state];
      items.find(item => item.id === action.payload.id).ingredients = action.payload.ingredients;
      state = items;
    },
    updateServingSize(state, action) {
      const items = [...state];
      items.find(item => item.id === action.payload.id).servingSize = action.payload.servingSize;
      state = items;
    },
    clearItems(state, action) {
      const items = [];
      state = items;
    }
  },
})

export const { setItems, deleteItem, updateItemQuantity, updateItemPrice, updateItemExtras, updateItemIngredients, updateServingSize, clearItems } = cartSlice.actions
export default cartSlice.reducer