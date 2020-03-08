import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [sunrise, setSunRise] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const lat = 36;
  const lng = -4;
  useEffect(() => {
    fetch(
        `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`,
        {
          method: "GET",
          headers: new Headers({
            Accept: "application/json"
          })
        }
    )
        .then(res => res.json())
        .then(response => {
          setIsLoading(false);
          setSunRise(response.results.sunset);
        })
        .catch(error => console.log(error));
  }, [sunrise]);

    let content = isLoading
        ? <Text>Loading...</Text>
        : <Text>Welcome to CockTime! Sun rises on {sunrise}</Text>;

    return (
    <View style={styles.container}>
        {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
