export function useState<T>(initialValue: T): [() => T, (newValue: T) => void] {
  let state: T = initialValue;  

  function getState(): T {
    return state;
  }

  function setState(newValue: T): void {
    state = newValue;
  }

  return [getState, setState];
}

// const [count, setCount] = useState<number>(0);

// console.log(count()); 
// setCount(5);
// console.log(count()); 
