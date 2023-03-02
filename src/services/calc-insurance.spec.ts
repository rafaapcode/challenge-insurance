import { InsuranceService } from './calc-insurance';

test('Calculate the insurance', () => {
  const sut = new InsuranceService();
  const dataclients = {
    age: 35,
    dependents: 2,
    house: { ownership_status: 'owned' },
    income: 0,
    marital_status: 'married',
    risk_questions: [0, 1, 0],
    vehicle: { year: 2018 },
  };
  const insurance = sut.execute(dataclients);
  const response = {
    auto: 'regular',
    disability: 'ineligible',
    home: 'regular',
    life: 'responsible',
  };
  expect(insurance).toEqual(response);
});
