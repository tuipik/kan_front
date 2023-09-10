import {useFetchSettingsQuery} from "../store";

export default function useSettings() {
  let {data: settings, isFetching: isFetchingSettings, error: settingsError} = useFetchSettingsQuery();

  if (settings?.data) {
    settings = settings.data[0];
  }

  return {settings, isFetchingSettings, settingsError};
}