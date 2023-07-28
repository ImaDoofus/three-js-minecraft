import { RegistrySimple } from "./RegistrySimple";

/**
 * A registry that maps unique integer IDs, keys, and values. Values can be retrieved by ID,
 * key, or iterator.
 */
export class RegistryNamespaced<K, V> extends RegistrySimple<K, V> {
	protected readonly idToValue: Map<number, V> = new Map();
	protected readonly valueToID: Map<V, number> = new Map();
	protected readonly valueToKey: Map<V, K> = new Map();

	public constructor() {
		super();
	}

	/**
	 * Registers a new value with the registry, associating it with the specified ID and key.
	 *
	 * @param id - The ID to associate with the value.
	 * @param key - The key to associate with the value.
	 * @param value - The value to register.
	 */
	public register(id: number, key: K, value: V): void {
		super.set(key, value);
		this.valueToKey.set(value, key);
		this.idToValue.set(id, value);
		this.valueToID.set(value, id);
	}

	/**
	 * Gets the ID associated with the specified value.
	 *
	 * @param value - The value to get the ID for.
	 * @returns The ID associated with the specified value, or undefined if the value is not registered.
	 */
	public getID(value: V): number | undefined {
		return this.valueToID.get(value);
	}

	/**
	* Gets the key associated with the specified value.
	*
	* @param value - The value to get the key for.
	* @returns The key associated with the specified value, or undefined if the value is not registered.
	*/
	public getKey(value: V): K | undefined {
		return this.valueToKey.get(value);
	}

	/**
	 * Gets the value associated with the specified ID.
	 *
	 * @param id - The ID to get the value for.
	 * @returns The value associated with the specified ID, or undefined if the ID is not registered.
	 */
	public getValueByID(id: number): V | undefined {
		return this.idToValue.get(id);
	}

	public [Symbol.iterator](): IterableIterator<V> {
		return this.idToValue.values();
	}
}