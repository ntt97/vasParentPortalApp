import {HOME_SCREEN, LOADING_PAGE, SIDE_MENU} from 'constants/index';
import {Keyboard} from 'react-native';
let idComponentHome = 'Component3';
class NavigationActionsService {
  private static stackNavigation: any[] = [];
  private static navigation: any;
  private static instance: NavigationActionsService;
  private static defaultOptions = {
    topBar: {
      visible: false,
    },
    animations: {
      push: {
        waitForRender: true,
      },
    },
    layout: {
      orientation: ['portrait'],
    },
    // sideMenu: {
    //   left: {
    //     // shouldStretchDrawer: false,
    //     // animationVelocity: 200,
    //   },
    //   animationType: 'parallax', // defaults to none if not provided, options are 'parallax', 'door', 'slide', or 'slide-and-scale'
    // },
  };

  static initInstance(navigation: any): any {}

  public static toggleDrawer = (bool: boolean) => {};
  public static push = (screenName: string, passProps = {}) => {};

  public static showLoading = () => {};

  public static hideLoading = () => {};

  public static pop = () => {};
  public static popToRoot = () => {};

  public static destroyScreen = () => {};
}

export default NavigationActionsService;
