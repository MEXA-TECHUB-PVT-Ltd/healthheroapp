import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import {AppColors} from '../../Helping/AppColor';
import CssStyle from '../../StyleSheet/CssStyle';
import {GetPrivacyApi} from '../../services/PrivacyApi';

const PrivacyPolicy = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  // const GetPrivacy = async () => {
  //   setLoading(true);
  //   try {
  //     const result = await GetPrivacyApi();
  //     // console.log(result);
  //     if (result.status == true) {
  //       setLoading(false);
  //     } else {
  //       console.error(result.message);
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     setLoading;
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   GetPrivacy();
  // }, []);
  const dataText = [
    {item: 'Provide, operate, and maintain our website'},
    {item: 'Improve, personalize, and expand our website'},
    {item: 'Understand and analyze how you use our website'},
    {item: 'Develop new products, services, features, and functionality'},
    {
      item: 'Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes',
    },
    {item: 'Send you emails'},
    {item: 'Find and prevent fraud'},
  ];
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#0A1F58', '#0A1637']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 0.4}}
        style={{
          paddingHorizontal: responsiveWidth(6),
          flex: 1,
          paddingTop: responsiveHeight(3),
          backgroundColor: '#0A1F58',
        }}>
        <TouchableOpacity
          style={{flex: 0.1, marginLeft: responsiveWidth(-3)}}
          onPress={() => navigation.goBack()}>
          <Icon
            name="chevron-back-outline"
            size={25}
            style={{padding: '2%'}}
            color={AppColors.buttonText}
          />
        </TouchableOpacity>

        <View style={{flex: 1}}>
          <Text style={[CssStyle.textInsideSettingComponent]}>
            Privacy Policy
          </Text>
          <Text
            style={{
              color: 'white',
              marginTop: responsiveHeight(2),
              lineHeight: responsiveHeight(2.6),
              fontSize: 13,
            }}>
            At mtechub llc, accessible from https://mtechub.com, one of our main
            priorities is the privacy of our visitors. This Privacy Policy
            document contains types of information that is collected and
            recorded by mtechub llc and how we use it.
          </Text>
          <Text
            style={{
              color: 'white',
              marginTop: responsiveHeight(2),
              lineHeight: responsiveHeight(2.6),
              fontSize: 13,
            }}>
            If you have additional questions or require more information about
            our Privacy Policy, do not hesitate to contact us.
          </Text>
          <Text
            style={{
              color: 'white',
              marginTop: responsiveHeight(2),
              lineHeight: responsiveHeight(2.6),
              fontSize: 13,
            }}>
            This Privacy Policy applies only to our online activities and is
            valid for visitors to our website with regards to the information
            that they shared and/or collect in mtechub llc. This policy is not
            applicable to any information collected offline or via channels
            other than this website.
          </Text>
          <Text
            style={[
              CssStyle.textInsideSettingComponent,
              {marginTop: responsiveHeight(3), fontSize: responsiveFontSize(4)},
            ]}>
            Consent
          </Text>
          <Text
            style={{
              color: 'white',
              marginTop: responsiveHeight(2),
              lineHeight: responsiveHeight(2.6),
              fontSize: 13,
            }}>
            By using our website, you hereby consent to our Privacy Policy and
            agree to its terms.
          </Text>
          <Text
            style={[
              CssStyle.textInsideSettingComponent,
              {marginTop: responsiveHeight(3), fontSize: responsiveFontSize(4)},
            ]}>
            Information we collect
          </Text>
          <Text
            style={{
              color: 'white',
              marginTop: responsiveHeight(2),
              lineHeight: responsiveHeight(2.6),
              fontSize: 13,
            }}>
            The personal information that you are asked to provide, and the
            reasons why you are asked to provide it, will be made clear to you
            at the point we ask you to provide your personal information.
          </Text>
          <Text
            style={{
              color: 'white',
              marginTop: responsiveHeight(2),
              lineHeight: responsiveHeight(2.6),
              fontSize: 13,
            }}>
            If you contact us directly, we may receive additional information
            about you such as your name, email address, phone number, the
            contents of the message and/or attachments you may send us, and any
            other information you may choose to provide.
          </Text>
          <Text
            style={{
              color: 'white',
              marginTop: responsiveHeight(2),
              lineHeight: responsiveHeight(2.6),
              fontSize: 13,
            }}>
            When you register for an Account, we may ask for your contact
            information, including items such as name, company name, address,
            email address, and telephone number.
          </Text>
          <Text
            style={[
              CssStyle.textInsideSettingComponent,
              {
                marginTop: responsiveHeight(3),
                lineHeight: responsiveHeight(4.5),
                fontSize: responsiveFontSize(4),
              },
            ]}>
            How we use your information
          </Text>
          <Text
            style={{
              color: 'white',
              marginTop: responsiveHeight(2),
              lineHeight: responsiveHeight(2.6),
              fontSize: 13,
            }}>
            We use the information we collect in various ways, including to:
          </Text>
          {dataText.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                marginTop: responsiveHeight(2),
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 30,
                  backgroundColor: 'white',
                  marginRight: responsiveWidth(2),
                }}
              />
              <Text
                style={{
                  color: 'white',
                  // lineHeight: responsiveHeight(2.6),
                  fontSize: 13,
                }}>
                {item.item}
              </Text>
            </View>
          ))}
          <Text
            style={[
              CssStyle.textInsideSettingComponent,
              {marginTop: responsiveHeight(3), fontSize: responsiveFontSize(4)},
            ]}>
            Log Files
          </Text>
          <Text
            style={{
              color: 'white',
              marginTop: responsiveHeight(2),
              lineHeight: responsiveHeight(2.6),
              fontSize: 13,
            }}>
            mtechub llc follows a standard procedure of using log files. These
            files log visitors when they visit websites. All hosting companies
            do this and a part of hosting services' analytics. The information
            collected by log files include internet protocol (IP) addresses,
            browser type, Internet Service Provider (ISP), date and time stamp,
            referring/exit pages, and possibly the number of clicks. These are
            not linked to any information that is personally identifiable. The
            purpose of the information is for analyzing trends, administering
            the site, tracking users' movement on the website, and gathering
            demographic information.
          </Text>
          <Text
            style={[
              CssStyle.textInsideSettingComponent,
              {
                marginTop: responsiveHeight(3),
                lineHeight: responsiveHeight(4.5),
                fontSize: responsiveFontSize(4),
              },
            ]}>
            Cookies and Web Beacons
          </Text>
          <Text
            style={{
              color: 'white',
              marginTop: responsiveHeight(2),
              lineHeight: responsiveHeight(2.6),
              fontSize: 13,
            }}>
            Like any other website, mtechub llc uses 'cookies'. These cookies
            are used to store information including visitors' preferences, and
            the pages on the website that the visitor accessed or visited. The
            information is used to optimize the users' experience by customizing
            our web page content based on visitors' browser type and/or other
            information.
          </Text>
          <Text
            style={[
              CssStyle.textInsideSettingComponent,
              {
                marginTop: responsiveHeight(3),
                lineHeight: responsiveHeight(4.5),
                fontSize: responsiveFontSize(4),
              },
            ]}>
            Advertising Partners Privacy Policies
          </Text>
          <Text
            style={{
              color: 'white',
              marginTop: responsiveHeight(2),
              lineHeight: responsiveHeight(2.6),
              fontSize: 13,
            }}>
            You may consult this list to find the Privacy Policy for each of the
            advertising partners of mtechub llc.
          </Text>
          <Text
            style={{
              color: 'white',
              marginTop: responsiveHeight(2),
              lineHeight: responsiveHeight(2.6),
              fontSize: 13,
            }}>
            Third-party ad servers or ad networks uses technologies like
            cookies, JavaScript, or Web Beacons that are used in their
            respective advertisements and links that appear on mtechub llc,
            which are sent directly to users' browser. They automatically
            receive your IP address when this occurs. These technologies are
            used to measure the effectiveness of their advertising campaigns
            and/or to personalize the advertising content that you see on
            websites that you visit.
          </Text>
          <Text
            style={{
              color: 'white',
              marginTop: responsiveHeight(2),
              lineHeight: responsiveHeight(2.6),
              fontSize: 13,
            }}>
            Note that mtechub llc has no access to or control over these cookies
            that are used by third-party advertisers.
          </Text>
          {/* ----------------------------- */}
          <Text
            style={[
              CssStyle.textInsideSettingComponent,
              {
                marginTop: responsiveHeight(3),
                lineHeight: responsiveHeight(4.5),
                fontSize: responsiveFontSize(4),
              },
            ]}>
            Third Party Privacy Policies
          </Text>
          <Text
            style={{
              color: 'white',
              marginTop: responsiveHeight(2),
              lineHeight: responsiveHeight(2.6),
              fontSize: 13,
            }}>
            mtechub llc's Privacy Policy does not apply to other advertisers or
            websites. Thus, we are advising you to consult the respective
            Privacy Policies of these third-party ad servers for more detailed
            information. It may include their practices and instructions about
            how to opt-out of certain options.
          </Text>
          <Text
            style={{
              color: 'white',
              marginTop: responsiveHeight(2),
              lineHeight: responsiveHeight(2.6),
              fontSize: 13,
            }}>
            You can choose to disable cookies through your individual browser
            options. To know more detailed information about cookie management
            with specific web browsers, it can be found at the browsers'
            respective websites.
          </Text>
          {/* ----------------------------- */}
          {/* ----------------------------- */}
          <Text
            style={[
              CssStyle.textInsideSettingComponent,
              {
                marginTop: responsiveHeight(3),
                lineHeight: responsiveHeight(4.5),
                fontSize: responsiveFontSize(4),
              },
            ]}>
            CCPA Privacy Rights (Do Not Sell My Personal Information)
          </Text>
          <Text
            style={{
              color: 'white',
              marginTop: responsiveHeight(2),
              lineHeight: responsiveHeight(2.6),
              fontSize: 13,
            }}>
            Under the CCPA, among other rights, California consumers have the
            right to:
          </Text>
          <Text
            style={{
              color: 'white',
              marginTop: responsiveHeight(2),
              lineHeight: responsiveHeight(2.6),
              fontSize: 13,
            }}>
            Request that a business that collects a consumer's personal data
            disclose the categories and specific pieces of personal data that a
            business has collected about consumers.
          </Text>
          <Text
            style={{
              color: 'white',
              marginTop: responsiveHeight(2),
              lineHeight: responsiveHeight(2.6),
              fontSize: 13,
            }}>
            Request that a business delete any personal data about the consumer
            that a business has collected.
          </Text>
          <Text
            style={{
              color: 'white',
              marginTop: responsiveHeight(2),
              lineHeight: responsiveHeight(2.6),
              fontSize: 13,
            }}>
            Request that a business that sells a consumer's personal data, not
            sell the consumer's personal data.
          </Text>
          <Text
            style={{
              color: 'white',
              marginTop: responsiveHeight(2),
              lineHeight: responsiveHeight(2.6),
              fontSize: 13,
            }}>
            If you make a request, we have one month to respond to you. If you
            would like to exercise any of these rights, please contact us.
          </Text>
          {/* ----------------------------- */}
          <Text
            style={[
              CssStyle.textInsideSettingComponent,
              {
                marginTop: responsiveHeight(3),
                lineHeight: responsiveHeight(4.5),
                fontSize: responsiveFontSize(4),
              },
            ]}>
            GDPR Data Protection Rights
          </Text>
          <Text
            style={{
              color: 'white',
              marginTop: responsiveHeight(2),
              lineHeight: responsiveHeight(2.6),
              fontSize: 13,
            }}>
            We would like to make sure you are fully aware of all of your data
            protection rights. Every user is entitled to the following:
          </Text>
          <Text
            style={{
              color: 'white',
              marginTop: responsiveHeight(2),
              lineHeight: responsiveHeight(2.6),
              fontSize: 13,
            }}>
            The right to access – You have the right to request copies of your
            personal data. We may charge you a small fee for this service.
          </Text>
          <Text
            style={{
              color: 'white',
              marginTop: responsiveHeight(2),
              lineHeight: responsiveHeight(2.6),
              fontSize: 13,
            }}>
            The right to rectification – You have the right to request that we
            correct any information you believe is inaccurate. You also have the
            right to request that we complete the information you believe is
            incomplete.
          </Text>
          <Text
            style={{
              color: 'white',
              marginTop: responsiveHeight(2),
              lineHeight: responsiveHeight(2.6),
              fontSize: 13,
            }}>
            The right to erasure – You have the right to request that we erase
            your personal data, under certain conditions.
          </Text>
          <Text
            style={{
              color: 'white',
              marginTop: responsiveHeight(2),
              lineHeight: responsiveHeight(2.6),
              fontSize: 13,
            }}>
            The right to restrict processing – You have the right to request
            that we restrict the processing of your personal data, under certain
            conditions.
          </Text>
          <Text
            style={{
              color: 'white',
              marginTop: responsiveHeight(2),
              lineHeight: responsiveHeight(2.6),
              fontSize: 13,
            }}>
            The right to object to processing – You have the right to object to
            our processing of your personal data, under certain conditions.
          </Text>
          <Text
            style={{
              color: 'white',
              marginTop: responsiveHeight(2),
              lineHeight: responsiveHeight(2.6),
              fontSize: 13,
            }}>
            The right to data portability – You have the right to request that
            we transfer the data that we have collected to another organization,
            or directly to you, under certain conditions.
          </Text>
          <Text
            style={{
              color: 'white',
              marginTop: responsiveHeight(2),
              lineHeight: responsiveHeight(2.6),
              fontSize: 13,
            }}>
            If you make a request, we have one month to respond to you. If you
            would like to exercise any of these rights, please contact us.
          </Text>
          {/* ----------------------------- */}
          <Text
            style={[
              CssStyle.textInsideSettingComponent,
              {marginTop: responsiveHeight(3), fontSize: responsiveFontSize(4)},
            ]}>
            Children's Information
          </Text>
          <Text
            style={{
              color: 'white',
              marginTop: responsiveHeight(2),
              lineHeight: responsiveHeight(2.6),
              fontSize: 13,
            }}>
            Another part of our priority is adding protection for children while
            using the internet. We encourage parents and guardians to observe,
            participate in, and/or monitor and guide their online activity.
          </Text>
          <Text
            style={{
              color: 'white',
              marginTop: responsiveHeight(2),
              lineHeight: responsiveHeight(2.6),
              fontSize: 13,
            }}>
            mtechub llc does not knowingly collect any Personal Identifiable
            Information from children under the age of 13. If you think that
            your child provided this kind of information on our website, we
            strongly encourage you to contact us immediately and we will do our
            best efforts to promptly remove such information from our records.
          </Text>
          {/* ----------------------------- */}
          <Text
            style={[
              CssStyle.textInsideSettingComponent,
              {
                marginTop: responsiveHeight(3),
                fontSize: responsiveFontSize(4),
                lineHeight: responsiveHeight(4.5),
              },
            ]}>
            Changes to This Privacy Policy
          </Text>
          <Text
            style={{
              color: 'white',
              marginTop: responsiveHeight(2),
              lineHeight: responsiveHeight(2.6),
              fontSize: 13,
            }}>
            We may update our Privacy Policy from time to time. Thus, we advise
            you to review this page periodically for any changes. We will notify
            you of any changes by posting the new Privacy Policy on this page.
            These changes are effective immediately, after they are posted on
            this page.
          </Text>
          <Text
            style={{
              color: 'white',
              marginTop: responsiveHeight(2),
              lineHeight: responsiveHeight(2.6),
              fontSize: 13,
            }}>
            Our Privacy Policy was created with the help of the TermsFeed
            Privacy Policy Generator.
          </Text>
          {/* ----------------------------- */}
          <Text
            style={[
              CssStyle.textInsideSettingComponent,
              {marginTop: responsiveHeight(3), fontSize: responsiveFontSize(4)},
            ]}>
            Contact Us
          </Text>
          <Text
            style={{
              color: 'white',
              marginTop: responsiveHeight(2),
              lineHeight: responsiveHeight(2.6),
              fontSize: 13,
            }}>
            If you have any questions or suggestions about our Privacy Policy,
            do not hesitate to contact us.
          </Text>
          {/* ----------------------------- */}
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({});
