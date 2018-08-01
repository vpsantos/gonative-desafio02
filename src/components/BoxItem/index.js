import React from 'react';
import PropTypes from 'prop-types';

import {
  View, Image, Text, TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

const BoxItem = ({
  image, title, description, onPress, circularImage,
}) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Image
      style={circularImage ? [styles.image, styles.circularImage] : styles.image}
      source={{ uri: image }}
    />

    <View style={styles.info}>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.description}>{description}</Text>
    </View>

    <Icon style={styles.icon} name="angle-right" size={20} />
  </TouchableOpacity>
);

BoxItem.defaultProps = {
  circularImage: false,
};

BoxItem.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  circularImage: PropTypes.bool,
};

export default BoxItem;
