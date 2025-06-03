import Property from "./Property";

export default class PropertyEnum<T> extends Property {
	public allowedValues: T[] = [];

	constructor(name: string, allowedValues: T[]) {
		super(name);

		this.allowedValues = allowedValues;
	}
}
