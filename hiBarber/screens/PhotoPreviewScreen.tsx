import React from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function PhotoPreviewScreen({  }) {
  const navigation = useNavigation();
  const route = useRoute();
  const { photoUri } = route.params;

  const sendPhoto = async () => {
    const formData = new FormData();
    formData.append('photo', {
      uri: photoUri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });

    try {
      const response = await fetch('https://your-backend-url.com/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        console.log('Photo uploaded successfully');
      } else {
        console.error('Failed to upload photo');
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
       <Image source={{ uri: photoUri }} style={styles.image} />
       <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '40%'}}>
       <MaterialCommunityIcons name="check-circle" size={60} color="blue" onPress = {sendPhoto} />
      {/* <Button title="Send Photo" onPress={sendPhoto} /> */}
      <MaterialCommunityIcons name="camera-retake" size={60} color="blue" onPress = {()=> navigation.goBack()} />
      {/* <Button title="✅" onPress={sendPhoto} /> */}
      </View>
    </View>
  );
}

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
