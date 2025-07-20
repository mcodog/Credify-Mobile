import { configureStore } from '@reduxjs/toolkit'
import nameReducer from './Slice/nameSlice'

export default configureStore({
  reducer: {
    name: nameReducer,
  },
})
