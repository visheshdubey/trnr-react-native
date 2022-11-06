import moment from "moment"

// moment
// export const STOREFRONT_ACCESS_TOKEN = '8835638804792f77f9eedee5e216964b'
export const STOREFRONT_ACCESS_TOKEN = '5c84835c5d297ef8541b2d70b76b2a2b'

export const STRAPI_ACCESS_TOKEN = 'Bearer 0100239b9066aaf680083d0c79d9303d1db5aa4dac8f4686dafa88ce1037c4e738487f513f282ba8d1bb08485092b1fbea5e61ab14eecbc73865c35bde6c54fd03bc710215bc757a540e9a4e41260b73040c09b79b3d2c4c70739299c52fe8a7c8395ab7cc9f54e81f3546c4bc7cd93ecdbf2e55bc615764b81753bb81ffdf15'

export const GRAPHQL_URL = 'https://trnr.com/api/2022-10/graphql.json'

export const STRAPI_URL = 'https://apiapp.trnr.com/api/'

export const LOG = true;



export const DEFAULT_PSWD = () => (Math.floor(Math.random() * (9999999999999 - 11111111111)) + 11111111111);



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
        expiresAt
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

export const RENEW_ACCESS_TOKEN = `
mutation customerAccessTokenRenew($customerAccessToken: String!) {
  customerAccessTokenRenew(customerAccessToken: $customerAccessToken) {
    customerAccessToken {
      # CustomerAccessToken fields
      accessToke
    }
    userErrors {
      field
      message
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
export const UPDATE_USER_VAR = (fn, ln, AUTH) => ({

  customer: {
    firstName: fn,
    lastName: ln,
  },
  customerAccessToken: AUTH

})
export const RENEW_ACCESS_TOKEN_VAR = (token) => ({
  "customerAccessToken": token
})

export const STRAPI_ADD_WORKOUT = (cust_id, exerciseID) => ({
  userId: cust_id,
  data: {
    exercises: exerciseID,
  },

})
export const STRAPI_DELETE_WORKOUT = (cust_id, exerciseID) => ({
  userId: cust_id,
  data: {
    exercises: exerciseID,
  },

})

export const STRAPI_ADD_USER_DATA = (cust_id, fn, ln = '', email, dob, gender, tnc = true) => (
  {
    userId: cust_id,
    data: {
      customer_id: cust_id,
      firstName: fn,
      lastName: ln,
      email: email,
      DOB: moment(dob).format('YYYY-MM-DD'), //|| new Date("1-1-1000"),
      gender: gender,
      tnc: tnc ? "TRUE" : "FALSE"
    }

  })

export const STRAPI_ADD_USER_DATA_AT_SIGNIN = (cust_id, fn, ln = '', email) => (
  {
    userId: cust_id,
    data: {
      customer_id: cust_id,
      firstName: fn,
      lastName: ln,
      email: email,
    }

  })
export const STRAPI_ADD_USER_DATA_AT_PROFILE = (cust_id, fn, ln = '', gender, dob) => (
  {
    userId: cust_id,
    data: {
      customer_id: cust_id,
      firstName: fn,
      lastName: ln,
      DOB: moment(dob).format('YYYY-MM-DD'), //|| new Date("1-1-1000"),
      gender: gender
    }

  })

export const STRAPI_GET_USER_DATA = (cust_id, fn, ln = '', email, dob = new Date(null), gender = 'OTHER', tnc = true) => (
  {
    userId: cust_id,
    data: {
      customer_id: cust_id,
      firstName: fn,
      lastName: ln,
      email: email,
      DOB: dob,
      gender: gender,
      tnc: tnc || 0
    }

  })
