import { Test, TestingModule } from '@nestjs/testing';
import { InsuranceController } from './insurance-controller';

describe('InsuranceController', () => {
  let insuranceController: InsuranceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InsuranceController],
    }).compile();

    insuranceController = module.get<InsuranceController>(InsuranceController);
  });

  it('Insurance controller', () => {
    const spy = jest.spyOn(insuranceController, 'riskClients');
    const req = {
      age: 35,
      dependents: 2,
      house: { ownership_status: 'owned' },
      income: 0,
      marital_status: 'married',
      risk_questions: [0, 1, 0],
      vehicle: { year: 2018 },
    };
    const response = {
      disability: 'ineligible',
      auto: 'regular',
      home: 'regular',
      life: 'responsible',
    };
    const result = insuranceController.riskClients(req);

    expect(spy).toBeCalledWith(req);
    expect(result).toEqual(response);
  });
});
