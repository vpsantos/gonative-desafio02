import { StyleSheet } from 'react-native';
import { colors, metrics } from 'styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lighter,
  },

  tabsContainerStyle: {
    height: 30,
    marginTop: metrics.basePadding,
    marginHorizontal: metrics.basePadding,
  },

  tabStyle: {
    borderColor: colors.light,
    backgroundColor: colors.light,
  },

  tabTextStyle: {
    color: colors.dark,
    opacity: 0.5,
  },

  activeTabStyle: {
    backgroundColor: colors.light,
  },

  activeTabTextStyle: {
    color: colors.dark,
    fontWeight: 'bold',
    opacity: 1,
  },

  loading: {
    marginTop: metrics.basePadding,
  },
});

export default styles;
