export const STOREFRONT_ACCESS_TOKEN = 'c43f4f2aa7e79003094fce2daf7dbf59'

export const GRAPHQL_URL = 'https://trnr-test.myshopify.com/api/2022-10/graphql.json'

export const userID = 116144281116144281

export const CREATE_USER_QUERY = `
mutation customerCreate($input: CustomerCreateInput!) {
  customerCreate(input: $input) {
    customer {
      id
      firstName
      lastName
      email
      acceptsMarketing
    }
    customerUserErrors {
      field
      message
      code
    }
  }
}
`
export const GET_USER_QUERY = `
query GetUser($customerAccessToken: String!){
  customer(customerAccessToken: $customerAccessToken) {
    id
    firstName
    lastName
    acceptsMarketing
    email
    phone
  }
}
`
export const ACCESS_TOKEN_USER_QUERY = `
mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
      }
      customerUserErrors {
      field
      message
      code
      }
    }
  }`

export const RESET_USER_QUERY =
  `mutation customerRecover($email: String!) {
  customerRecover(email: $email) {
    customerUserErrors {
      field
      message
      code
    }
  }
}`

export const UPDATE_USER_QUERY = `
mutation customerUpdate($customer: CustomerUpdateInput!, $customerAccessToken: String!) {
  customerUpdate(customer: $customer, customerAccessToken: $customerAccessToken) {
    customer {
      id
      firstName
      lastName
      email
      phone
    }
    customerAccessToken {
      accessToken
    }
    customerUserErrors {
      field
      message
      code
    }
  }
}`


export const CREATE_USER_VAR = (fn, ln, email, pswd, marketing = true) => ({
  input: {
    firstName: fn,
    lastName: ln,
    email: email,
    password: pswd,
    acceptsMarketing: marketing
  }
})
export const GET_USER_VAR = (token) => (
  {
    customerAccessToken: token
  }
)

export const RESET_USER_VAR = (email) => ({

  email: email

})
export const ACCESS_TOKEN_USER_VAR = (email, pswd) => ({
  input: {
    email: email,
    password: pswd
  }
})
export const UPDATE_USER_VAR = (fn, ln, email, phone, AUTH) => ({

  customer: {
    firstName: fn,
    lastName: ln,
    email: email,
    phone: phone
  },
  customerAccessToken: AUTH

})

export const STRAPI_ADD_WORKOUT = (exerciseID) => ({

  data: {
    exercises: exerciseID,
  },

})

export const STRAPI_ADD_USER_DATA = (fn, ln = '', email, dob, gender, tnc) => (
  {

    data:
    {
      customer_id: userID,
      firstName: fn,
      lastName: ln,
      email: email,
      DOB: dob,
      // country: "Australia",

      gender: gender,
      tnc: tnc || 0
    }

  })