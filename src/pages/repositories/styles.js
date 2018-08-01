import { StyleSheet } from 'react-native';
import { colors, metrics } from 'styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lighter,
  },

  form: {
    paddingVertical: 15,
    paddingHorizontal: metrics.basePadding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  input: {
    flex: 1,
    marginRight: 15,
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    height: 35,
    paddingHorizontal: metrics.basePadding,
    fontSize: 12,
    color: colors.regular,
    borderWidth: 1,
    borderColor: colors.light,
  },

  inputError: {
    borderColor: colors.danger,
    color: colors.danger,
  },

  icon: {
    width: 16,
    color: colors.darker,
  },

  separator: {
    height: 1,
    marginHorizontal: metrics.basePadding,
    marginBottom: metrics.baseMargin / 2,
    backgroundColor: colors.light,
  },

  loading: {
    width: 16,
  },
});

export default styles;
