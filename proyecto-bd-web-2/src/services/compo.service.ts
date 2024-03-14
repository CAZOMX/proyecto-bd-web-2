import { ObjectId } from 'mongoose'
import Categories from '../models/componentes.models'
import { CompoCategory, CompoModel } from '../types/compo.type'
import boom from '@hapi/boom'

class CompoCategoryService {
  async create(category: CompoCategoryService, userId: ObjectId) {
    const newCategory = await Categories.create({
      ...category,
      user: userId
    }).catch((error) => {
      console.log('Could not save category', error)
    })
    const existingmoto = await this.findById((newCategory as any)._id)
    return existingmoto.populate([{path: 'user', strictPopulate: false}])
  }

  async findAll() {
    const categories = await Categories.find()
    .populate([{path: 'user', strictPopulate: false}])
    .catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!categories) {
      throw boom.notFound('There are not categories')
    }

    return categories
  }

  async findById(id: string) {
    const category = await Categories.findById(id).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!category) {
      throw boom.notFound('Category not found')
    }

    return category
  }

  async findByName(name: string) {
    const category = await Categories.findOne({ name }).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!category) {
      throw boom.notFound('Category not found')
    }

    return category
  }

  async findByUser(user: string) {
    try {
    const category = await Categories.find({ user })
    console.log(user)
    if(!category || category.length == 0 ){
      throw new Error("componente no encontrado")
    }
    return category
  } catch (error) {
    console.log('Error al encontrar componentes:', error);
    throw new Error('Error al encontrar Componentes');
    }
  }
}

export default CompoCategoryService