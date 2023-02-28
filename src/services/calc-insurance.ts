import { Entity, HouseStatus, MaritalStatus } from 'src/core/base/entity';
import { IService } from '../core/base/service';
import { Insurance, IPoints } from '../shared/dto';

export class InsuranceService implements IService<Insurance> {
  execute(data: Entity): Insurance {
    throw new Error('Method not implemented.');
  }

  private calcInsurance(data: Entity) {
    let risk = {};
    const inelegible = this.calcInelegible(data);
  }

  private calcInelegible(data: Entity) {
    let inelegible = { 
      disability : 'eligible',
      auto : 'eligible',
      home : 'eligible',
      lifeInsurance : 'eligible'
    };
    if (!data.income) inelegible.disability = 'ineligible';
    if (!data.vehicle) inelegible.auto = 'ineligible';
    if (!data.house) inelegible.home = 'ineligible';
    if(data.age > 60) {
      inelegible.disability  = 'ineligible';
      inelegible.lifeInsurance = 'ineligible';
    }

    for(let i of Object.keys(inelegible)){
      if(inelegible[i] !== 'ineligible'){
        Reflect.deleteProperty(inelegible, i);
      }
    }

    return inelegible;
  }

  private calcRisk(data: Entity){
    let points = {lifeScore: 0, disabilityScore:0, homeScore: 0, autoScore: 0};
    if(data.age < 30) {
      points = this.addPoints(points, 2);
    }
    if(data.age >= 30 || data.age <= 40) {
      points = this.addPoints(points, 1);
    }
    if(data.income > 200000) {
      points = this.addPoints(points, 1);
    } 
    if(data.house.ownsership_status === HouseStatus.RENT) {
      points = this.addPoints(points, 1, ['homeScore', 'disabilityScore']);
    }
    if(data.dependents){
      points = this.addPoints(points, 1, ['lifeScore', 'disabilityScore']);
    }
    if(data.marital_status === MaritalStatus.MARRY) {
      points = this.addPoints(points, 1, ['lifeScore']);
      points = this.addPoints(points, -1, ['disabilityScore']);
    }
    if((new Date().getFullYear() - data.vehicle.year) >= 5) {
      points = this.addPoints(points, 1, ['autoScore']);
    }

    return points;
  }

  private mapRisk(data: IPoints){
    
  }

  private addPoints(data: IPoints, quantity: number, props: any[] = null) {
    if(!props) {
      for(let i of Object.keys(data)) {
        data[i] += quantity;
      }
      return data;
    }
    props.forEach(key => data[key] += quantity);
    return data;
  }
}
