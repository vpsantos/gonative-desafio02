import React from 'react';
import { TouchableOpacity } from 'react-native';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome';

import { colors } from 'styles';
import styles from './styles';

const BackButton = ({ navigation }) => (
  <TouchableOpacity style={styles.container} onPress={() => navigation.goBack(null)}>
    <Icon name="angle-left" size={32} color={colors.darker} />
  </TouchableOpacity>
);

BackButton.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};

export default BackButton;
