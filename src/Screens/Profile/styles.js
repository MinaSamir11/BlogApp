import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ProfilePic: {
    width: 132.3,
    height: 132.3,
    backgroundColor: '#000',
    borderRadius: 132.3 / 2,
    alignSelf: 'center',
    marginTop: 100 / 2,
  },
  Input: {
    width: '70%',
    marginTop: 25,
    backgroundColor: '#f1f1f1',
    marginStart: 0,
    marginEnd: 0,
    paddingHorizontal: 15,
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
  },
});

export default styles;
