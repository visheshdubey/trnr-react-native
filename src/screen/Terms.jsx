import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Mixins, Typography } from '../styles';

const TermsScreen = () => {
  return (
    <View style={{ backgroundColor: 'white' }}>
      <ScrollView style={{ padding: 10, alignSelf: 'center', width: Mixins.scaleSize(370) }}>
        <View style={{ marginBottom: 150 }}>
          <Text style={{ fontSize: Typography.FONT_SIZE_24, fontFamily: Typography.FONT_FAMILY_HEADING, textAlign: 'center', textAlignVertical: 'center' }}>APPLICATION PRIVACY POLICY</Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_18, fontFamily: Typography.FONT_FAMILY_HEADING, textAlign: 'center' }}>New Era Fitness Pty Ltd Vishesh{'\n'} </Text>

          {/* ----------------------HEADING--------------------- */}
          <Text style={{ fontSize: Typography.FONT_SIZE_18, fontFamily: Typography.FONT_FAMILY_HEADING }}>1. About the Application </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            (a) Welcome to TRNR (the 'Application'), the fitness education (the 'Services') Application. {'\n'}
          </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            (b) The Application is operated by New Era Fitness Pty Ltd - ABN 58 653 514 517 or its licensors (referred to in this document as “TRNR”, "we", "us" or "our"). Access to and use of the
            Application, or any of its associated Products or Services, is provided by New Era Fitness Pty Ltd or its licensors. Please read these terms and conditions (the 'Terms') carefully. By
            using, browsing and/or reading the Application, this signifies that you have read, understood and agree to be bound by the Terms. If you do not agree with the Terms, you must cease usage
            of the Application, or any of its Services, immediately. {'\n'}
          </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            (c) We reserve the right to review and change any of the Terms by updating this page at our sole discretion. When we update the Terms, we will use reasonable endeavours to provide you with
            notice of updates to the Terms. Any changes to the Terms take immediate effect from the date of their publication. Before you continue, we recommend you keep a copy of the Terms for your
            records. {'\n'}
          </Text>
          {/* ----------------------HEADING--------------------- */}
          <Text style={{ fontSize: Typography.FONT_SIZE_18, fontFamily: Typography.FONT_FAMILY_HEADING }}>2. Acceptance of the Terms </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            You accept the Terms by using or browsing the Application. You may also accept the Terms by clicking to accept or agree to the Terms where this option is made available to you by us in the
            user interface. {'\n'}
          </Text>
          {/* ----------------------HEADING--------------------- */}
          <Text style={{ fontSize: Typography.FONT_SIZE_18, fontFamily: Typography.FONT_FAMILY_HEADING }}>3. Registration to use the Services </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            (a) In order to access the Services, you must first register for an account through the Application (the 'Account'). {'\n'}
          </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            (b) As part of the registration process, or as part of your continued use of the Services, you may be required to provide personal information about yourself (such as identification or
            contact details), including: {'\n'}
            {'\n'}1. Email{'\n'}2. address{'\n'}3. Password{'\n'}4. DOB{'\n'}5. Gender (male, female or other) {'\n'}
          </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            (c)You warrant that any information you give to us in the course of completing the registration process will always be accurate, correct and up to date. {'\n'}
          </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            (d)Once you have completed the registration process, you will be a registered member of the Application ('Member') and agree to be bound by the Terms. {'\n'}
          </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            (e)You may not use the Services and may not accept the Terms if: {'\n'}
            {'\n'}1. you are not of legal age to form a binding contract with us; or {'\n'}2. you are a person barred from receiving the Services under the laws of Australia or other countries
            including the country in which you are resident or from which you use the Services. {'\n'}
          </Text>
          {/* ----------------------4 HEADING--------------------- */}
          <Text style={{ fontSize: Typography.FONT_SIZE_18, fontFamily: Typography.FONT_FAMILY_HEADING }}>4. Your obligations as a Member </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            (a)As a Member, you agree to comply with the following:
            {'\n'}
            {'\n'}
            <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 30 }}>
              {'   '} (a)you will use the Services only for purposes that are permitted by:
              {'\n'}
              {'\n'}
              {'   '}1. the Terms; and
              {'\n'}
              {'   '}2. any applicable law, regulation or generally accepted practices or guidelines in the relevant jurisdictions; {'\n'}
            </Text>
            <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
              (b)you have the sole responsibility for protecting the confidentiality of your password and/or email address. Use of your password by any other person may result in the immediate
              cancellation of the Services; {'\n'}
            </Text>
            <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
              (c) any use of your registration information by any other person, or third parties, is strictly prohibited. You agree to immediately notify us of any unauthorised use of your password or
              email address or any breach of security of which you have become aware; {'\n'}
            </Text>
            <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
              (d) access and use of the Application is limited, non-transferable and allows for the sole use of the Application by you for the purposes of us providing the Services; {'\n'}
            </Text>
            <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
              (e) you will not use the Services or the Application in connection with any commercial endeavours except those that are specifically endorsed or approved by our management; {'\n'}
            </Text>
            <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
              (f) you will not use the Services or Application for any illegal and/or unauthorised use which includes collecting email addresses of Members by electronic or other means for the purpose
              of sending unsolicited email or unauthorised framing of or linking to the Application; {'\n'}
            </Text>
            <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
              (g) you agree that commercial advertisements, affiliate links, and other forms of solicitation may be removed from the Application without notice and may result in termination of the
              Services. Appropriate legal action will be taken by us for any illegal or unauthorised use of the Application; and {'\n'}
            </Text>
            <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
              (h) you acknowledge and agree that any automated use of the Application or its Services is prohibited. {'\n'}
            </Text>
          </Text>
          {/* ----------------------HEADING--------------------- */}
          <Text style={{ fontSize: Typography.FONT_SIZE_18, fontFamily: Typography.FONT_FAMILY_HEADING }}>5. Copyright and Intellectual Property </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            (a)The Application, the Services and all of our related products are subject to copyright. The material on the Application is protected by copyright under the laws of Australia and through
            international treaties. Unless otherwise indicated, all rights (including copyright) in the Services and compilation of the Application (including but not limited to text, graphics, logos,
            button icons, video images, audio clips, Application, code, scripts, design elements and interactive features) or the Services are owned or controlled for these purposes and are reserved
            by us or our contributors. {'\n'}
          </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            (b)All trademarks, service marks and trade names are owned, registered and/or licensed by us, who grant to you a worldwide, non-exclusive, royalty-free, revocable license whilst you are a
            Member to: {'\n'}
          </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 30 }}>
            (1)use the Application pursuant to the Terms;
            {'\n'}
          </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 30 }}>
            (2) copy and store the Application and the material contained in the Application in your device's cache memory; and
            {'\n'}
          </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 30 }}>
            (3) print pages from the Application for your own personal and non- commercial use.
            {'\n'}
          </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            (b) We retain all rights, title and interest in and to the Application and all related Services. Nothing you do on or in relation to the Application will transfer any:
          </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 30 }}>
            (1)business name, trading name, domain name, trade mark, industrial design, patent, registered design or copyright, or
            {'\n'}
          </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 30 }}>
            (2) a right to use or exploit a business name, trading name, domain name, trade mark or industrial design, or
            {'\n'}
          </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 30 }}>
            (3) a thing, system or process that is the subject of a patent, registered design or copyright (or an adaptation or modification of such a thing, system or process),
            {'\n'}
          </Text>
          <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.ROBOTO_BODY, paddingLeft: 15 }}>
            (d)You may not, without our prior written permission and the permission of any other relevant rights owners: broadcast, republish, upload to a third party, transmit, post, distribute, show
            or play in public, adapt or change in any way the Services or third-party Services for any purpose, unless otherwise provided by these Terms. {'\n'}
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

export default TermsScreen;
