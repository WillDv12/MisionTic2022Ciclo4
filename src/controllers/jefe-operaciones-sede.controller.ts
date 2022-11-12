import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  JefeOperaciones,
  Sede,
} from '../models';
import {JefeOperacionesRepository} from '../repositories';

export class JefeOperacionesSedeController {
  constructor(
    @repository(JefeOperacionesRepository)
    public jefeOperacionesRepository: JefeOperacionesRepository,
  ) { }

  @get('/jefe-operaciones/{id}/sede', {
    responses: {
      '200': {
        description: 'Sede belonging to JefeOperaciones',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Sede)},
          },
        },
      },
    },
  })
  async getSede(
    @param.path.string('id') id: typeof JefeOperaciones.prototype.cedulaJefeOperaciones,
  ): Promise<Sede> {
    return this.jefeOperacionesRepository.sede(id);
  }
}
