import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Historia} from '../models';
import {HistoriaRepository} from '../repositories';

export class HistoriaController {
  constructor(
    @repository(HistoriaRepository)
    public historiaRepository : HistoriaRepository,
  ) {}

  @post('/historias')
  @response(200, {
    description: 'Historia model instance',
    content: {'application/json': {schema: getModelSchemaRef(Historia)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Historia, {
            title: 'NewHistoria',
            
          }),
        },
      },
    })
    historia: Historia,
  ): Promise<Historia> {
    return this.historiaRepository.create(historia);
  }

  @get('/historias/count')
  @response(200, {
    description: 'Historia model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Historia) where?: Where<Historia>,
  ): Promise<Count> {
    return this.historiaRepository.count(where);
  }

  @get('/historias')
  @response(200, {
    description: 'Array of Historia model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Historia, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Historia) filter?: Filter<Historia>,
  ): Promise<Historia[]> {
    return this.historiaRepository.find(filter);
  }

  @patch('/historias')
  @response(200, {
    description: 'Historia PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Historia, {partial: true}),
        },
      },
    })
    historia: Historia,
    @param.where(Historia) where?: Where<Historia>,
  ): Promise<Count> {
    return this.historiaRepository.updateAll(historia, where);
  }

  @get('/historias/{id}')
  @response(200, {
    description: 'Historia model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Historia, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Historia, {exclude: 'where'}) filter?: FilterExcludingWhere<Historia>
  ): Promise<Historia> {
    return this.historiaRepository.findById(id, filter);
  }

  @patch('/historias/{id}')
  @response(204, {
    description: 'Historia PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Historia, {partial: true}),
        },
      },
    })
    historia: Historia,
  ): Promise<void> {
    await this.historiaRepository.updateById(id, historia);
  }

  @put('/historias/{id}')
  @response(204, {
    description: 'Historia PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() historia: Historia,
  ): Promise<void> {
    await this.historiaRepository.replaceById(id, historia);
  }

  @del('/historias/{id}')
  @response(204, {
    description: 'Historia DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.historiaRepository.deleteById(id);
  }
}
