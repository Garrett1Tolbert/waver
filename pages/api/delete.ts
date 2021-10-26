import type { NextApiRequest, NextApiResponse } from 'next';
import { Cloudinary } from '@/utils/cloudinary';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> {
	if (req.method !== 'POST') {
		res.status(405).end();
		return;
	}

	try {
		const { path } = req.body;
		const client = new Cloudinary();

		if (path) {
			await client.delete(path as string);
		}
		res.status(200).json({ message: 'Deleted' });
	} catch (error) {
		console.log({ error });
		res.status(500).json({ error });
	}
}
