import { Entity, HouseStatus, MaritalStatus } from 'src/core/base/entity';
import { IService } from '../core/base/service';
import { Insurance, IPoints } from '../shared/dto';

export class InsuranceService implements IService<Insurance> {
  execute(data: Entity): Insurance {
    return this.calcInsurance(data);
  }

  private calcInsurance(data: Entity): Insurance {
    const inelegible = this.calcInelegible(data);
    const risk = this.mapRisk(this.calcRisk(data));

    return { ...risk, ...inelegible };
  }

  private calcInelegible(data: Entity): Partial<Insurance> {
    const inelegible = {
      disability: 'eligible',
      auto: 'eligible',
      home: 'eligible',
      life: 'eligible',
    };
    if (!data.income) inelegible.disability = 'ineligible';
    if (!data.vehicle) inelegible.auto = 'ineligible';
    if (!data.house) inelegible.home = 'ineligible';
    if (data.age > 60) {
      inelegible.disability = 'ineligible';
      inelegible.life = 'ineligible';
    }

    for (let i of Object.keys(inelegible)) {
      if (inelegible[i] !== 'ineligible') {
        Reflect.deleteProperty(inelegible, i);
      }
    }

    return inelegible;
  }

  private calcRisk(data: Entity): IPoints {
    let points = { life: 0, disability: 0, home: 0, auto: 0 };
    if (data.age < 30) {
      points = this.addPoints(points, 2);
    }
    if (data.age >= 30 || data.age <= 40) {
      points = this.addPoints(points, 1);
    }
    if (data.income > 200000) {
      points = this.addPoints(points, 1);
    }
    if (data.house.ownsership_status === HouseStatus.RENT) {
      points = this.addPoints(points, 1, ['homeScore', 'disabilityScore']);
    }
    if (data.dependents) {
      points = this.addPoints(points, 1, ['lifeScore', 'disabilityScore']);
    }
    if (data.marital_status === MaritalStatus.MARRY) {
      points = this.addPoints(points, 1, ['lifeScore']);
      points = this.addPoints(points, -1, ['disabilityScore']);
    }
    if (new Date().getFullYear() - data.vehicle.year >= 5) {
      points = this.addPoints(points, 1, ['autoScore']);
    }

    return points;
  }

  private mapRisk(data: IPoints): Insurance {
    const props = {
      disability: 'eligible',
      auto: 'eligible',
      home: 'eligible',
      life: 'eligible',
    };

    for (let i of Object.keys(data)) {
      if (data[i] <= 0) props[i] = 'economic';
      if (data[i] === 1 || data[i] === 2) props[i] = 'regular';
      if (data[i] >= 3) props[i] = 'responsible';
    }

    return props;
  }

  private addPoints(
    data: IPoints,
    quantity: number,
    props: any[] = null,
  ): IPoints {
    if (!props) {
      for (let i of Object.keys(data)) {
        data[i] += quantity;
      }
      return data;
    }
    props.forEach((key) => (data[key] += quantity));
    return data;
  }
}
