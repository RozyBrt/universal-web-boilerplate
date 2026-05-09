type Factory<T = any> = () => T;

export class Container {
  private static instance: Container;
  private services = new Map<string, any>();
  private factories = new Map<string, Factory>();

  private constructor() {}

  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  register<T>(key: string, instance: T): void {
    this.services.set(key, instance);
  }

  registerFactory<T>(key: string, factory: Factory<T>): void {
    this.factories.set(key, factory);
  }

  resolve<T>(key: string): T {
    if (this.services.has(key)) {
      return this.services.get(key);
    }

    if (this.factories.has(key)) {
      const factory = this.factories.get(key)!;
      const instance = factory();
      this.services.set(key, instance);
      return instance;
    }

    throw new Error(`Service not found: ${key}`);
  }
}

export const container = Container.getInstance();
