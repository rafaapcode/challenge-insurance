import { Controller, Post } from '@nestjs/common';

@Controller('/api/insurance')
export class InsuranceController {
  @Post()
  public riskClients() {
    return 'teste';
  }
}
