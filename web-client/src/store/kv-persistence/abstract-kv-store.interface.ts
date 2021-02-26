type KvStoreValue = Record<string, any>;
type KvStoreStringValue = string;
interface KvStoreMethodNames {
  getItem: string;
  setItem: string;
  deleteItem: string;
  destroy?: string;
}

export abstract class AbstractKeyValueStore {
  private _store: any = null;
  private _methods = {} as KvStoreMethodNames;
  constructor(store: any, methods: KvStoreMethodNames) {
    this._store = store;
    this._methods = methods;
  }

  private _getSerializedValue(value: KvStoreValue) {
    return JSON.stringify(value);
  }
  private _getParsedValue<V extends KvStoreValue>(valueString: string): V {
    return JSON.parse(valueString);
  }
  public async load<V extends KvStoreValue>(k: string): Promise<V> {
    const stringVal = await this._store[this._methods.getItem](k);
    return this._getParsedValue<V>(stringVal);
  }
  public async loadString(k: string): Promise<KvStoreStringValue> {
    return await this._store[this._methods.getItem](k);
  }
  public async save(k: string, v: KvStoreValue): Promise<void> {
    const stringVal = this._getSerializedValue(v);
    await this._store[this._methods.setItem](k, stringVal);
  }
  public async saveString(k: string, v: KvStoreStringValue): Promise<void> {
    await this._store[this._methods.setItem](k, v);
  }
  public async remove(k: string): Promise<void> {
    await this._store[this._methods.deleteItem](k);
  }
  public async destroy(): Promise<void> {
    if (this._methods.destroy) {
      await this._store[this._methods.destroy]();
    }
  }
}
