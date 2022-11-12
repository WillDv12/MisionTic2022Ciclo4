import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {JefeOperaciones, JefeOperacionesRelations, Sede} from '../models';
import {SedeRepository} from './sede.repository';

export class JefeOperacionesRepository extends DefaultCrudRepository<
  JefeOperaciones,
  typeof JefeOperaciones.prototype.cedulaJefeOperaciones,
  JefeOperacionesRelations
> {

  public readonly sede: BelongsToAccessor<Sede, typeof JefeOperaciones.prototype.cedulaJefeOperaciones>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SedeRepository') protected sedeRepositoryGetter: Getter<SedeRepository>,
  ) {
    super(JefeOperaciones, dataSource);
    this.sede = this.createBelongsToAccessorFor('sede', sedeRepositoryGetter,);
    this.registerInclusionResolver('sede', this.sede.inclusionResolver);
  }
}
