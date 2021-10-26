import { ReactNode } from 'react';

export interface Photo {
	publisher: string;
	caption: string;
	src: string;
	timestamp: Date;
}

export interface LayoutProps {
	children: ReactNode;
}
