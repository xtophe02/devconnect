import { object, string } from "yup";

export const createUserValidation = {
  Mutation: {
    createUser: async (
      resolve: any,
      root: any,
      { data }: any,
      context: any,
      info: any
    ) => {
      let schema = object().shape({
        email: string().trim().required().email("Please include a valid email"),

        password: string()
          .trim()
          .required()
          .min(6, "Please enter a password with 6 or more characters"),
      });
      await schema.validate({ ...data }, { abortEarly: false });

      return resolve(root, { data }, context, info);
    },
  },
};
export const logInUserValidation = {
  Mutation: {
    logInUser: async (
      resolve: any,
      root: any,
      { data }: any,
      context: any,
      info: any
    ) => {
      let schema = object().shape({
        email: string().trim().required(),

        password: string().trim().required(),
      });
      await schema.validate({ ...data }, { abortEarly: false });

      return resolve(root, { data }, context, info);
    },
  },
};
