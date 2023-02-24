export enum HouseStatus {
  OWN = 'owned',
  RENT = 'mortgaged',
}

export enum MaritalStatus {
  MARRY = 'married',
  SINGLE = 'single',
}

export class Entity {
  age: number;
  dependents: number;
  house: { ownsership_status: HouseStatus };
  income: number;
  marital_status: MaritalStatus;
  risk_questions: [number, number, number];
  vehicle: { year: number };
}
