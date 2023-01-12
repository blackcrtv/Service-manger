import { configureStore } from '@reduxjs/toolkit'
import controlService from './switch-reducer'

export default configureStore({
  reducer: {
    controlService: controlService
  }
})