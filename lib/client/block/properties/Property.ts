export default class Property {
	private name: string;
	protected allowedValues: any[] = [];

	protected constructor(name: string) {
		this.name = name;
	}

	public getName(): string {
		return this.name;
	}

	public getAllowedValues(): any[] {
		return this.allowedValues;
	}

	public toString(): string {
		return (
			"Property{" + "name=" + this.name + ", values=" + this.allowedValues + "}"
		);
	}
}
