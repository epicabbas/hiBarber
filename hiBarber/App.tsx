import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CameraScreen from './screens/CameraScreen';
import PhotoPreviewScreen from './screens/PhotoPreviewScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Camera">
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="PhotoPreview" component={PhotoPreviewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
