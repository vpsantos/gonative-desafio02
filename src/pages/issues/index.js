import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {
  View, AsyncStorage, ActivityIndicator, FlatList, Linking,
} from 'react-native';

import SegmentedControlTab from 'react-native-segmented-control-tab';

import api from 'services/api';

import { metrics } from 'styles';

import BoxItem from 'components/BoxItem';

import styles from './styles';

export default class Issues extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.name : 'Issues',
    };
  };

  filterMap = ['all', 'open', 'closed'];

  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        login: PropTypes.string,
        name: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    data: [],
    loading: true,
    refreshing: false,
    currentFilterIndex: 0,
  };

  async componentDidMount() {
    const filterIndex = await AsyncStorage.getItem('@GitIssues:filter');

    this.loadIssues(Number(filterIndex));
  }

  handleFilter = async (filterIndex) => {
    this.setState({ loading: true });

    await AsyncStorage.setItem('@GitIssues:filter', String(filterIndex));

    this.loadIssues(filterIndex);
  };

  loadIssues = async (currentFilterIndex) => {
    this.setState({ refreshing: true, currentFilterIndex });

    const { navigation: { state: { params } } } = this.props;
    const login = params ? params.login : null;
    const name = params ? params.name : null;
    const filterName = this.filterMap[currentFilterIndex];
    const { data } = await api.get(`/repos/${login}/${name}/issues?state=${filterName}`);

    this.setState({
      data,
      loading: false,
      refreshing: false,
    });
  };

  renderListItem = ({ item }) => (
    <BoxItem
      image={item.user.avatar_url}
      title={item.title}
      description={item.user.login}
      onPress={() => Linking.openURL(item.html_url).catch(err => console.error('An error occurred', err))
    }
      circularImage
    />
  );

  renderList = () => {
    const { data, refreshing, currentFilterIndex } = this.state;

    return (
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={() => this.loadIssues(currentFilterIndex)}
        refreshing={refreshing}
      />
    );
  };

  render() {
    const { currentFilterIndex, loading } = this.state;

    return (
      <View style={styles.container}>
        <SegmentedControlTab
          tabsContainerStyle={styles.tabsContainerStyle}
          tabStyle={styles.tabStyle}
          tabTextStyle={styles.tabTextStyle}
          activeTabStyle={styles.activeTabStyle}
          activeTabTextStyle={styles.activeTabTextStyle}
          borderRadius={metrics.baseRadius}
          values={['Todas', 'Abertas', 'Fechadas']}
          selectedIndex={currentFilterIndex}
          onTabPress={this.handleFilter}
        />

        {loading ? <ActivityIndicator style={styles.loading} /> : this.renderList()}
      </View>
    );
  }
}
