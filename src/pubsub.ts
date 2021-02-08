export type CallbackFn = (eventData: any) => void;

export interface IPubSub {
  events: Set<string>;
  subscribers: Map<string, CallbackFn[]>;

  on: (eventName: string, callback: any) => void;
  emit: (eventName: string, eventData?: any) => void;
  register: (eventName: string) => void;
}

// EventBus
export default class PubSub implements IPubSub {
  public events: Set<string> = new Set();
  public subscribers: Map<string, CallbackFn[]> = new Map();

  register(eventName: string) {
    if (this.events.has(eventName)) {
      throw new Error(`Event ${eventName} already exists.`);
    }

    this.events.add(eventName);

    return this;
  }

  on(eventName: string, callback: any) {
    if (!this.events.has(eventName)) {
      this.register(eventName);
    }

    if (typeof callback !== "function") {
      throw new Error(`Callback is not a function`);
    }

    if(!this.subscribers.has(eventName)) {
      this.subscribers.set(eventName, []);
    }

    const subscribers =this.subscribers.get(eventName);
    subscribers!.push(callback);
  }

  emit(eventName: string, eventData?: any) {
    if (!this.events.has(eventName)) {
      throw new Error(`Event ${eventName} doesn't exist.`);
    }

    const callbacks = this.subscribers.get(eventName);
    callbacks?.forEach(cb => cb(eventData));
  }
}
