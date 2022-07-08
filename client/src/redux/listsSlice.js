import { createSlice, current } from "@reduxjs/toolkit";

const initialState = [];

export const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    addTodo: (state = initialState, action) => {
      console.log(current(state));

      console.log(action.payload);
      state[action.payload.idx].todoList.push(action.payload.inputText);
    },
    deleteTodo: (state = initialState, action) => {
      state[action.payload.indexOfList].doneList.push(state[action.payload.indexOfList].todoList[action.payload.indexOfCard]);
      state[action.payload.indexOfList].todoList.splice(action.payload.indexOfCard, 1);
    },
    addNewList: (state = initialState, action) => {
      state.push({
        listName: action.payload,
        todoList: [],
        doneList: [],
      });
    },
    deleteList: (state = initialState, action) => {
      return state.filter((item, index) => index !== action.payload);
    },
    editListName: (state = initialState, action) => {
      state[action.payload.index].listName = action.payload.title;
    },
    storeData: (state = initialState, action) => {
      console.log(current(state));
     return (action.payload);
      
    }
  },
});

// Action creators are generated for each case reducer function
export const { addTodo, deleteTodo, addNewList, deleteList, editListName, storeData } = listsSlice.actions;

export default listsSlice.reducer;
