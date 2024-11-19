import { StatusBar } from 'expo-status-bar';
import SplashScreen from './SplashScreen'; // Import the new SplashScreen
import Registration1 from './(auth)/registration1';
import Registration2 from './(auth)/userprofile';
import Login from './(auth)/Login';
import Home from './(tabs)/home'
import RootLayout from './_layout';

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="#2A2C38" style="light" />
      <SplashScreen/>
    </>
  );
}
