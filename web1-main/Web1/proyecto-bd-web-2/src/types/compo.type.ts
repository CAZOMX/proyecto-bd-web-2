import type { Model } from 'mongoose'

export type CompoCategory = {
  id?: string
  name: string
  description?: string
  stock: number
  brand: string
};


export type CompoModel = Model<CompoCategory>