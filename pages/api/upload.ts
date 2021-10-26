/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { cloudinary } from '@/utils/cloudinary';

const storage = new CloudinaryStorage({
	cloudinary,
	params: {
		public_id: (req: any) => req.query.id,
	} as any,
});

const upload = multer({ storage });
const uploadMiddleware = upload.single('upload');

interface MulterRequest extends NextApiRequest {
	file: any;
}

const handler = nc<MulterRequest, NextApiResponse>({
	onError(error, _, res) {
		console.log({ error });
		res.status(400).json({ error: error.message });
	},
	onNoMatch(_, res) {
		res.status(400).json({ error: 'Method not allowed' });
	},
});

handler.use(uploadMiddleware);
handler.post((req, res) => {
	res.status(200).json({ path: req.file.path });
});

export default handler;

export const config = {
	api: {
		bodyParser: false, // Disallow body parsing, consume as stream
	},
};
