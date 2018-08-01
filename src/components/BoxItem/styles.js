import { StyleSheet } from 'react-native';
import { general, metrics, colors } from 'styles';

const styles = StyleSheet.create({
  container: {
    ...general.box,
    marginHorizontal: metrics.basePadding,
    marginTop: metrics.baseMargin,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  image: {
    width: 45,
    height: 45,
  },

  circularImage: {
    borderRadius: 22.5,
  },

  info: {
    flex: 1,
    marginLeft: metrics.baseMargin,
    marginRight: metrics.basePadding,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.darker,
    lineHeight: 16,
  },

  description: {
    marginTop: metrics.baseMargin / 2,
    fontSize: 12,
    color: colors.regular,
    lineHeight: 12,
  },

  icon: {
    color: colors.regular,
  },
});

export default styles;
