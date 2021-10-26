import { createContext, useContext, useState } from 'react';
import { LayoutProps, Photo } from 'types';

interface initialProps {
	photos: Photo[];
	updatePhotos: (payload: Photo[]) => void;
}

const initialState: initialProps = {
	photos: [],
	updatePhotos: () => {},
};

const DataContext = createContext(initialState);

export function DataProvider({ children }: LayoutProps): JSX.Element {
	const data = useDataLayer();
	return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}

export const useData = (): initialProps => {
	return useContext(DataContext);
};

const useDataLayer = () => {
	const [photos, setPhotos] = useState<Photo[]>([]);

	const updatePhotos = (payload: Photo[]) => setPhotos(payload);

	return {
		photos,
		updatePhotos,
	};
};
