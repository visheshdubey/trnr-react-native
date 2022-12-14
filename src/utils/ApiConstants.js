import moment from "moment"


export const STRAPI_URL = 'https://apiapp.trnr.com/api/'//'https://apiapp.trnr.com/api/'

export const LOG = true;



export const STRAPI_ADD_WORKOUT = (exerciseID) => ({
  data: {
    exercises: exerciseID,
  },

})
export const STRAPI_DELETE_WORKOUT = (exerciseID) => ({
  data: {
    exercises: exerciseID,
  },

})

export const STRAPI_ADD_USER_DATA = (user_id, fn, ln = '', email, dob, gender, tnc = true, location) => (
  {
    userId: user_id,
    data: {
      firstName: fn,
      lastName: ln,
      email: email,
      DOB: dob ? moment(dob).format('YYYY-MM-DD') : moment(new Date()).format('YYYY-MM-DD'), //|| new Date("1-1-1000"),
      gender: gender,
      tnc: tnc ? "TRUE" : "FALSE",
      country: location
    }

  })

export const STRAPI_ADD_USER_DATA_AT_PROFILE = (user_id, fn, ln = '', gender, dob, location) => (
  {
    userId: user_id,
    data: {
      firstName: fn,
      lastName: ln,
      DOB: dob ? moment(dob).format('YYYY-MM-DD') : moment(new Date()).format('YYYY-MM-DD'), //|| new Date("1-1-1000"),
      gender: gender,
      country: location
    }

  })

export const STRAPI_UPDATE_PROFILE_USER_DATA = (fn, ln = '', gender, dob = new Date(null), location) => (
  {
    data: {
      firstName: fn,
      lastName: ln,
      DOB: dob ? moment(dob).format('YYYY-MM-DD') : moment(new Date()).format('YYYY-MM-DD'), //|| new Date("1-1-1000"),
      gender: gender,
      country: location
    }
  })
