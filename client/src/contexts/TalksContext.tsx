import * as React from 'react';
import { TalkCardInfo } from '../types/talk';

type TalksContextData = {
  talks: TalkCardInfo[],
  reloadTalks: React.Dispatch<React.SetStateAction<TalkCardInfo[]>>
};

type ProviderProps = {
  children: React.ReactNode
};

const TalksContext = React.createContext<TalksContextData>({
  talks: [],
  reloadTalks: () => { }
});


TalksContext.displayName = 'TalksContext';

export function TalksProvider({ children }: ProviderProps) {

  const [talks, setTalks] = React.useState<TalkCardInfo[]>([]);

  return (
    <TalksContext.Provider value={{ talks, reloadTalks: setTalks }}>
      {children}
    </TalksContext.Provider>
  );
}

export function useTalks(): TalksContextData {
	const context = React.useContext(TalksContext);

	if (!context) {
		throw new Error('useAuth must be within its context');
	}

	return context;
}