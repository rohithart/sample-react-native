/**
 * @type {import('@react-navigation/dev-utils').StaticParamList}
 */
const linking = {
  prefixes: ['mobileapp://', 'https://mobileapp.com'],

  config: {
    screens: {
      App: {
        screens: {
          HomeStack: {
            screens: {
              Home: 'home',
            },
          },
          DashboardStack: {
            screens: {
              Dashboard: 'dashboard/:id',
            },
          },
          ProfileStack: {
            screens: {
              Profile: 'profile',
            },
          },
          ChatStack: {
            screens: {
              Chat: 'chat',
            },
          },
        },
      },
    },
  },

  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (url != null) {
      return url;
    }
    // Only navigate to the profile screen if there's no deep link and we're
    // not coming from the notification
    return 'home';
  },

  subscribe(listener) {
    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', ({ url }) => {
      listener(url);
    });

    return () => {
      linkingSubscription.remove();
    };
  },
};

export default linking;
