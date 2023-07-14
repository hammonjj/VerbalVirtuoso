import { supabase } from "@utils/supabaseClient";
import useUser from "./useUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Setting } from "@utils/types";

export default function useSettings() {
  const user  = useUser();
  const queryClient = useQueryClient();

  const { data: settings, isLoading, error } = useQuery(
    ["settings", user?.id ?? ""],
    () => getSettings(user),
    { enabled: user !== null }
  );
    
  const saveAPIKeyMutation = useMutation(
    saveAPIKey,
    {
      onSuccess: (updatedApiKey) => {
        queryClient.setQueryData(
          ["settings", user?.id ?? ""], 
          (oldSettings: any) => {
            const newSettings = oldSettings.map((setting: any) => {
              if (setting.name === "ChatGPTApiKey") {
                return {
                  name: setting.name,
                  value: updatedApiKey.value
                };
              } else {
                return setting;
              }
            });
            return newSettings;
          }
        );
      }
    }
  );

  function getSetting(name: string): Setting | null {
    return settings?.find((setting) => setting.name === name) ?? null;
  }

  function updateAPIKey(apiKey: string) {
    saveAPIKeyMutation.mutate({apiKey, user});
  }
  
  return { settings, isLoading, error, updateAPIKey, getSetting };
}

async function getSettings(user: any): Promise<Setting[]> {
  const { data, error } = await supabase
    .from('PromptBox.Settings')
    .select('name, value')
    .eq('user', user.id);

  if(error) {
    console.log(error);
    throw error;
  }

  const settings = data?.map((setting) => {
    return {
      name: setting.name,
      value: setting.value
    };
  });

  return settings;
}

async function saveAPIKey({user, apiKey}: {user: any, apiKey: string}): Promise<Setting> {
  const { error } = await supabase
    .from('PromptBox.Settings')
    .upsert({ user: user.id, name: "ChatGPTApiKey", value: apiKey });

  if(error) {
    console.log(error);
    throw error;
  }

  return {
    name: "ChatGPTApiKey",
    value: apiKey
  };
}
