import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../Screen/Dashboard';
import Home from '../assets/Icon5';
import Logo from '../assets/Icon3';
import Heart from '../assets/Icon2';
import Winner from '../assets/icon1';
import Contact from '../assets/Icon4';

const BottomTab = () => {
  const Bottom = createBottomTabNavigator();
  return (
    <Bottom.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: '#0B183C',
        tabBarInactiveBackgroundColor: '#0B183C',
        tabBarHideOnKeyboard: true,
      }}>
      <Bottom.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <>
              {/* <FontAwesome5
                name="home"
                size={23}
                color={focused ? 'red' : ColorApp.appIcon}
              /> */}
              <Home width={16} height={16} />
            </>
          ),
          tabBarShowLabel: false,
          tabBarLabel: () => (
            <View style={{borderBottomColor: 'yellow', borderBottomWidth: 2}} />
          ),
        }}
        name="Dashboard"
        component={Dashboard}
      />
      <Bottom.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <>
              <Logo width={16} height={16} />
            </>
          ),
          tabBarShowLabel: false,
          tabBarLabel: () => (
            <View style={{borderBottomColor: 'yellow', borderBottomWidth: 2}} />
          ),
        }}
        name="Dashboard1"
        component={() => (
          <View style={{flex: 1, backgroundColor: 'red'}}>
            <Text>asdfsd</Text>
          </View>
        )}
      />
      <Bottom.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <>
              <Heart width={16} height={16} />
            </>
          ),
          tabBarShowLabel: false,
          tabBarLabel: () => (
            <View style={{borderBottomColor: 'yellow', borderBottomWidth: 2}} />
          ),
        }}
        name="Dashboard2"
        component={() => (
          <View>
            <Text>Fields</Text>
          </View>
        )}
      />
      <Bottom.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <>
              <Winner width={16} height={16} />
            </>
          ),
          tabBarShowLabel: false,
          tabBarLabel: () => (
            <View style={{borderBottomColor: 'yellow', borderBottomWidth: 2}} />
          ),
        }}
        name="Dashboard3"
        component={() => (
          <View>
            <Text>Fields</Text>
          </View>
        )}
      />
      <Bottom.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <>
              <Contact width={16} height={16} />
            </>
          ),
          tabBarShowLabel: false,
          tabBarLabel: () => (
            <View style={{borderBottomColor: 'yellow', borderBottomWidth: 2}} />
          ),
        }}
        name="Dashboard4"
        component={() => (
          <View>
            <Text>Fields</Text>
          </View>
        )}
      />
    </Bottom.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({});
