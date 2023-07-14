import { useReducer } from 'react';
import { SettingsAccordionAction } from '@utils/types';
import PreferencesAccordion from '@components/Settings/PreferencesAccordion';
import AccountAccordion from '@components/Settings/AccountAccordion';
import GeneralAccordion from '@components/Settings/GeneralAccordion';

interface AccordionState {
  general: boolean;
  preferences: boolean;
  account: boolean;
}

const initialState: AccordionState = {
  general: false,
  preferences: false,
  account: false,
}

const reducer = (state: AccordionState, action: SettingsAccordionAction) => {
  switch (action.type) {
    case "ACCOUNT":
      return {
        ...state,
        account: true,
        general: false,
        preferences: false
      };
    case "PREFERENCES":
      return {
        ...state,
        account: false,
        preferences: true,
        general: false,
      };
    case "GENERAL":
      return {
        ...state,
        general: true,
        account: false,
        preferences: false
      };
    case "NONE":
      return {
        ...state,
        general: false,
        preferences: false,
        account: false,
      };

    default:
      return state;
  }
}

export default function Settings() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <GeneralAccordion expanded={state.general} dispatch={dispatch}/>
      <PreferencesAccordion expanded={state.preferences} dispatch={dispatch}/>
      <AccountAccordion expanded={state.account} dispatch={dispatch}/>
    </div>
  );
}