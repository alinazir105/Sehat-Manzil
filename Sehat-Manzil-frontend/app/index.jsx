import { StatusBar } from 'expo-status-bar';
import SplashScreen from './SplashScreen'; // Import the new SplashScreen
import OnBoarding from './OnBoarding';
export default function App() {
  return (
    <>
     <OnBoarding />
      <StatusBar backgroundColor="#161622" style="dark" />
    </>
  );
}
