function useState(initialValue) {
    let state = initialValue;  
  
    function setState(newValue) {
      state = newValue; 
    }
  
    return [state, setState]; 
  }



  // const [count, setCount] = useState(0);
  // console.log(count);