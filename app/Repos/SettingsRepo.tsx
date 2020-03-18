import {AsyncStorage} from "react-native";
import {CTSettings} from "../CTSettings";
import moment from "moment";

const store = '@CockTomeStore:ctSettings';

export async function loadSettings(): Promise<CTSettings> {
    const json = await AsyncStorage.getItem(store);
    const settingsLoaded = JSON.parse(json);
    settingsLoaded.easeTimeStartedAt = moment(settingsLoaded.easeTimeStartedAt);
    settingsLoaded.normalGetUpTime = moment(settingsLoaded.normalGetUpTime);
    return settingsLoaded ? settingsLoaded : new CTSettings()
}

export async function saveSettings(settings: CTSettings){
    const json = JSON.stringify(settings);
    await AsyncStorage.setItem(store, json);
}
