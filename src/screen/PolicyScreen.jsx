import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Mixins, Typography } from '../styles';

const PolicyScreen = () => {
  return (
    <View style={{ backgroundColor: 'white' }}>
      <ScrollView style={{ padding: 10, alignSelf: 'center', width: Mixins.scaleSize(370) }}>
        <View style={{ marginBottom: 150 }}>
          {/* <Text style={{ fontSize: Typography.FONT_SIZE_24, fontFamily: Typography.FONT_FAMILY_HEADING, textAlign: 'center', textAlignVertical: 'center' }}>APPLICATION PRIVACY POLICY</Text> */}
          <Text style={{ fontSize: Typography.FONT_SIZE_18, fontFamily: Typography.FONT_FAMILY_HEADING, textAlign: 'center' }}>New Era Fitness Pty Ltd{'\n'} </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            This Privacy Policy applies to your use of the software application TRNR (the “Application”), which is owned and operated by New Era Fitness Pty Ltd - ABN 58 653 514 517 or its licensors
            (referred to in this document as “TRNR”, "we", "us" or "our"). Protecting your privacy and the confidentiality of your personal information is important to us. Please read this Privacy
            Policy carefully to understand how we collect, use, disclose, store, and protect your personal information, as well as how you can access, correct, update, or delete any personal
            information provided to us, or express any concerns you may have.{'\n'}
          </Text>
          {/* ----------------------HEADING--------------------- */}
          <Text style={{ fontSize: Typography.FONT_SIZE_18, fontFamily: Typography.FONT_FAMILY_HEADING }}>1. We respect your privacy </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            (a)We respect your right to privacy and are committed to safeguarding the privacy of our customers and software application users. We adhere to the National Privacy Principles established
            by the Privacy Act 1988 (Cth). This policy sets out how we collect and treat your personal information. {'\n'}
          </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            (b) "Personal information" is information we hold which is identifiable as being about you. {'\n'}
          </Text>
          {/* ----------------------HEADING--------------------- */}
          <Text style={{ fontSize: Typography.FONT_SIZE_18, fontFamily: Typography.FONT_FAMILY_HEADING }}>2. Collection of personal information </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            (a) We will, from time to time, receive and store personal information you enter onto our software Application TRNR, provide to us directly or give to us in other forms. {'\n'}
          </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            (b) You may provide basic information such as your name, phone number, address and email address to enable us to send information, provide updates and process your product or service
            order. We may collect additional information at other times, including but not limited to, when you provide feedback, when you provide information about your personal or business affairs,
            change your content or email preference, respond to surveys and/or promotions, provide financial or credit card information, or communicate with our customer support. {'\n'}
          </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            (c)Additionally, we may also collect any other information you provide while interacting with us. {'\n'}
          </Text>
          {/* ----------------------HEADING--------------------- */}
          <Text style={{ fontSize: Typography.FONT_SIZE_18, fontFamily: Typography.FONT_FAMILY_HEADING }}>3. How we collect your personal information </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            (a)We collect personal information from you in a variety of ways, including when you interact with us electronically or in person, when you access our software application and when we
            provide our services to you. We may receive personal information from third parties. If we do, we will protect it as set out in this Privacy Policy.
            {'\n'}
          </Text>
          {/* ----------------------HEADING--------------------- */}
          <Text style={{ fontSize: Typography.FONT_SIZE_18, fontFamily: Typography.FONT_FAMILY_HEADING }}>4. Use of your personal information </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            (a)We may use personal information collected from you to provide you with information, updates, and our services. We may also make you aware of new and additional products, services and
            opportunities available to you. We may use your personal information to improve our products and services and better understand your needs. {'\n'}
          </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            (b) The Application may make third party social media features available to its users. We cannot ensure the security of any information you choose to make public in a social media feature.
            Also, we cannot ensure that parties who have access to such publicly available information will respect your privacy. The Application may make third party social media features available
            to its users. We cannot ensure the security of any information you choose to make public in a social media feature. Also, we cannot ensure that parties who have access to such publicly
            available information will respect your privacy.
            {'\n'}
            {'\n'}
            We may contact you by a variety of measures including, but not limited to telephone, email, sms or mail. {'\n'}
          </Text>
          {/* ----------------------HEADING--------------------- */}
          <Text style={{ fontSize: Typography.FONT_SIZE_18, fontFamily: Typography.FONT_FAMILY_HEADING }}>5. Disclosure of your personal information </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            (a)We may disclose your personal information to any of our employees, officers, insurers, professional advisers, agents, suppliers or subcontractors insofar as reasonably necessary for the
            purposes set out in this Policy. Personal information is only supplied to a third party when it is required for the delivery of our services. {'\n'}
          </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            (b)We may from time to time need to disclose personal information to comply with a legal requirement, such as a law, regulation, court order, subpoena, warrant, in the course of a legal
            proceeding or in response to a law enforcement agency request. {'\n'}
          </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            (c) We may also use your personal information to protect our copyright, trademarks, legal rights, property, or safety, our Application, website and customers or third parties. {'\n'}
          </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            (d) Information that we collect may from time to time be stored, processed in or transferred between parties located in countries outside of Australia. {'\n'}
          </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            (e) If there is a change of control in our business or a sale or transfer of business assets, we reserve the right to transfer to the extent permissible at law our user databases, together
            with any personal information and non-personal information contained in those databases. This information may be disclosed to a potential purchaser under an agreement to maintain
            confidentiality. We would seek to only disclose information in good faith and where required by any of the above circumstances. {'\n'}
          </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            (f) By providing us with personal information, you consent to the terms of this Privacy Policy and the types of disclosure covered by this Policy. Where we disclose your personal
            information to third parties, we will request that the third party follow this Policy regarding handling your personal information.{'\n'}
          </Text>
          {/* ----------------------HEADING--------------------- */}
          <Text style={{ fontSize: Typography.FONT_SIZE_18, fontFamily: Typography.FONT_FAMILY_HEADING }}>6. Security of your personal information </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            (a) We are committed to ensuring that the information you provide to us is secure. In order to prevent unauthorised access or disclosure, we have put in place suitable physical, electronic
            and managerial procedures to safeguard and secure information and protect it from misuse, interference, loss and unauthorised access, modification and disclosure. {'\n'}
          </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            (b) The transmission and exchange of information is carried out at your own risk. We cannot guarantee the security of any information that you transmit to us, or receive from us. Although
            we take measures to safeguard against unauthorised disclosures of information, we cannot assure you that personal information that we collect will not be disclosed in a manner that is
            inconsistent with this Privacy Policy. {'\n'}
          </Text>
          {/* ----------------------HEADING--------------------- */}
          <Text style={{ fontSize: Typography.FONT_SIZE_18, fontFamily: Typography.FONT_FAMILY_HEADING }}>7. Access to your personal information </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            (a) You may request details of personal information that we hold about you in accordance with the provisions of the Privacy Act 1988(Cth). If you would like a copy of the information which
            we hold about you or believe that any information we hold on you is inaccurate, out of date, incomplete, irrelevant or misleading, please email us at hello@trnr.com with the subject line
            “Attn. Privacy Officer”. {'\n'}
          </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            (b) We reserve the right to refuse to provide you with information that we hold about you, in certain circumstances set out in the{' '}
            <Text style={{ fontStyle: 'italic' }}>Privacy Act. </Text> {'\n'}
          </Text>
          {/* ----------------------HEADING--------------------- */}
          <Text style={{ fontSize: Typography.FONT_SIZE_18, fontFamily: Typography.FONT_FAMILY_HEADING }}>8. Complaints about privacy </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            (a)If you have any complaints about our privacy practices, please feel free to send in details of your complaints to PO BOX 1644, Sydney, New South Wales, 1355. We take complaints very
            seriously and will endeavour to respond as soon as possible after receiving written notice of your complaint. {'\n'}
          </Text>
          {/* ----------------------HEADING--------------------- */}
          <Text style={{ fontSize: Typography.FONT_SIZE_18, fontFamily: Typography.FONT_FAMILY_HEADING }}>9. Op out right </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            (a)You can stop all collection of information by the Application easily by uninstalling the Application. You may use the standard uninstall processes as may be available as part of your
            mobile device or via the mobile application marketplace or network. You can also request to opt-out via email, at hello@trnr.com with the subject line “Attn. Privacy Officer”. {'\n'}
          </Text>
          {/* ----------------------HEADING--------------------- */}
          <Text style={{ fontSize: Typography.FONT_SIZE_18, fontFamily: Typography.FONT_FAMILY_HEADING }}>10. Changes to Privacy Policy </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            (a) Please be aware that we may change this Privacy Policy in the future. We may modify this Policy at any time, in our sole discretion and all modifications will be effective immediately
            upon our posting of the modifications on our Application. Please check back from time to time to review our Privacy Policy. {'\n'}
          </Text>
          {/* ----------------------HEADING--------------------- */}
          <Text style={{ fontSize: Typography.FONT_SIZE_18, fontFamily: Typography.FONT_FAMILY_HEADING }}>11. Software Application {'\n'}</Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            <Text style={{ fontSize: Typography.FONT_SIZE_18, fontFamily: Typography.FONT_FAMILY_HEADING }}>(a) When you use our Application {'\n'}</Text>
            When you come to our application we may collect certain information such as mobile unique device ID, the IP address of your mobile device, mobile operating system, the type of mobile
            internet browsers you use, and information about the way you use the Application. This information is used in an aggregated manner to analyse how people use our site, such that we can
            improve our service. {'\n'}
          </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            <Text style={{ fontSize: Typography.FONT_SIZE_18, fontFamily: Typography.FONT_FAMILY_HEADING }}>(b) Cookies {'\n'}</Text>
            We may from time-to-time use cookies on our software Application. Cookies are very small files which a website uses to identify you when you come back to the application and to store
            details about your use of the application. Cookies are not malicious programs that access or damage your computer, tablet or smartphone. Most devices automatically accept cookies but you
            can choose to reject cookies by changing your devise settings. However, this may prevent you from taking full advantage of our application. {'\n'}
          </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            <Text style={{ fontSize: Typography.FONT_SIZE_18, fontFamily: Typography.FONT_FAMILY_HEADING }}>(c) Automatic collection {'\n'}</Text>
            The software Application may collect certain information automatically, including, but not limited to, the type of mobile device you use, your mobile devices unique device ID, the IP
            address of your mobile device, your mobile operating system, the type of mobile Internet browsers you use, and information about the way you use the Application. {'\n'}
          </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            <Text style={{ fontSize: Typography.FONT_SIZE_18, fontFamily: Typography.FONT_FAMILY_HEADING }}>(d) Third parties {'\n'}</Text>
            Our software application may from time to time have links to other applications or websites not owned or controlled by us. These links are meant for your convenience only. Links to third
            party applications and websites do not constitute sponsorship or endorsement or approval of these third parties. Please be aware that we are not responsible for the privacy practises of
            other such applications or websites. We encourage our users to be aware, when they leave our Application or website, to read the privacy statements of each and every application or website
            that collects personal identifiable information. {'\n'}
          </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            <Text style={{ fontSize: Typography.FONT_SIZE_18, fontFamily: Typography.FONT_FAMILY_HEADING }}>(e) Geo-location {'\n'}</Text>
            When you visit the mobile Application, we may use GPS technology (or other similar technology) to determine your current location in order to determine the city you are located within and
            display a location map with relevant advertisements. We will not share your current location with other users or partners. {'\n'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default PolicyScreen;
