import Joi from 'joi';

const schema = Joi.object({
  age: Joi.number(),
  dependents: Joi.number(),
  house: Joi.object({ ownership_status: Joi.string() }),
  income: Joi.number(),
  marital_status: Joi.string(),
  risk_questions: Joi.array().items(Joi.number().valid(0, 1)),
  vehicle: Joi.object({ year: Joi.number().integer() }),
});

export class ValidationRequest  {
    data: any;
    schema = schema;
    constructor(data: any){
        this.data = data;
    }

    validate(){
        return this.schema.validate(this.data);
    }
}
