import { supabase } from "@utils/supabaseClient";
import useUser from "./useUser";
import { useQuery } from "@tanstack/react-query";

export default function useSettings() {
  const user  = useUser();

  const { data: settings, isLoading, error } = useQuery(
    ["settings", user?.id ?? ""],
    getSettings,
    { enabled: user !== null });
    
  async function getSettings() {
    const { data, error } = await supabase
      .from('VerbalVirtuoso.Settings')
      .select('name, value')
      .eq('user', user!.id);

    if(error) {
      console.log(error);
      throw error;
    }

    const settings = data?.map((setting) => {
      return {
        name: setting.name,
        value: setting.value
      }
    });

    return settings;
  }

  return { settings, isLoading, error };
}