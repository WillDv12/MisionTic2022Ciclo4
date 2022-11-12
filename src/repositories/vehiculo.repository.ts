import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Sede, Propietario, Mecanico, Historia} from '../models';
import {SedeRepository} from './sede.repository';
import {PropietarioRepository} from './propietario.repository';
import {MecanicoRepository} from './mecanico.repository';
import {HistoriaRepository} from './historia.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.placa,
  VehiculoRelations
> {

  public readonly sede: BelongsToAccessor<Sede, typeof Vehiculo.prototype.placa>;

  public readonly propietario: BelongsToAccessor<Propietario, typeof Vehiculo.prototype.placa>;

  public readonly mecanico: BelongsToAccessor<Mecanico, typeof Vehiculo.prototype.placa>;

  public readonly historias: HasManyRepositoryFactory<Historia, typeof Vehiculo.prototype.placa>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SedeRepository') protected sedeRepositoryGetter: Getter<SedeRepository>, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>, @repository.getter('MecanicoRepository') protected mecanicoRepositoryGetter: Getter<MecanicoRepository>, @repository.getter('HistoriaRepository') protected historiaRepositoryGetter: Getter<HistoriaRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.historias = this.createHasManyRepositoryFactoryFor('historias', historiaRepositoryGetter,);
    this.registerInclusionResolver('historias', this.historias.inclusionResolver);
    this.mecanico = this.createBelongsToAccessorFor('mecanico', mecanicoRepositoryGetter,);
    this.registerInclusionResolver('mecanico', this.mecanico.inclusionResolver);
    this.propietario = this.createBelongsToAccessorFor('propietario', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietario', this.propietario.inclusionResolver);
    this.sede = this.createBelongsToAccessorFor('sede', sedeRepositoryGetter,);
    this.registerInclusionResolver('sede', this.sede.inclusionResolver);
  }
}
