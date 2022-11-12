import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Sede, SedeRelations, Propietario, JefeOperaciones, Mecanico, Vehiculo} from '../models';
import {PropietarioRepository} from './propietario.repository';
import {JefeOperacionesRepository} from './jefe-operaciones.repository';
import {MecanicoRepository} from './mecanico.repository';
import {VehiculoRepository} from './vehiculo.repository';

export class SedeRepository extends DefaultCrudRepository<
  Sede,
  typeof Sede.prototype.idSede,
  SedeRelations
> {

  public readonly propietarios: HasManyRepositoryFactory<Propietario, typeof Sede.prototype.idSede>;

  public readonly jefeOperaciones: HasManyRepositoryFactory<JefeOperaciones, typeof Sede.prototype.idSede>;

  public readonly mecanicos: HasManyRepositoryFactory<Mecanico, typeof Sede.prototype.idSede>;

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculo, typeof Sede.prototype.idSede>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>, @repository.getter('JefeOperacionesRepository') protected jefeOperacionesRepositoryGetter: Getter<JefeOperacionesRepository>, @repository.getter('MecanicoRepository') protected mecanicoRepositoryGetter: Getter<MecanicoRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Sede, dataSource);
    this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
    this.mecanicos = this.createHasManyRepositoryFactoryFor('mecanicos', mecanicoRepositoryGetter,);
    this.registerInclusionResolver('mecanicos', this.mecanicos.inclusionResolver);
    this.jefeOperaciones = this.createHasManyRepositoryFactoryFor('jefeOperaciones', jefeOperacionesRepositoryGetter,);
    this.registerInclusionResolver('jefeOperaciones', this.jefeOperaciones.inclusionResolver);
    this.propietarios = this.createHasManyRepositoryFactoryFor('propietarios', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietarios', this.propietarios.inclusionResolver);
  }
}
