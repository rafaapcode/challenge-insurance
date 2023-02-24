import { Entity } from 'src/core/base/entity';
import { IService } from '../core/base/service';
import { Insurance } from '../shared/dto/insurance.dto';

export class InsuranceService implements IService<Insurance> {
  execute(data: Entity): Insurance {
    throw new Error('Method not implemented.');
  }

  calcInegilible(data: Entity) {
    let disability = 'eligible';
    let auto = 'eligible';
    let home = 'eligible';
    if (!data.income) disability = 'ineligible';
    if (!data.vehicle.year) auto = 'ineligible';
    if (!data.house.ownsership_status) home = 'ineligible';
  }
}
