import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Historia, HistoriaRelations, Vehiculo} from '../models';
import {VehiculoRepository} from './vehiculo.repository';

export class HistoriaRepository extends DefaultCrudRepository<
  Historia,
  typeof Historia.prototype.idHistoria,
  HistoriaRelations
> {

  public readonly vehiculo: BelongsToAccessor<Vehiculo, typeof Historia.prototype.idHistoria>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Historia, dataSource);
    this.vehiculo = this.createBelongsToAccessorFor('vehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
  }
}
