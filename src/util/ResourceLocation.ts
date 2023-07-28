export class ResourceLocation {
	protected readonly resourcePath: string;

	constructor(resourcePath: string) {
		this.resourcePath = resourcePath;
	}

	public getResourcePath(): string {
		return this.resourcePath;
	}

	public toString(): string {
		return this.resourcePath;
	}
}