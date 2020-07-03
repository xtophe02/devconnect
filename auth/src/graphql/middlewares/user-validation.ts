import { object, string } from "yup";

export const signUpValidation = {
  Mutation: {
    signUp: async (
      resolve: any,
      root: any,
      { data }: any,
      context: any,
      info: any
    ) => {
      let schema = object().shape({
        name: string().trim().required(),
        email: string().trim().required().email("Please include a valid email"),
        username: string()
          .trim()
          .required()
          .min(3, "at least 3 characters")
          .max(10, "max of 10 characters"),
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
