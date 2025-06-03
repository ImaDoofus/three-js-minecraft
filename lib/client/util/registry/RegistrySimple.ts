import type { IRegistry } from "./IRegistry";

/**
 * A simple implementation of the `IRegistry` interface that stores key-value pairs
 * in a `Map`.
 *
 * @typeparam K The type of the keys in the registry.
 * @typeparam V The type of the values in the registry.
 */
export class RegistrySimple<K, V> implements IRegistry<K, V> {
	protected readonly keyToValue: Map<K, V> = new Map();

	/**
	 * Gets the value associated with the specified key.
	 *
	 * @param name The key to look up.
	 * @returns The value associated with the key, or `undefined` if the key is not present in the registry.
	 */
	public getValue(name: K): V | undefined {
		return this.keyToValue.get(name);
	}

	/**
	 * Adds a key-value pair to the registry.
	 *
	 * @param key The key to add.
	 * @param value The value to associate with the key.
	 */
	public set(key: K, value: V): void {
		this.keyToValue.set(key, value);
	}

	/**
	 * Gets a set of all the keys in the registry.
	 *
	 * @returns A set of all the keys in the registry.
	 */
	public getKeys(): Set<K> {
		return new Set(this.keyToValue.keys());
	}

	/**
	 * Determines whether the registry contains the specified key.
	 *
	 * @param key The key to look up.
	 * @returns `true` if the key is present in the registry; otherwise, `false`.
	 */
	public hasKey(key: K): boolean {
		return this.keyToValue.has(key);
	}

	[Symbol.iterator](): Iterator<V> {
		return this.keyToValue.values()[Symbol.iterator]();
	}
}
