import { db } from '../../../../libs/dexie/core/db';

interface SettingsMap {
  [key: string]: string | number | boolean;
}

/**
 * Loads settings from the database, sets defaults if not found, and updates the database.
 * @param settingNames An array of setting keys to fetch.
 * @param defaultSettings An object containing the default values for the settings.
 * @returns A promise that resolves to an object with the settings.
 */
async function loadSettings(settingNames: string[], defaultSettings: SettingsMap): Promise<SettingsMap> {
  try {
    const foundSettings = await db.app_settings.where('key').anyOf(settingNames).toArray();

    const settingsMap: SettingsMap = foundSettings.reduce((acc: SettingsMap, curr: { key: string; value: any }) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});

    const finalSettings: SettingsMap = {};
    for (const key of settingNames) {
      if (settingsMap[key] === undefined) {
        finalSettings[key] = defaultSettings[key];
        await db.app_settings.add({ key, value: defaultSettings[key] });
      } else {
        finalSettings[key] = settingsMap[key];
      }
    }

    return finalSettings;
  } catch (error) {
    console.error('Error fetching or updating settings in IndexedDB:', error);
    throw new Error('Failed to load settings');
  }
}

export default loadSettings;
