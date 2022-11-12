import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Sede} from './sede.model';

@model({settings: {strict: false}})
export class JefeOperaciones extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  cedulaJefeOperaciones: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaNacimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  contrasenia: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  nivelEstudio: string;

  @belongsTo(() => Sede)
  sedeId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<JefeOperaciones>) {
    super(data);
  }
}

export interface JefeOperacionesRelations {
  // describe navigational properties here
}

export type JefeOperacionesWithRelations = JefeOperaciones & JefeOperacionesRelations;
