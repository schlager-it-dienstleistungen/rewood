export interface Picture {
	title: string;
	path: string;
	url?: string; // Not saved because it isn't correct after ResizeImage -> so the URL is loaded from Storage
	file?: File;
	toDelete: boolean;
}
