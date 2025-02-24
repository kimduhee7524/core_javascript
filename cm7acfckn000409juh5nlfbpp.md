---
title: "VariableEnvironment(변수 환경)과 LexicalEnvironment(렉시컬 환경)의 차이"
seoTitle: "Variable vs Lexical Environment Differences"
seoDescription: "Explains the differences and roles of VariableEnvironment and LexicalEnvironment in JavaScript, especially before and after ES6 updates"
datePublished: Tue Feb 18 2025 10:30:19 GMT+0000 (Coordinated Universal Time)
cuid: cm7acfckn000409juh5nlfbpp
slug: variableenvironment-lexicalenvironment
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1739784562743/dbf2f0fd-e773-4d52-aae6-789acc1f0668.png

---

`VariableEnvironment`(변수 환경)**와** `LexicalEnvironment`(렉시컬 환경)은 JavaScript 실행 컨텍스트의 핵심 구성 요소이다.  
그런데 둘 다 변수와 함수 선언을 저장하고 스코프를 관리하는데, 왜 두 개로 나뉘었을까? 🤔

**ES6 이전과 이후에 VariableEnvironment와 LexicalEnvironment가 구분된 이유가 다소 다르다.**

### 📌 **ES6 이전**

ES6 이전에는 두 환경의 구분이 현재처럼 명확하지 않았다.

* VariableEnvironment와 LexicalEnvironment가 같은 EnvironmentRecord를 공유하지만, 실행 도중 LexicalEnvironment만 변경될 수 있다.
    
* LexicalEnvironment는 `eval`과 `with` 같은 문맥에서 동적으로 변할 수 있지만, VariableEnvironment는 변하지 않는다.
    

ES6에서 `let/const`가 도입되면서 두 환경의 역할이 더 명확해졌다.

---

### 📌 ES6 이후: `let`, `const`의 등장과 스코프 개선

ES6 이후 **let, const 가 도입된 이유는 var에 문제가 많았기 때문이다.**

문제 1: `var`는 호이스팅될 때 `undefined`로 초기화됨 → 의도치 않은 버그 발생 가능

```javascript
console.log(a); // undefined (에러 아님!)
var a = 10;
console.log(a); // 10
```

* 이렇게 하면 **"변수 선언 전에 접근하는 것"이 논리적 오류를 일으킬 가능성이 있음** → 예기치 않은 버그를 유발할 수 있음!
    
* 만약 개발자가 변수를 선언했다고 착각하고 `console.log(a + 1)` 같은 연산을 하면, 예기치 않은 버그가 발생할 수 있음.
    
* 이를 해결하기 위해 선언전에 접급할 수 없는 `let`과 `const`가 도입됨.
    

---

**문제 2:** `var`는 함수 스코프만 가짐 → 블록 스코프(`{}`)를 무시함

```javascript
if (true) {
  var x = 100;
}
console.log(x); // 100 (블록 `{}` 내부에서 선언했지만, 밖에서도 접근 가능!)
```

* `{}` 안에서 선언했는데도 블록 밖에서도 접근 가능 → **블록 스코프가 없음!**
    
* 이를 해결하기 위해 **블록 스코프를 가진** `let`과 `const`가 도입됨.
    

---

**문제 3:** `var`는 중복 선언 가능 → 의도치 않은 변수 재정의 발생 가능

```javascript
var a = 10;
var a = 20; // 에러 없이 덮어쓰기 됨
console.log(a); // 20
```

* 같은 이름으로 변수를 선언해도 에러가 발생하지 않음 → **변수를 실수로 덮어쓰는 오류가 발생할 가능성이 높음.**
    
* 이를 해결하기 위해 `let`과 `const`는 중복 선언을 금지함.
    

---

### **📌** `let`과 `const`의 등장: `var`의 문제 해결!

위와 같은 `var`의 문제를 해결하기 위해 **ES6에서** `let`과 `const`가 도입되었다.

**해결책 1: TDZ(Temporal Dead Zone) 도입 → 선언 전 접근 불가**

```javascript
console.log(a); // ❌ ReferenceError (TDZ)
let a = 10;
console.log(a); // ✅ 10
```

* **변수 선언 전에 접근하면 에러 발생 → 논리적 오류 방지!**
    
