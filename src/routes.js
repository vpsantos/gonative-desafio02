import React from 'react';
import { StackNavigator } from 'react-navigation';
import { colors } from 'styles';

import Repositories from 'pages/repositories';
import Issues from 'pages/issues';

import BackButton from 'components/BackButton';

const Routes = StackNavigator(
  {
    Repositories: { screen: Repositories },
    Issues: { screen: Issues },
  },
  {
    initialRouteName: 'Repositories',
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: colors.white,
      },
      headerTitleStyle: {
        color: colors.darker,
      },
      headerLeft: <BackButton navigation={navigation} />,
      headerBackTitle: null,
    }),
  },
);

export default Routes;
