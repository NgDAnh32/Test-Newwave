import {StyleSheet} from 'react-native';
 const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 5,
    marginTop: 15,
    flexDirection: 'row',
  },
  textList: {
    color: '#666666',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  listMovie: {
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 15,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  textContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    padding: 5,
    flexDirection: 'row-reverse',
  },
  circle: {
    backgroundColor: '#FF6B6B',
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieName: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 5,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  textMovie: {color: 'white', fontSize: 16, fontWeight: 'bold'},
});
export default styles;