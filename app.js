import React, { useEffect } from 'react';
import { View, Text, Button, PermissionsAndroid, Platform } from 'react-native';
import BleManager from 'react-native-ble-manager';

const App = () => {
    useEffect(() => {
        BleManager.start({ showAlert: false });

        if (Platform.OS === 'android' && Platform.Version >= 23) {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
                if (result !== PermissionsAndroid.RESULTS.GRANTED) {
                    console.log("Permission for location isn't granted");
                }
            });
        }
    }, []);

    const handleScan = () => {
        BleManager.scan([], 5, true).then(() => {
            console.log('Scanning...');
            // after 5 seconds, stop scanning and check for devices
            setTimeout(() => {
                BleManager.getDiscoveredPeripherals().then((peripheralsArray) => {
                    console.log('Discovered peripherals: ', peripheralsArray);
                });
            }, 5000);
        });
    };

    return (
        <View>
            <Text>BLE Scanner</Text>
            <Button title="Scan for Devices" onPress={handleScan} />
        </View>
    );
};

export default App;
