import { Schema, model } from 'mongoose'
import { CompoCategory, CompoModel } from '../types/compo.type'

const Categories = new Schema<CompoCategory, CompoModel>({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  stock: {
    type: Number,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  }
})



export default model('CompoCategory', Categories)