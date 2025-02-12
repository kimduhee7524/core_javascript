---
title: "[js] 실행 컨텍스트, 스코프 체인, 클로저"
seoTitle: "JavaScript: Context, Scope, Closure"
seoDescription: "JavaScript 실행 컨텍스트, 스코프 체인, 클로저의 개념"
datePublished: Wed Feb 12 2025 10:11:00 GMT+0000 (Coordinated Universal Time)
cuid: cm71r3eaa000m09kyhfl2gem8
slug: js-1
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1739336850570/2c334cda-42a2-4329-a969-b1dc0524875a.png
tags: 7yg066gc7kca, 7iuk7zaj7luo7ywn7iqk7yq4, 7iqk7l2u7zse7lk07j24

---

## 📌 실행 컨텍스트

실행 컨텍스트는 **코드를 실행하는 데 필요한 정보를 담고 있다.** 주로 **함수가 실행될 때 생성되며, 실행이 끝나면 사라지는** 스택 기반 구조를 따른다.  
이러한 원리에 따라 실행 컨텍스트는 **콜 스택(Call Stack)** 에 쌓이며, **가장 마지막에 추가된 컨텍스트부터 실행됨으로써** 함수 실행 순서를 관리한다.  
이 방식 덕분에 **코드 실행 순서와 실행 환경이 일관되게 유지된다**.

```jsx
var a = 1
function outer() {
  // --------------------------- [2]
  function inner() {
    // ------------------------- [4]
    console.log(a) // ---------- [5]
    var a = 3 // --------------- [6]
  }
  inner() // ------------------- [3]
  console.log(a) // ------------ [7]
}
outer() // -------------------- [1]
console.log(a) // --------------[8]
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1739332739830/4af405b0-b5ee-48f1-8dc0-0a40bd62abf7.png align="center")

실행 컨텍스트의 주요 정보

* **VariableEnvironment** (변수 환경)
    
* **LexicalEnvironment** (렉시컬 환경)
    
* **ThisBinding** (`this` 바인딩)
    

**VariableEnvironment** 와 **LexicalEnvironment** 는 아래 두 가지 요소를 포함한다

* **EnvironmentRecord (환경 기록)**
    
    * 변수, 함수 선언을 저장하는 객체 → **호이스팅과 관련**
        
* **OuterEnvironmentReference (외부 환경 참조)**
    
    * **스코프 체인**을 따라 외부 환경을 참조 → **클로저와 관련**
        

###   
🔍 **EnvironmentRecord** 가 호이스팅(Hoisting)과 관련 있는 이유

**JS 엔진은** 코드를 실행하기 전에 **모든 변수와 함수 선언을** `EnvironmentRecord`에 먼저 등록한다.  
이 때문에 **변수와 함수가 선언되기 전에도 접근할 수 있는 현상**, 즉 **호이스팅(Hoisting)** 이 발생.

✅ **예제 1: var 변수 호이스팅**

```jsx
console.log(a); // undefined (호이스팅됨)
var a = 10;
console.log(a); // 10
```

1. `var a;` 선언이 **EnvironmentRecord에 먼저 저장됨** (초기값: `undefined`)
    
2. `console.log(a);` 실행 → `undefined` 출력
    
3. `a = 10;` 실행 → 값이 업데이트됨
    

➡️ `var` 변수는 **초기화되지 않은 상태에서 Hoisting** 되므로 `undefined` 가 출력됨.

---

✅ **예제 2:** **함수선언문의 호이스팅**

```jsx
hello(); // "Hello World!"

function hello() {
  console.log("Hello World!");
}
```

1. `hello` 함수 선언이 **EnvironmentRecord에 저장됨**
    
2. 함수 전체가 **호이스팅됨** (즉, 미리 사용할 수 있음!)
    
3. `hello();` 실행 → `"Hello World!"` 출력
    

➡️ **함수 선언은 전체가 호이스팅되므로, 선언 전에 호출 가능**.

---

✅ **예제 3: let / const 는 왜 호이스팅이 다르게 동작할까?**

```jsx
console.log(b); // ❌ ReferenceError
let b = 10;
console.log(b);
```

1. `let b;` 선언이 **EnvironmentRecord에 저장됨**
    
2. 하지만 초기화(`undefined` 할당)가 되지 않음!
    
3. 실행 전에 접근하면 **ReferenceError 발생**
    

➡️ `let` / `const`는 호이스팅은 되지만 "TDZ(Temporal Dead Zone)"에 의해 초기화 전에는 접근할 수 없음!

---

### 🔍 **OuterEnvironmentReference** 란?

**OuterEnvironmentReference (외부 환경 참조)** 는 **스코프 체인**을 따라 변수를 찾는 역할

자바스크립트에서 변수를 찾을 때는 **스코프 체인(Scope Chain)** 을 따라간다.  
쉽게 말해, 현재 실행 컨텍스트에서 변수를 찾고, 없으면 상위 컨텍스트로 이동한다.  
이때, 상위 컨텍스트가 **무엇인지 연결해주는 것이** `OuterEnvironmentReference` 이다.

1. **현재 실행 컨텍스트의 EnvironmentRecord**에서 변수를 찾음.
    
2. 없으면 **OuterEnvironmentReference(외부 환경 참조)** 를 따라 **상위 컨텍스트**로 이동.
    
3. 계속 올라가다가 **전역 컨텍스트까지 가도 없으면 ReferenceError 발생**.
    

```jsx
function outer() {
  let x = 10;
  
  function inner() {
    console.log(x); // outer()의 x를 찾을 수 있음!
  }
  
  inner();
}

