import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';

@model({settings: {strict: false}})
export class Historia extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idHistoria?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @belongsTo(() => Vehiculo)
  vehiculoId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Historia>) {
    super(data);
  }
}

export interface HistoriaRelations {
  // describe navigational properties here
}

export type HistoriaWithRelations = Historia & HistoriaRelations;
