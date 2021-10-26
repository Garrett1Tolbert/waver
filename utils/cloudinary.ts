export const cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export class Cloudinary {
	cloudinaryUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}/image/upload/`;

	async delete(path: string): Promise<void> {
		const id = path.split(this.cloudinaryUrl)[1];
		const ref = id.split('/').slice(1).join('/');
		const publicId = ref.split('.')[0];

		const res = await cloudinary.uploader.destroy(publicId, {
			invalidate: true,
		});
		console.log(`Deleted resource: ${publicId} --> ${res.result}`);
	}
}
