import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Vehiculo,
  Historia,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoHistoriaController {
  constructor(
    @repository(VehiculoRepository) protected vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/historias', {
    responses: {
      '200': {
        description: 'Array of Vehiculo has many Historia',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Historia)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Historia>,
  ): Promise<Historia[]> {
    return this.vehiculoRepository.historias(id).find(filter);
  }

  @post('/vehiculos/{id}/historias', {
    responses: {
      '200': {
        description: 'Vehiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Historia)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehiculo.prototype.placa,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Historia, {
            title: 'NewHistoriaInVehiculo',
            exclude: ['idHistoria'],
            optional: ['vehiculoId']
          }),
        },
      },
    }) historia: Omit<Historia, 'idHistoria'>,
  ): Promise<Historia> {
    return this.vehiculoRepository.historias(id).create(historia);
  }

  @patch('/vehiculos/{id}/historias', {
    responses: {
      '200': {
        description: 'Vehiculo.Historia PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Historia, {partial: true}),
        },
      },
    })
    historia: Partial<Historia>,
    @param.query.object('where', getWhereSchemaFor(Historia)) where?: Where<Historia>,
  ): Promise<Count> {
    return this.vehiculoRepository.historias(id).patch(historia, where);
  }

  @del('/vehiculos/{id}/historias', {
    responses: {
      '200': {
        description: 'Vehiculo.Historia DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Historia)) where?: Where<Historia>,
  ): Promise<Count> {
    return this.vehiculoRepository.historias(id).delete(where);
  }
}
