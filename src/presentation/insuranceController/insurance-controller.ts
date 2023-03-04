import { Controller, Post, Body } from '@nestjs/common';
import { InsuranceService } from '../../services/calc-insurance/calc-insurance';
import { Insurance } from '../../shared/dto';

@Controller('/api/insurance')
export class InsuranceController {
  private readonly insuranceService = new InsuranceService();

  @Post()
  public riskClients(@Body() dataclients: any): Insurance | string {
    return this.insuranceService.execute(dataclients);
  }
}
