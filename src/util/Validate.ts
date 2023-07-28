export class Validate {
	public static notNull(value: any, message?: string): void {
		if (value === null || value === undefined) {
			throw new Error(message || "Argument cannot be null or undefined.");
		}
	}
}