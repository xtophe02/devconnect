import gql from "graphql-tag";

const typeDefs = gql`
  extend type Mutation {
    createProfile(data: CreateProfileInput): CreateProfileResponse
    editProfile(data: EditProfileInput): EditProfileResponse
  }
  extend type Error @key(fields: "status") @key(fields: "message") {
    message: String @external
    status: Int @external
  }
  type Profile @key(fields: "id") {
    id: ID
    userId: User @provides(fields: "id")
    name: String
    username: String
    location: String
    avatar: String
    skills: [String]
    githubUsername: String
    social: Social
  }
  type CreateProfileResponse {
    success: Boolean
    data: Profile
    error: Error
  }
  type EditProfileResponse {
    success: Boolean
    data: Profile
    error: Error
  }
  type Social {
    facebook: String
    linkedin: String
  }
  input CreateProfileInput {
    name: String
    username: String
    location: String
    avatar: Upload
    skills: [String]
    githubUsername: String
    social: SocialInput
    photoId: String
  }
  input EditProfileInput {
    name: String
    username: String
    location: String
    avatar: Upload
    skills: [String]
    githubUsername: String
    social: SocialInput
    photoId: String
    password: String
    email: String
  }
  input SocialInput {
    facebook: String
    linkedin: String
  }
  extend type User @key(fields: "id") {
    id: ID! @external
    email: String! @external
    profile: Profile
  }
  scalar Upload
  scalar CloudinaryOptions
`;

export { typeDefs };
