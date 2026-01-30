class Event {
  private events: { [key: string]: Array<(data?: any) => void> };

  constructor() {
    this.events = {};
  }

  on(eventName: string, fn: (data?: any) => void): void {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  }

  emit(eventName: string, data?: any): void {
    if (this.events[eventName]) {
      this.events[eventName].forEach((fn) => fn(data));
    }
  }
}

export default new Event();
