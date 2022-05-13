import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';
import RootNavigation from '@navigation/RootNavigation';
import { Linking } from 'react-native';

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 0 } } });
const App = () => {
  const linking = {
    prefixes: ['meyou://', 'https://myapp.com'],

    // Custom function to get the URL which was used to open the app
    async getInitialURL() {
      // As a fallback, you may want to do the default deep link handling
      const url = await Linking.getInitialURL();

      return url;
    },

    // Custom function to subscribe to incoming links
    subscribe(listener: (url: string) => void) {
      // Listen to incoming links from deep linking
      const linkingSubscription = Linking.addEventListener('url', ({ url }) => {
        listener(url);
      });

      return () => {
        // Clean up the event listeners
        linkingSubscription.remove();
      };
    },

    config: {
      // Deep link configuration
      screens: {
        Connection: '/Connection/:uniqueCode',
      },
    },
  };
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer linking={linking}>
          <RootNavigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default App;
