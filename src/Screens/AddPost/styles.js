import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  Input: {
    width: '70%',
    height: 40,
    marginTop: 50,
    backgroundColor: '#f1f1f1',
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: '700',
  },
  InputDesc: {
    width: '70%',
    height: 150,
    marginTop: 25,
    backgroundColor: '#f1f1f1',
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: '700',
    maxHeight: 150,
  },
  MapBtn: {
    borderRadius: 25,
    marginTop: 30,
    marginStart: '16%',
    alignSelf: 'flex-start',
    width: 100,
    height: 100,
  },
});

export default styles;
