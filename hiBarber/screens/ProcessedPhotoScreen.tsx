import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

type RootStackParamList = {
  ProcessedPhotoScreen: { processedImageUrl: string };
};

type ProcessedPhotoScreenRouteProp = RouteProp<RootStackParamList, 'ProcessedPhotoScreen'>;

const ProcessedPhotoScreen: React.FC = () => {
  const route = useRoute<ProcessedPhotoScreenRouteProp>();
  const { processedImageUrl } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: processedImageUrl }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '80%',
  },
});

export default ProcessedPhotoScreen;
