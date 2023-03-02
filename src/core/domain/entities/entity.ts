import { Entity } from '../../base/entity';

export class UserEntity extends Entity {
  public age: number;
  public dependents: number;
  public house: { ownership_status: string } | null;
  public income: number;
  public marital_status: string;
  public risk_questions: number[];
  public vehicle: { year: number } | null;
}
