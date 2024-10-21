import { StatusBar } from 'expo-status-bar';
import SplashScreen from './SplashScreen'; // Import the new SplashScreen
import OnBoarding from './OnBoarding';
import Registration1 from '../app/Registration1'
import Registration2 from '../app/Registration2';
export default function App() {
  return (
    <>
     <Registration2 /> 
      <StatusBar backgroundColor="#161622" style="dark" />
    </>
  );
}
