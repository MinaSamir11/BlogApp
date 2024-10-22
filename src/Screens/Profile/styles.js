import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ContainerHeader: {zIndex: 5, overflow: 'visible'},
  ProfilePic: {
    width: 132.3,
    height: 132.3,
    backgroundColor: '#000',
    borderRadius: 132.3 / 2,
    alignSelf: 'center',
    marginTop: 100 / 2,
    marginBottom: 35,
  },

  Input: {
    width: '70%',
    marginTop: 10,
    backgroundColor: '#f1f1f1',
    marginStart: 0,
    marginEnd: 0,
    paddingHorizontal: 15,
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
  },
  ScrollStyle: {width: '100%', height: '100%'},
  // KeyboardAvoidingView: {flex: 1},
});

export default styles;
