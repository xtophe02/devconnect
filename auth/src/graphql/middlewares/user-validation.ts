import { object, string } from 'yup';

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
        email: string().trim().required().email('invalid email'),
        username: string()
          .trim()
          .required()
          .min(3, 'at least 3 characters')
          .max(10, 'max of 10 characters'),
        password: string()
          .trim()
          .required()
          .min(3, 'at least 3 characters')
          .max(10, 'max of 10 characters'),
      });
      await schema.validate({ ...data }, { abortEarly: false });

      // console.log('Mutation.signup -> before', data);
      return resolve(root, { data }, context, info);
      // console.log('Mutation.signup -> after', result);
    },
  },
};
