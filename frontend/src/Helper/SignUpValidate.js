import Joi from "joi";
export function signUpValidation(body) {
  const signUpRules = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string()
      .min(6)
      .max(255)
      .required()
      .email({ tlds: { abortEarly: false } }),
    password: Joi.string().min(6).max(1024).required(),
    biz: Joi.boolean().required(),
  });
  return signUpRules.validate(body);
}
