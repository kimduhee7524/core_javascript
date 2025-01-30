function useState(initialValue) {
    let state = { value: initialValue }; // 상태를 객체로 저장
  
    function setState(newValue) {
      state.value = newValue;
    }
  
    return [new Proxy(state, { get: (target) => target.value }), setState];
  }