import React, { useEffect } from 'react';

export const useClickOutside = (
	handler: () => void
): React.RefObject<HTMLDivElement> => {
	const domNodeRef = React.useRef<HTMLDivElement>(null);

	useEffect(() => {
		const clickOutsideHandler = (e: MouseEvent): void => {
			if (!domNodeRef.current) {
				return;
			} else if (!domNodeRef.current.contains(e.target as Node)) {
				handler();
			}
		};
		document.addEventListener('mousedown', clickOutsideHandler);

		return () => {
			document.removeEventListener('mousedown', clickOutsideHandler);
		};
	}, [handler]);

	return domNodeRef;
};