* **이제 변수를 선언 전에 실수로 사용할 위험이 사라짐.**
    

---

**해결책 2: 블록 스코프 지원 →** `{}` 안에서만 유효함

```javascript
if (true) {
  let y = 200;
}
console.log(y); // ❌ ReferenceError (블록 밖에서는 접근 불가능!)
```

* **블록** `{}` 내부에서 선언된 변수는 블록을 벗어나면 사라짐 → 전역 오염 방지!
    
* `const`도 동일한 블록 스코프를 가짐.
    

---

**해결책 3: 중복 선언 방지**

```javascript
let z = 30;
let z = 40; // ❌ SyntaxError: Identifier 'z' has already been declared
```

* **같은 변수 이름을 여러 번 선언할 수 없도록 강제 → 실수 방지!**
    
* `const`도 동일하게 중복 선언 불가.
    

**👉 TDZ, 블록 스코프, 중복 선언 방지 기능을 추가해 더 안전한 코드 작성이 가능해졌다!**

### **📌** **ES6** 이후 LexicalEnvironment의 역할

ES6에서 `let`, `const`, `class` 같은 블록 스코프 변수가 등장하면서, **LexicalEnvironment는** `let`, `const`, `class`와 함께 동적으로 변경되는 블록 스코프 관리 역할까지 맡게 됨.

* ES6에서도 실행 컨텍스트 생성 시점에는 두 환경이 동일한 EnvironmentRecord를 참조한다.
    
* 실행 과정에서 let/const 선언이나 블록 스코프 진입 시 LexicalEnvironment가 새로운 환경으로 교체될 수 있다.
    
* VariableEnvironment는 계속 원래의 환경을 유지한다.
    

---

### **📌 VariableEnvironment와 LexicalEnvironment를 구분하는 이유**

**1️⃣** `var`와 `let`/`const`의 초기화 방식이 다름

#### `var`는 호이스팅되고 `undefined`로 초기화됨, `let`/`const`는 호이스팅은 되지만 초기화가 되지않고 TDZ 적용됨

```javascript
console.log(a); // undefined (var는 호이스팅됨)
console.log(b); // ReferenceError (let은 TDZ 상태)
console.log(c); // ReferenceError (const도 TDZ 상태)

var a = 1;
let b = 2;
const c = 3;
```

* `let`과 `const`는 TDZ를 적용하기 위해 **VariableEnvironment에 포함되지 않고, LexicalEnvironment에서만 관리됨.**
    

---

**2️⃣** `let`, `const`의 블록 스코프 관리

```javascript
function example() {
  var a = 10;
  let b = 20;

  if (true) {
    var c = 30;
    let d = 40;
    console.log(a, b, c, d); // 10 20 30 40
  }

  console.log(a, b, c); // 10 20 30
  console.log(d); // ReferenceError (d는 블록 내부에서만 존재)
}

example();
```

* `var a`와 `var c`는 **VariableEnvironment에 저장됨** → 함수 스코프를 따름.
    
* `let b`와 `let d`는 **LexicalEnvironment에 저장됨** → 블록 스코프를 따름.
    

---

### **📌결론**

`VariableEnvironment`와 `LexicalEnvironment`의 구분은 JavaScript의 변수 선언 방식과 스코프 관리의 차이에서 비롯됩니다. ES6 이후, `let`과 `const`의 도입으로 블록 스코프와 TDZ 개념이 추가되면서, 두 환경의 역할이 더욱 명확해졌습니다.

1️⃣ **초기화 방식의 차이**

* `var`는 즉시 초기화 (`undefined` 할당됨).
    
* `let`/`const`는 TDZ 적용 (`ReferenceError` 발생).  
    ➡ **VariableEnvironment가** `var`를 즉시 초기화하도록 관리.  
    ➡ **LexicalEnvironment가** `let`, `const`의 TDZ를 적용하도록 관리.
    

2️⃣ **블록 스코프(**`let`, `const`)와 함수 스코프(`var`)의 차이

* `var`는 **VariableEnvironment에서 함수 스코프를 가짐.**
    
* `let`, `const`는 **LexicalEnvironment에서 블록 스코프를 가짐.**  
    ➡ **LexicalEnvironment를 따로 관리하지 않았다면,** `let`, `const`도 함수 스코프를 따라야 했음.