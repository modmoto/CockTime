import {AsyncStorage} from "react-native";
import {CTSettings} from "../CTSettings";

const store = '@CockTomeStore:ctSettings';

export async function loadSettings(): Promise<CTSettings> {
    const json = await AsyncStorage.getItem(store);
    const settingsLoaded = JSON.parse(json);
    settingsLoaded.easeTimeStartedAt = new Date(settingsLoaded.easeTimeStartedAt);
    settingsLoaded.normalGetUpTime = new Date(settingsLoaded.normalGetUpTime);
    return settingsLoaded ? settingsLoaded : new CTSettings()
}

export async function saveSettings(settings: CTSettings){
    const json = JSON.stringify(settings);
    await AsyncStorage.setItem(store, json);
}
