import React, {useEffect, useState} from "react";
import {Dimensions, Picker, PickerItem, StyleSheet, Switch, Text, TouchableOpacity, View} from "react-native";
import {ColorPalette} from "./Styles/ColorPalette";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";

const screen = Dimensions.get('window');

class CTSettings {
    constructor() {
        this.easeTimeDuration = 7;
        this.easeTimeStartedAt = new Date();
    }

    easeTimeStartedAt: Date;
    easeTimeDuration: number;
    isEaseTimeActivated: boolean;
}

export default function SettingsView ({navigation}) {
    const [settings, setSettings] = useState<CTSettings>(new CTSettings());

    useEffect(() => {
        //loadSettings from file
        setSettings(new CTSettings());
    }, []);

    function saveAndClose() {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Text>Is Activated</Text>
            <Switch value={settings.isEaseTimeActivated} onValueChange={(e) => setSettings({...settings, isEaseTimeActivated: e})}/>

            <Picker
                selectedValue={settings.easeTimeDuration}
                style={{width:100, height: 100}}
                onValueChange={(itemValue) => {
                    setSettings({...settings, easeTimeDuration: itemValue});
                }}>
                {
                    Array.from(Array(21).keys()).filter(e => e > 6).map(d => <PickerItem key={d} label={d.toString()} value={d}/>)
                }
            </Picker>
            <TouchableOpacity style={{marginTop:150}} onPress={saveAndClose} >
                <FontAwesomeIcon size={screen.width/4} icon={ faSave } />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: ColorPalette.bgYellow,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
