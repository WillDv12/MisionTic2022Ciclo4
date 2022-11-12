import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Historia,
  Vehiculo,
} from '../models';
import {HistoriaRepository} from '../repositories';

export class HistoriaVehiculoController {
  constructor(
    @repository(HistoriaRepository)
    public historiaRepository: HistoriaRepository,
  ) { }

  @get('/historias/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Vehiculo belonging to Historia',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async getVehiculo(
    @param.path.string('id') id: typeof Historia.prototype.idHistoria,
  ): Promise<Vehiculo> {
    return this.historiaRepository.vehiculo(id);
  }
}
