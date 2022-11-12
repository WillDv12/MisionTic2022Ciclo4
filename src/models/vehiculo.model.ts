import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Sede} from './sede.model';
import {Propietario} from './propietario.model';
import {Mecanico} from './mecanico.model';
import {Historia} from './historia.model';

@model({settings: {strict: false}})
export class Vehiculo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  placa: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'string',
    required: true,
  })
  marca: string;

  @property({
    type: 'string',
    required: true,
  })
  anio: string;

  @property({
    type: 'string',
    required: true,
  })
  capacidadPasajeros: string;

  @property({
    type: 'string',
    required: true,
  })
  cilindraje: string;

  @property({
    type: 'string',
    required: true,
  })
  paisOrigen: string;

  @property({
    type: 'string',
    required: true,
  })
  caracteristica: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @belongsTo(() => Sede)
  sedeId: string;

  @belongsTo(() => Propietario)
  propietarioId: string;

  @belongsTo(() => Mecanico)
  mecanicoId: string;

  @hasMany(() => Historia)
  historias: Historia[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
