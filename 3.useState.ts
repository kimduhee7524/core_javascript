function useState<T>(initialValue: T): [T, (newValue: T) => void] {
    let state = { value: initialValue };
  
    function setState(newValue: T): void {
      state.value = newValue;
    }
  
    return [new Proxy(state, { get: (target) => target.value }) as T, setState];
  }
  