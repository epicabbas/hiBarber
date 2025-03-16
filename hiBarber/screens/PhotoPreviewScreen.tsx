import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface RouteParams {
  photoUri: string;
}

export default function PhotoPreviewScreen({  }: {}) {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { photoUri } = route.params as RouteParams;

  const getPhoto = async () => {
    // Define the orderId
    const orderId = "7a5545f93132410dbb4348bc7b4e3d73";

    // Define the API endpoint
    const apiUrl = "https://api.lightxeditor.com/external/api/v1/order-status";

    // Create the payload
    const payload = {
        orderId: orderId
    };

    try {
        // Make the POST request
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        // Parse the response
        const data = await response.json();

        // Handle the response (e.g., log or process it)
        console.log("Response:", data);

        // Optionally, return the output URL if available
        if (data.body && data.body.output) {
            return data.body.output;
        } else {
            throw new Error("Output URL not found in response.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
  };

  const sendPhoto = async () => {
    const formData = new FormData();
    formData.append('photo', {
      uri: photoUri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });

    try {
      const response = await fetch('http://172.31.61.167:3000/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Photo processed successfully', data);
        // Navigate to a new screen to display the processed image
        navigation.navigate('ProcessedPhotoScreen', { processedImageUrl: data.processedImageUrl });
      } else {
        console.error('Failed to process photo');
      }
    } catch (error) {
      console.error('Error processing photo:', error);
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

      <TouchableOpacity onPress={getPhoto}>
        <MaterialCommunityIcons name="arrow-top-right-thick" size={60} color="blue" />
      </TouchableOpacity>
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
