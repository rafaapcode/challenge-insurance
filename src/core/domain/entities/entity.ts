import { Entity, HouseStatus, MaritalStatus } from '../../base/entity';

export class UserEntity extends Entity {
  public age: number;
  public dependents: number;
  public house: { ownsership_status: HouseStatus } | null;
  public income: number;
  public marital_status: MaritalStatus;
  public risk_questions: [number, number, number];
  public vehicle: { year: number } | null;
}
