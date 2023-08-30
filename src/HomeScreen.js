import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  View,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
const HomeScreen = () => {
  const [apiMovie, setApiMovie] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const apiKey = '26763d7bf2e94098192e629eb975dab0';
  const image185 = posterPath =>
    posterPath ? 'https://image.tmdb.org/t/p/w185' + posterPath : null;

  // pull to refresh  
  const onRefresh = React.useCallback(() => {
    setApiMovie([]);
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    getApiMovie();
  }, []);
  // get Api
  const getApiMovie = async () => {
    if (loading) return; // Prevent multiple requests while loading
    try {
      setLoading(true);

      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${currentPage}`,
      );
      const newMovies = response.data.results;
      const totalPages = response.data.total_pages;

      setApiMovie(prevMovies => [...prevMovies, ...newMovies]);
      setTotalPages(totalPages);
      setCurrentPage(currentPage + 1);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };
  // load more
  const handleLoadMore = () => {
    if (currentPage <= totalPages) {
      getApiMovie();
    }
  };
  const {width, height} = Dimensions.get('window');

  return (
    <View>
      <SafeAreaView>
        <View style={styles.container}>
          <Icon name="chevron-back-outline" size={28} />
          <Text style={{fontSize: 20, marginHorizontal: 10}}>Back</Text>
        </View>
      </SafeAreaView>

      <View style={{marginHorizontal: 20}}>
        <Text style={styles.textList}>Popular list</Text>
      </View>

      <FlatList
        showsHorizontalScrollIndicator={false}
        data={apiMovie}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 110,
        }}
        renderItem={({item, index}) => (
          <View style={styles.listMovie}>
            <Image
              source={{
                uri: image185(item.poster_path),
              }}
              style={{width: width * 0.43, height: height * 0.35}}
            />
            <View style={styles.textContainer}>
              <View style={styles.circle}>
                <Text>
                  {(() => {
                    const floatValue = parseFloat(item.vote_average);
                    const integerPart = Math.floor(floatValue);
                    let decimalPart1 = (floatValue - integerPart).toFixed(1);
                    const decimalPart = decimalPart1.replace(/0/, '');
                    return (
                      <>
                        <Text
                          style={{
                            fontSize: 20,
                            color: 'white',
                            fontWeight: 'bold',
                          }}>
                          {integerPart}
                        </Text>
                        <View>
                          <Text style={{color: 'white', fontWeight: 'bold'}}>
                            {decimalPart}
                          </Text>
                        </View>
                      </>
                    );
                  })()}
                </Text>
              </View>
            </View>

            <View style={styles.movieName}>
              <Text style={styles.textMovie}>{item.title}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default HomeScreen;