outer(); // 10
```

1. `inner()` 실행 컨텍스트가 생성됨
    
2. `inner()` 안에는 `x`가 없으므로 **OuterEnvironmentReference를 통해** `outer()`의 x를 찾음
    
3. `console.log(x);` 실행 → `10` 출력
    

➡️ **이 과정이 스코프 체인(Scope Chain)!**

➡️ **클로저(Closure)도 이 원리를 기반으로 동작함!**

---

## 📌클로저란?

**클로저(Closure)** 는 **"외부 함수의 변수(스코프)를 참조하는 내부 함수"**  
➡️ 그리고 **외부 함수가 종료된 후에도, 내부 함수가 그 변수를 계속 사용할 수 있는 상태**  
➡️ **왜냐하면** 함수가 **참조형 데이터**이기 때문

✅ **예제 1: 클로저가 없는 경우 (일반적인 스코프 체인)**

```jsx
function outer() {
  let count = 0;
}

outer();
console.log(count); // ❌ ReferenceError
```

1. `outer()` 실행 → `count`가 `outer()`의 실행 컨텍스트에 저장됨.
    
2. `outer()`가 끝나면 실행 컨텍스트가 사라지면서 `count`도 삭제됨.
    
3. `console.log(count);` 실행 시 변수 `count`를 찾을 수 없음 → `ReferenceError` 발생.
    

➡️ **즉, 스코프 체인만으로는 함수가 종료된 후 변수를 유지할 수 없다!**

---

✅ **예제 2: 클로저가 안 되는 경우 (값이 복사됨)**

```jsx
function outer() {
    let count = 0; // 외부 변수

    return count; // ❌ 기본형(숫자)을 반환 (클로저 X)
}

const counter = outer();
console.log(counter); // 0 ✅
counter++;
console.log(counter); // 1 ❌ (값이 변하지 않음!)
```

* `outer()`가 실행되면, `count = 0`이 되고,
    
* `return count;`에서 `count`의 값(0)만 반환됨.
    
* 즉, `counter = 0;`이 되어 버려서 `count`와의 연결이 끊어짐!
    
* 그래서 `counter++` 해도, 원래 `count`에는 영향을 주지 않음!
    

➡️ **기본형 데이터를 반환하면, 값이 복사될 뿐 클로저가 되지 않음!**

---

✅ **예제 2: 클로저를 사용한 경우**

```jsx
function outer() {
  let count = 0; // 실행 컨텍스트에 저장됨

  return function inner() {
    count++; // 외부 변수 count를 계속 사용할 수 있음
    console.log(count);
  };
}

const counter = outer(); // outer() 실행 후 inner() 반환
counter(); // 1
counter(); // 2
counter(); // 3
```

1. `outer()` 실행 → 실행 컨텍스트 생성 (`a = 10` 저장).
    
2. `inner()` 함수가 반환되면서, `outer()`의 실행 컨텍스트가 원래는 사라져야 하지만, **inner()가** `count` **를 참조하고 있어서 GC(Garbage Collection)가 제거하지 않음!**
    
3. `counter();` 실행 시마다 `count++`가 실행되면서 값을 유지함.
    

➡️ **클로저 덕분에** `outer()`의 실행 컨텍스트가 유지되어 `count`**에 접근할 수 있다!**

➡️ **즉, 클로저 덕분에 실행 컨텍스트가 사라지지 않아 변수를 유지할 수 있다!**

➡️ 스코프 체인은 변수를 찾는 기본적인 규칙이라면, 클로저는 사라질 실행 컨텍스트를 유지하여 변수를 계속 참조할 수 있도록 하는 기능

###   
🔍 **클로저가 왜 중요해?**

**보통 함수가 끝나면 변수도 사라지는데, 클로저는 변수를 유지할 수 있다!**  
➡️ **"함수가 종료된 후에도 실행 컨텍스트를 유지하는 능력"이 클로저의 핵심!**

✔ **데이터 은닉 (정보 보호)**  
✔ **상태 유지 (ex: 카운터, 설정 값)**  
✔ **비동기 처리 (setTimeout, eventListener)**

### 📝 **클로저 정리**

✔ **클로저는 내부 함수(inner function)다.**  
✔ **클로저는 외부 함수(outer function)의 변수를 참조한다.**  
✔ **외부 함수 실행이 끝나도, 내부 함수가 변수를 유지한다.**

**한 마디로: "함수가 끝난 후에도 변수를 유지하면, 그게 클로저다!"** 🚀