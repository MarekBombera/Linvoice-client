import { useState, useEffect } from 'react';

export const useMediaQueryMatch = (mediaQuery: string): boolean => {
	const [mediaMatch, setMediaMatch] = useState<boolean>(false);

	useEffect(() => {
		const breakpoints = (mediaQuery: string): string => {
			switch (mediaQuery) {
				case 'phone':
					return '(max-width: 767px)';
				case 'tablet':
					return '(min-width: 768px)';
				case 'desktop':
					return '(min-width: 1366px)';
				default:
					return mediaQuery;
			}
		};
		const matchMediaAPI = window.matchMedia(breakpoints(mediaQuery));
		setMediaMatch(matchMediaAPI.matches);

		const updateScreenSize = (e: MediaQueryListEvent): void => {
			setMediaMatch(e.matches);
		};

		matchMediaAPI.addEventListener('change', updateScreenSize);
		return () => {
			matchMediaAPI.removeEventListener('change', updateScreenSize);
		};
	}, [mediaMatch, mediaQuery]);

	return mediaMatch;
};
