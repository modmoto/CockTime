import {AsyncStorage} from "react-native";
import {CTSettings} from "../CTSettings";

const store = '@CockTomeStore:ctSettings';

export async function loadSettings(): Promise<CTSettings> {
    const json = await AsyncStorage.getItem(store);
    let settingsLoaded = JSON.parse(json);
    return settingsLoaded ? settingsLoaded : new CTSettings()
}

export async function saveSettings(settings: CTSettings){
    const json = JSON.stringify(settings);
    await AsyncStorage.setItem(store, json);
}
