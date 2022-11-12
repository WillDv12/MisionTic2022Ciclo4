import {Entity, model, property, hasMany} from '@loopback/repository';
import {Propietario} from './propietario.model';
import {JefeOperaciones} from './jefe-operaciones.model';
import {Mecanico} from './mecanico.model';
import {Vehiculo} from './vehiculo.model';

@model({settings: {strict: false}})
export class Sede extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idSede?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  departamento: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @hasMany(() => Propietario)
  propietarios: Propietario[];

  @hasMany(() => JefeOperaciones)
  jefeOperaciones: JefeOperaciones[];

  @hasMany(() => Mecanico)
  mecanicos: Mecanico[];

  @hasMany(() => Vehiculo)
  vehiculos: Vehiculo[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Sede>) {
    super(data);
  }
}

export interface SedeRelations {
  // describe navigational properties here
}

export type SedeWithRelations = Sede & SedeRelations;
