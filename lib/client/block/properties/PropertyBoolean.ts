import Property from "./Property";

export default class PropertyBoolean extends Property {
	public allowedValues: boolean[] = [true, false];

	constructor(name: string) {
		super(name);
	}
}
