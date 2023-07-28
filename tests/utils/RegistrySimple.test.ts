import { RegistrySimple } from "../../src/util/registry/RegistrySimple";

describe("RegistrySimple", () => {
	let registry;

	beforeEach(() => {
		registry = new RegistrySimple();
	});

	it("should be able to add and retrieve an object", () => {
		registry.set("foo", 42);
		const result = registry.getValue("foo");
		expect(result).toBe(42);
	});

	it("should be able to detect duplicate keys", () => {
		const spy = jest.spyOn(console, "debug");
		registry.set("foo", 42);
		registry.set("foo", 99);
		expect(spy).toHaveBeenCalledWith("Adding duplicate key 'foo' to registry");
	});

	it("should be able to get all keys", () => {
		registry.set("foo", 42);
		registry.set("bar", 99);
		const result = registry.getKeys();
		expect(result).toEqual(new Set(["foo", "bar"]));
	});

	it("should be able to check if it has a key", () => {
		registry.set("foo", 42);
		const result = registry.hasKey("foo");
		expect(result).toBe(true);
	});

	it("should throw an error when attempting to add null or undefined key or value", () => {
		expect(() => {
		registry.set(null, 42);
		}).toThrowError("Parameter 'key' cannot be null or undefined");

		expect(() => {
		registry.set("foo", undefined);
		}).toThrowError("Parameter 'value' cannot be null or undefined");
	});

	it("should be iterable", () => {
		registry.set("foo", 42);
		registry.set("bar", 99);
		const result = [...registry];
		expect(result).toEqual([42, 99]);
	});
});
