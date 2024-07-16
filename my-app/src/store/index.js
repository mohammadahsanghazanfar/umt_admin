

import {createSlice,configureStore} from '@reduxjs/toolkit'

  const initialState={userData:[]}

const slice=createSlice({
    name:'userData',
    initialState,
    reducers:{
        add(state,action){
             state.userData.push(action.payload)
             console.log(state.userData)
        },
        update(state,action){
          const updatedItems=state.userData.map((item)=>{
            if(action.payload.id===item.id){
              return{...item,username:action.payload.username,password:action.payload.password,role:action.payload.role,department:action.payload.department}
            }
            return item
          })
          state.userData=updatedItems
        },
        delete(state,action){
          let i=0;
          while(i<state.userData.length){
            if(action.payload.id===state.userData[i].id){
             let slc=state.userData.slice(0,i).concat(state.userData.slice(i+1))
               state.userData=slc
               break
            } 
            i++
          }
        }
    }
})
  export const userActions=slice.actions
const store=configureStore({
    reducer:{userData: slice.reducer}
})

export default store
