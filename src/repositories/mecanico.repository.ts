import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Mecanico, MecanicoRelations, Sede, Vehiculo} from '../models';
import {SedeRepository} from './sede.repository';
import {VehiculoRepository} from './vehiculo.repository';

export class MecanicoRepository extends DefaultCrudRepository<
  Mecanico,
  typeof Mecanico.prototype.cedulaMecanico,
  MecanicoRelations
> {

  public readonly sede: BelongsToAccessor<Sede, typeof Mecanico.prototype.cedulaMecanico>;

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculo, typeof Mecanico.prototype.cedulaMecanico>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SedeRepository') protected sedeRepositoryGetter: Getter<SedeRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Mecanico, dataSource);
    this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
    this.sede = this.createBelongsToAccessorFor('sede', sedeRepositoryGetter,);
    this.registerInclusionResolver('sede', this.sede.inclusionResolver);
  }
}
