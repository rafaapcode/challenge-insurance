import { Module } from '@nestjs/common';
import { InsuranceController } from './presentation/insuranceController/insurance-controller';
import { InsuranceService } from './services/calc-insurance/calc-insurance';

@Module({
  imports: [],
  controllers: [InsuranceController],
  providers: [InsuranceService],
})
export class AppModule {}
