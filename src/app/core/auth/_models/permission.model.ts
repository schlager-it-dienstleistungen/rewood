export class Permission {
		id: number;
		title: string;
		level: number;
		parentId?: number;
		isSelected?: boolean;
		name: string;
		children?: Permission[];
}
