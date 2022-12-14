import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';

export default function About() {
  return <WebView source={{ uri: 'https://trnr.com/pages/about-us' }} />;
}
