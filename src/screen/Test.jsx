// import React from 'react';
// import { View, StyleSheet, Text, Image, Button } from 'react-native';
// import { CREATE_USER_VAR } from '../utils/ApiConstants';
// import { useGetCategoryQuery } from '../services/Products';
// import { useCreateShopifyUserMutation } from '../services/shopify';
// import { CREATE_USER_QUERY, GRAPHQL_BODY, GRAPHQL_URL } from '../services/storefront';

// const Test = ({ navigation }) => {
//   const [createShopifyUser, result, isLoading, error, data] = useCreateShopifyUserMutation();
//   const values = CREATE_USER_VAR(
//     'Vishesh',
//     'Dubey',
//     'thecampusmonk@gmail.com',
//     '+919984219241',
//     'Dastur'
//   );
//   React.useEffect(() => {
//     createShopifyUser(values);
//   }, []);

//   // console.log(JSON.stringify({ body: CREATE_USER_QUERY, variables: variables }));

//   // var myHeaders = new Headers();
//   // myHeaders.append('X-Shopify-Storefront-Access-Token', 'c43f4f2aa7e79003094fce2daf7dbf59');
//   // myHeaders.append('Content-Type', 'application/json');

//   // var graphql = JSON.stringify({
//   //   query:
//   //     'mutation customerCreate($input: CustomerCreateInput!) {\r\n  customerCreate(input: $input) {\r\n    customer {\r\n      firstName\r\n      lastName\r\n      email\r\n      phone\r\n      acceptsMarketing\r\n    }\r\n    customerUserErrors {\r\n      field\r\n      message\r\n      code\r\n    }\r\n  }\r\n}',
//   //   variables: {
//   //     input: {
//   //       firstName: 'John1',
//   //       lastName: 'Smith',
//   //       email: 'visheshdubey2016@gmail.com',
//   //       phone: '+918840224033',
//   //       password: '5hopify',
//   //       acceptsMarketing: true,
//   //     },
//   //   },
//   // });
//   // var requestOptions = {
//   //   method: 'POST',
//   //   headers: myHeaders,
//   //   body: graphql,
//   //   redirect: 'follow',
//   // };

//   // fetch('https://trnr-test.myshopify.com/api/2022-10/graphql.json', requestOptions)
//   //   .then((response) => response.text())
//   //   .then((result) => console.info(result))
//   //   .catch((error) => console.info('error', error));
//   result ? console.log(JSON.stringify(result)) : console.log(error + '' + data + '' + isLoading);
//   return (
//     <View>
//       {error ? (
//         <Text>Oh no, there was an error = </Text>
//       ) : isLoading ? (
//         <Text>Loading...</Text>
//       ) : data ? (
//         <>
//           <Text>{'YO' + JSON.stringify(data)}</Text>
//           <Image style={{ width: '100%', height: '50%' }} source={{ uri: data[0].image }} />
//           <Button title={'Hi'} onPress={() => navigation.navigate('Country_Selector')}>
//             Hello
//           </Button>
//         </>
//       ) : null}
//     </View>
//   );
// };

// const styles = StyleSheet.create({});

// export default Test;
