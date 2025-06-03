import Property from "./Property";

export default class PropertyInteger extends Property {
	public allowedValues: number[] = [];

	constructor(name: string, min: number, max: number) {
		super(name);

		for (let i = min; i <= max; i++) {
			this.allowedValues.push(i);
		}
	}
}
