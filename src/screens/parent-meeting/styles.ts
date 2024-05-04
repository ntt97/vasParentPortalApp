import { StyleSheet } from 'react-native';
import colors from 'constants/colors';
import { fontFamilies, fontSizes } from '@constants/fonts';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
  },

  header: {
    backgroundColor: colors.white,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  // header style
  backArrow: {
    top: 7,
  },
  icon: { width: 20, marginRight: 10 },
  boxMeeting: {
    borderLeftWidth: 7,
    borderLeftColor: colors.redMeetingColor,
    paddingLeft: 15,
    paddingVertical: 10,
    marginBottom: 15,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,

    shadowColor: '#BEBEBE',
    shadowRadius: 15,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.7,
    backgroundColor: '#fff',
    elevation: 20,
  },

  boxMeetingDisable: {
    borderLeftWidth: 7,
    borderLeftColor: colors.inactive,
    paddingLeft: 15,
    paddingVertical: 10,
    marginBottom: 15,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,

    shadowColor: '#BEBEBE',
    shadowRadius: 15,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.7,
    backgroundColor: '#fff',
    elevation: 20,
  },
  titleBox: {
    color: colors.redMeetingColor,
    fontFamily: fontFamilies.bold.fontFamily,
    fontWeight: 'bold',
    fontSize: fontSizes.smaller,
    marginBottom: 10,
  },
  titleBoxDisable: {
    color: colors.inactive,
    fontFamily: fontFamilies.bold.fontFamily,
    fontWeight: 'bold',
    fontSize: fontSizes.smaller,
    marginBottom: 10,
  },
  itemTextIcon: { alignItems: 'center', marginBottom: 5 },
});

export default styles;
