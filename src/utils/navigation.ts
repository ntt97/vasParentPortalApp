import {ParamListBase} from '@react-navigation/native';
import {HOME_SCREEN, LOADING_PAGE, SIDE_MENU} from 'constants/index';
import {Keyboard} from 'react-native';
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';

type NavigationProps = NativeStackNavigationProp<ParamListBase>;

class NavigationActionsService {
  static navigation: NavigationProps;

  private static stackNavigation: NavigationProps[] = [];

  // eslint-disable-next-line no-use-before-define
  private static instance: NavigationActionsService;

  static initInstance(navigation: NavigationProps): NavigationActionsService {
    if (!NavigationActionsService.instance) {
      NavigationActionsService.instance = new NavigationActionsService();
    }
    NavigationActionsService.navigation = navigation;
    NavigationActionsService.stackNavigation.push(navigation);
    return NavigationActionsService.instance;
  }

  public static push<RouteName extends keyof any>(
    ...arg: undefined extends any[RouteName]
      ? [screen: RouteName] | [screen: RouteName, params?: any[RouteName]]
      : [screen: RouteName, params: any[RouteName]]
  ) {
    NavigationActionsService.navigation.navigate(
      arg[0] as string,
      arg.length > 1 ? arg[1] : undefined,
    );
  }

  public static pop = () => {
    Keyboard.dismiss();
    NavigationActionsService.navigation.pop(1);
  };

  public static toggleDrawer = (bool: boolean) => {
    NavigationActionsService.navigation.popToTop();
  };

  public static showLoading = () => {
    Keyboard.dismiss();
    NavigationActionsService.navigation.navigate(LOADING_PAGE);
  };

  public static hideLoading = () => {
    const state = NavigationActionsService.navigation.getState();

    if (state) {
      const {routes, index} = state;
      const currentRoute = routes[index].name;

      if (currentRoute === LOADING_PAGE) {
        NavigationActionsService.pop();
      }
    }
  };

  public static popToRoot = () => {
    Keyboard.dismiss();
    NavigationActionsService.navigation.popToTop();
  };

  public static destroyScreen = () => {
    NavigationActionsService.stackNavigation.pop();
    const maximumStackLength = NavigationActionsService.stackNavigation.length;
    NavigationActionsService.navigation =
      NavigationActionsService.stackNavigation[maximumStackLength - 1];
  };
}

export default NavigationActionsService;
