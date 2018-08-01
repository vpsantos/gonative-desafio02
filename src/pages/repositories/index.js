import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome';

import {
  View,
  TextInput,
  AsyncStorage,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import api from 'services/api';

import { colors } from 'styles';

import BoxItem from 'components/BoxItem';

import styles from './styles';

export default class Repositories extends Component {
  static navigationOptions = {
    title: 'GitIssues',
    headerLeft: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    repositoryInput: '',
    data: [],
    loading: false,
    refreshing: false,
    error: false,
  };

  async componentDidMount() {
    this.loadRepositories();
  }

  loadRepositories = async () => {
    this.setState({ refreshing: true });

    const repositories = await AsyncStorage.getItem('@GitIssues:repositories');

    this.setState({
      data: repositories ? JSON.parse(repositories) : [],
      loading: false,
      refreshing: false,
      error: false,
    });
  };

  checkRepoExists = (inputValue) => {
    const { data } = this.state;
    const values = inputValue.split('/');
    const login = values[0];
    const name = values[1];
    const repos = data.filter(item => item.owner.login === login && item.name === name);

    return !!repos.length;
  };

  saveRepository = async (repositories) => {
    await AsyncStorage.setItem('@GitIssues:repositories', JSON.stringify(repositories));
  };

  handleAddRepository = async () => {
    const { repositoryInput, data } = this.state;

    if (repositoryInput.length === 0 || this.checkRepoExists(repositoryInput)) {
      this.setState({ error: true });
      return;
    }

    this.setState({ loading: true });

    try {
      const { data: repository } = await api.get(`/repos/${repositoryInput}`);
      const repositories = [
        ...data,
        {
          id: repository.id,
          name: repository.name,
          owner: {
            avatar_url: repository.owner.avatar_url,
            login: repository.owner.login,
          },
        },
      ];

      this.saveRepository(repositories);

      this.setState({
        data: repositories,
        loading: false,
        repositoryInput: '',
        error: false,
      });
    } catch (err) {
      this.setState({ loading: false, error: true });
    }
  };

  renderListItem = ({ item }) => {
    const { navigation } = this.props;

    return (
      <BoxItem
        image={item.owner.avatar_url}
        title={item.name}
        description={item.owner.login}
        onPress={() => {
          navigation.navigate('Issues', {
            login: item.owner.login,
            name: item.name,
          });
        }}
      />
    );
  };

  renderList = () => {
    const { data, refreshing } = this.state;

    return (
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadRepositories}
        refreshing={refreshing}
      />
    );
  };

  render() {
    const { error, repositoryInput, loading } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput
            style={error ? [styles.input, styles.inputError] : styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Adicionar novo repositório"
            underlineColorAndroid={colors.transparent}
            value={repositoryInput}
            onChangeText={inputText => this.setState({ repositoryInput: inputText })}
          />

          <TouchableOpacity onPress={this.handleAddRepository}>
            {loading ? (
              <ActivityIndicator style={styles.loading} />
            ) : (
              <Icon name="plus" size={16} style={styles.icon} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />

        {this.renderList()}
      </View>
    );
  }
}
