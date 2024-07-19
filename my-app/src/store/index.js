import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: [],
  id: 1,
  obj: {},
  editIsClicked: false,
  showlog: false,
  checkAdd: false,
};

const slice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    add(state, action) {
      state.userData.push(action.payload);
      console.log(state.userData);
    },
    update(state, action) {
      const updatedItems = state.userData.map((item) => {
        if (action.payload.id === item.id) {
          return {
            ...item,
            title: action.payload.title,
            writer: action.payload.writer,
            releasedate: action.payload.releasedate,
            avatar: action.payload.avatar,
          };
        }
        return item;
      });
      state.userData = updatedItems;
    },
    delete(state, action) {
      let i = 0;
      while (i < state.userData.length) {
        if (action.payload.id === state.userData[i].id) {
          let slc = state.userData
            .slice(0, i)
            .concat(state.userData.slice(i + 1));
          state.userData = slc;
          break;
        }
        i++;
      }
    },
    incrementId(state) {
      state.id += 1;
    },
    setObject(state, action) {
      state.obj = action.payload;
    },
    setEditIsClicked(state, action) {
      state.editIsClicked = action.payload;
    },
    setLog(state, action) {
      state.showlog = action.payload;
    },
    setCheckAdd(state, action) {
      state.checkAdd = action.payload;
    },
  },
});
export const userActions = slice.actions;

export default slice.reducer;
