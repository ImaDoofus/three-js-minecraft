export interface IRegistry<K, V> extends Iterable<V> {
	getValue(name: K): V | undefined;
	set(name: K, value: V): void;
}
