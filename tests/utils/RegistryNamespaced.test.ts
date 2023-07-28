import { RegistryNamespaced } from "../../src/util/registry/RegistryNamespaced";

describe("RegistryNamespaced", () => {
	let registry;

	beforeEach(() => {
		registry = new RegistryNamespaced();
	});

	it("should be able to add and retrieve an object", () => {
		registry.register(1, "foo", 42);
		const result = registry.getValueByID(1);
		expect(result).toBe(42);
	});

	it("should be able to detect duplicate keys", () => {
		const spy = jest.spyOn(console, "debug");
		registry.register(1, "foo", 42);
		registry.register(2, "foo", 99);
		expect(spy).toHaveBeenCalledWith("Adding duplicate key 'foo' to registry");
	});

	it("should be able to get all keys", () => {
		registry.register(1, "foo", 42);
		registry.register(2, "bar", 99);
		const result = registry.getKeys();
		expect(result).toEqual(new Set(["foo", "bar"]));
	});

	it("should be able to check if it has a key", () => {
		registry.register(1, "foo", 42);
		const result = registry.hasKey("foo");
		expect(result).toBe(true);
	});

	it("should throw an error when attempting to add null or undefined key or value", () => {
		expect(() => {
			registry.register(1, null, 42);
		}).toThrowError("Parameter 'key' cannot be null or undefined");

		expect(() => {
			registry.register(1, "foo", undefined);
		}).toThrowError("Parameter 'value' cannot be null or undefined");
	});

	it("should be iterable", () => {
		registry.register(1, "foo", 42);
		registry.register(2, "bar", 99);
		const result = [...registry];
		expect(result).toEqual([42, 99]);
	});

	it("should be able to get ID by value", () => {
		registry.register(1, "foo", 42);
		const result = registry.getID(42);
		expect(result).toBe(1);
	});
});