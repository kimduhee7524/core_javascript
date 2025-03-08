---
title: "[js] 프로토타입과 상속 정리"
seoTitle: "JavaScript 프로토타입과 상속 요약"
seoDescription: "자바스크립트의 프로토타입과 상속 기초: 생성자 함수, 인스턴스, 프로토타입 체인을 쉽게 이해하는 가이드"
datePublished: Tue Mar 04 2025 12:21:56 GMT+0000 (Coordinated Universal Time)
cuid: cm7ugkt60000009lbew1r4ffa
slug: js-1-1
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1741090852253/f32e11e8-6d93-4ec3-8087-de1a771ab68c.png

---

자바스크립트에서 **객체 지향 프로그래밍(OOP)**을 이해하려면 **생성자 함수, 인스턴스, 프로토타입, 상속** 개념이 필수적이다.  
이번 포스팅에서는 **프로토타입과 상속이 어떻게 동작하는지** 정리해보았다.

## 1️⃣ 프로토타입이 필요한 이유

자바스크립트에서 객체를 생성할 때, **공통된 메서드(함수)를 모든 객체가 개별적으로 가지면 비효율적**이다.  
예를 들어, 다음과 같은 경우를 생각해보자.

### ❌ 개별 객체마다 중복된 메서드 생성

```javascript
function User(name, age) {
  this.name = name;
  this.age = age;
  this.sayHello = function() { // ⛔ 메서드가 객체마다 개별적으로 생성됨
    return `Hello, I'm ${this.name}`;
  };
}

const user1 = new User("철수", 25);
const user2 = new User("영희", 30);

console.log(user1.sayHello()); // Hello, I'm 철수
console.log(user2.sayHello()); // Hello, I'm 영희
```

✔ 위 코드에서는 `sayHello()` 메서드가 `user1`, `user2` 각각의 객체에 독립적으로 생성된다.  
✔ 객체가 많아질수록 **메모리 낭비가 발생**한다.

✅ **해결 방법** → **프로토타입을 사용하여 메서드를 공유**

---

## **2️⃣ 생성자 함수란?**

✔ 생성자 함수는 `new` 키워드와 함께 사용하여 새로운 객체(인스턴스)를 만든다.  
✔ 객체를 만들기 위한 템플릿(설계도) 역할을 한다.

```javascript
function User(name, age) {
  this.name = name;
  this.age = age;
}

const user1 = new User("철수", 25);
console.log(user1); // User { name: '철수', age: 25 }
```

✔ `User` 함수는 **새로운 객체를 만들기 위한 생성자 역할**을 한다.  
✔ `user1`은 `User` 생성자 함수에서 만들어진 **인스턴스(객체)**이다.

---

## **3️⃣ 인스턴스란?**

✔ **인스턴스**는 생성자 함수 또는 클래스로부터 만들어진 **실제 데이터가 있는 객체**를 의미한다.  
✔ 모든 인스턴스는 **\[\[Prototype\]\] (또는** `__proto__`) 속성을 가진다.

| 구분 | 설명 | 예제 |
| --- | --- | --- |
| **생성자 함수** | 객체를 만들기 위한 템플릿(설계도) | `function User(name, age) { ... }` |
| **인스턴스** | 생성자 함수로부터 만들어진 실제 객체 | `const user1 = new User("철수", 25);` |

```javascript
function User(name, age) {
  this.name = name;
  this.age = age;
}

const user1 = new User("철수", 25);

console.log(user1.__proto__ === User.prototype); // true ✅
console.log(User.prototype.__proto__ === Object.prototype); // true ✅
```

✔ 즉, 생성자 함수로 만든 **모든 인스턴스는 자동으로 프로토타입을 상속받는다.**

---

## **4️⃣ 프로토타입(Prototype)이란?**

✔ **자바스크립트는 기존 객체를 직접 복사하는 것이 아니라, "참조(링크)"하는 방식**을 사용한다.  
✔ 이때, 기존 객체를 **"프로토타입(prototype)"**이라고 부른다.  
✔ **모든 객체는 프로토타입을 가지고 있으며**, 프로토타입을 통해 다른 객체의 속성(변수, 함수 등)을 사용할 수 있다.

```javascript
function User(name, age) {
  this.name = name;
  this.age = age;
}

// ✅ 프로토타입에 메서드 정의 (모든 인스턴스가 공유)
User.prototype.sayHello = function() {
  return `Hello, I'm ${this.name}`;
};

const user1 = new User("철수", 25);
const user2 = new User("영희", 30);

console.log(user1.sayHello()); // Hello, I'm 철수
console.log(user2.sayHello()); // Hello, I'm 영희
console.log(user1.sayHello === user2.sayHello); // true ✅ (같은 함수 참조)
```

✔ `sayHello()`는 프로토타입에 정의되어 **모든 인스턴스가 공유**한다.  
✔ 즉, **불필요한 메모리 사용을 줄일 수 있다**.

---

## **5️⃣ 프로토타입 체인(Prototype Chain)**

✔ **객체는 단순히** `__proto__`를 통해 프로토타입을 참조하는 것뿐만 아니라, 연속적인 프로토타입 체인을 갖는다.  
✔ **즉, 하나의 객체가 부모 객체의 프로토타입을 참조하고, 그 부모 객체가 다시 다른 객체의 프로토타입을 참조하는 구조**다.

![프로토타입 체인](https://cloud.githubusercontent.com/assets/2888775/15841811/f14b233e-2c8e-11e6-988d-6ea081b4c984.png align="left")

```javascript
const obj = {}; // 빈 객체 생성
console.log(obj.__proto__); // Object.prototype을 참조하고 있음
console.log(Object.prototype.__proto__); // null (최상위 객체)
```

✔ `obj` 객체는 `Object.prototype`을 프로토타입으로 참조한다.  
✔ `Object.prototype`에는 `toString`, `hasOwnProperty` 등의 공통 메서드가 정의되어 있고, 그로 인해 모든 객체에서 해당 속성들을 사용할 수 있다.

**🔗 프로토타입 체인 예제**

```javascript
// 생성자 함수 (이름을 받는 Parent 객체 생성)
function Parent(name) {
  this.name = name;
}

// Parent의 프로토타입에 메서드 추가
Parent.prototype.getName = function() {
  return this.name;
};

// Parent 생성자로 객체 생성
var p = new Parent("myName");

console.log(p.name);       // "myName"  (자신의 속성)
console.log(p.getName());  // "myName"  (프로토타입에서 가져옴)
console.log(p.__proto__ === Parent.prototype); // true ✅
```

✔ `p` 객체는 `getName()` 메서드를 직접 가지고 있지 않지만, 프로토타입 체인을 따라 `Parent.prototype.getName()`을 찾고 실행한다.

---

## 6️⃣ **프로토타입 체인을 활용한 상속 (버전별 발전 과정)**

자바스크립트에서 **프로토타입 체인을 활용한 상속 구현 방법은 시대에 따라 발전**했다.

| 버전 | 상속 구현 방법 | 설명 |
| --- | --- | --- |
| **ES5 이전** | `new` + `prototype` | 생성자 함수와 `new`를 사용해 프로토타입 체인을 직접 설정 |
| **ES5** | `Object.create()` | `Object.create(부모.prototype)`으로 간단하게 연결 가능 |
| **ES6 이후** | `class` + `extends` | `class` 문법을 사용해 `extends`로 쉽게 상속 가능 |

---

## **📌 1) ES5 이전 (생성자 함수 기반 상속)**

ES5 이전에는 `Object.create()` 없이 생성자 함수와 `prototype`을 직접 조작해서 상속을 구현해야 했다.

### **✅ 1. 값(속성) 상속:** `call()`을 이용한 부모 속성 복사

자식 객체가 부모 객체의 속성을 물려받을 수 있도록 `call()`을 사용해야 한다.

```jsx
function Parent(name) {
  this.name = name;
}

function Child(name, age) {
  Parent.call(this, name); // ✅ 부모 생성자의 속성을 개별 인스턴스로 복사
  this.age = age;
}

const c1 = new Child("John", 25);
console.log(c1.name); // "John" ✅ (부모의 속성을 상속받음)
console.log(c1.age);  // 25 ✅
```

✔ [`Parent.call`](http://Parent.call)`(this, name);`을 실행하면 `Parent` 생성자가 `Child`의 `this`에 적용됨.

✔ **각 인스턴스가** `name` 속성을 가지지만, `prototype`의 메서드는 상속받지 않음.

❌ 즉, **부모의 메서드(**`Parent.prototype.getName()`)는 상속되지 않음.

---

### **✅ 2. 메서드(객체) 상속: 프로토타입을 이용한 상속**

부모의 메서드를 상속받기 위해 `Child.prototype`을 `Parent`의 인스턴스로 설정해야 한다.

```jsx
function Parent(name) {
  this.name = name;
}

Parent.prototype.getName = function () {
  return this.name;
};

function Child(name, age) {
  Parent.call(this, name); // 📌 부모 생성자 실행하여 속성 상속 (값 상속)
  this.age = age;
}

Child.prototype = new Parent(); // ❌ 비효율적인 방식
Child.prototype.constructor = Child; // constructor 복구

const c1 = new Child("John", 25);
const c2 = new Child("Alice", 30);

console.log(c1.getName()); // "John" ✅
console.log(c2.getName()); // "Alice" ✅
```

> `new` 키워드가 하는 일 (엔진 내부 과정)
> 
> * ### **📌** `Child.prototype = new Parent();` 실행 과정
>     
>     ```jsx
>     var temp = {};                      // 1️⃣ 새로운 빈 객체 생성
>     temp.__proto__ = Parent.prototype;  // 2️⃣ temp의 프로토타입을 Parent.prototype으로 설정
>     Parent.call(temp);                  // 3️⃣ Parent 생성자 호출 (this = temp)
>                                         //⚠️ name 인자가 없어서 temp.name = undefined;
>     Child.prototype = temp;             // 4️⃣ 최종적으로 Child.prototype을 temp로 설정
>     ```
>     
>     ✔ **이 과정에서** `Child.prototype`이 `Parent.prototype`을 상속받도록 연결됨.
>     
>     ✔ 하지만 [`Parent.call`](http://Parent.call)`(temp);`이 실행될 때 인자가 전달되지 않으므로 [**temp.name**](http://temp.name)**은** `undefined`가 됨.
>     
>     ---
>     
>     ### **📌** `const c1 = new Child("John", 25);` 실행 과정
>     
>     ```jsx
>     var c1 = {};                      // 1️⃣ 새로운 빈 객체 생성
>     c1.__proto__ = Child.prototype;   // 2️⃣ c1의 [[Prototype]]을 Child.prototype으로 설정
>     Parent.call(c1, "John");          // 3️⃣ Parent 생성자 실행 (this = c1), c1.name = "John"
>     c1.age = 25;                      // 4️⃣ Child 생성자의 나머지 코드 실행
>     ```
>     
>     ✔ **이 과정에서** [`Parent.call`](http://Parent.call)`(this, name);`이 실행되어, 각 인스턴스(c1, c2)에 개별적인 속성이 추가됨.
>     
>     ✔ `c1.__proto__ = Child.prototype;`이므로, `c1.getName()`을 호출하면 **프로토타입 체인을 통해** `Parent.prototype.getName()`을 참조함.
>     

✔ **이제** `c1.getName()`을 실행하면 프로토타입 체인을 통해 `Parent.prototype.getName()`을 찾을 수 있음.

❌ **하지만** `Child.prototype = new Parent();` 방식에는 문제가 있음!

---

## **📌 2.** `Child.prototype = new Parent();` 방식의 문제점

### **❌ 불필요한 속성 생성**

```jsx
Child.prototype = new Parent();
console.log(Child.prototype.name); // undefined ❌ (원래 없어야 하는 속성)
```

✔ `Child.prototype`에는 **부모의 메서드(**`getName()`)만 있어야 하는데, `name` 속성이 포함됨.

✔ 즉, `Child.prototype`이 단순한 원형 객체가 아니라 **부모의 불필요한 속성을 가진 인스턴스가 되어버림.**

---

## **📌 3. 해결 방법 → 중간 객체(Temp) 사용**

ES5 이전에는 `Object.create()`를 사용할 수 없었기 때문에,

**부모의 생성자를 실행하지 않으면서** `prototype`을 상속하는 방법이 필요했다.

이를 위해 **중간 객체(Temp)를 사용해서** `prototype`을 올바르게 연결했다.

### **✅ ES5 이전의 올바른 방식**

```jsx
function Parent(name) {
  this.name = name;
}

Parent.prototype.getName = function () {
  return this.name;
};

function Child(name, age) {
  Parent.call(this, name); // ✅ 부모 생성자 실행하여 속성 상속
  this.age = age;
}

// ✅ ES5 이전의 올바른 프로토타입 상속 방식
function Temp() {} // 중간 객체 생성
Temp.prototype = Parent.prototype; // Parent의 프로토타입을 Temp에 연결
Child.prototype = new Temp(); // Child.prototype을 Temp의 인스턴스로 변경
Child.prototype.constructor = Child; // constructor 복구

const c1 = new Child("John", 25);
const c2 = new Child("Alice", 30);

console.log(c1.getName()); // "John" 
console.log(c2.getName()); // "Alice" 
console.log(c1.__proto__ === Child.prototype); // true 
console.log(Child.prototype.__proto__ === Parent.prototype); // true (프로토타입 체인 연결됨)
console.log(Child.prototype.name); // undefined (불필요한 속성이 없음!)
```

✔ **이제** `Child.prototype`이 `Parent.prototype`을 올바르게 상속받았으며, 불필요한 속성이 없음.

✔ **부모 생성자가 실행되지 않으면서, 메서드만 올바르게 상속됨!**

과거에는 Object.create() 가 없었기 때문에, "대리(임시) 생성자"를 사용해서 프로토타입 체인을 연결했다. 이 방식은 **"Ghost(유령) 생성자" 패턴** 이라고도 불렸다.

---

## **📌 2. ES5 (Object.create 함수)**

ES5부터는 `Object.create(프로토타입)`을 이용해서 **더 간단하게 프로토타입 체인을 만들 수 있다.**

```javascript
// 1️⃣ 부모 객체 생성
const parent = {
  sayHello: function() {
    return "Hello from Parent!";
  }
};

// 2️⃣ Object.create()로 parent를 원형으로 하는 객체 생성
const child = Object.create(parent);
child.name = "John";

console.log(child.sayHello()); // "Hello from Parent!" (parent에서 상속됨)
console.log(child.__proto__ === parent); // true
console.log(parent.__proto__ === Object.prototype); // true (최종 원형)
```

✔ `Temp()` 없이도 **한 줄 코드로 부모의 메서드를 상속받을 수 있다.**  
✔ **더 직관적이고 가독성이 뛰어남!**

---

## **📌 3. ES6 이후 (클래스** `class` 사용)

ES6부터는 `class` 문법이 추가되면서 더 직관적으로 상속을 구현할 수 있다.

```javascript
// 1️⃣ 부모 클래스 정의
class Parent {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    return `Hello, I am ${this.name}`;
  }
}

// 2️⃣ 자식 클래스 정의 (extends 키워드 사용)
class Child extends Parent {
  constructor(name, age) {
    super(name); // 부모 생성자 호출
    this.age = age;
  }

  sayAge() {
    return `I am ${this.age} years old.`;
  }
}

// 3️⃣ 객체 생성
const child = new Child("John", 25);

console.log(child.sayHello()); // "Hello, I am John" (부모 클래스에서 상속)
console.log(child.sayAge());   // "I am 25 years old." (자식 클래스에 있는 메서드)
console.log(child.__proto__ === Child.prototype); // true
console.log(Child.prototype.__proto__ === Parent.prototype); // true (프로토타입 체인)
console.log(Parent.prototype.__proto__ === Object.prototype); // true (최종 원형)
```

✔ `extends`를 사용하면 `Parent`의 기능을 `Child`가 자동으로 상속받는다.

✔ `super(name)`을 호출해서 부모 클래스의 생성자를 실행(ES5의 [`Parent.call`](http://Parent.call)`(this, name);`와 동일한 역할). 즉, **부모 클래스의 생성자를 호출하여 부모의 속성을 상속**하는 역할을 한다.

✔ 프로토타입 체인은 `Child.prototype → Parent.prototype → Object.prototype` 순서로 이어진다.

✔ `class`는 문법적으로 더 직관적으로 보이지만, 내부적으로는 여전히 프로토타입을 기반으로 동작한다.

---

## **✅ 결론: 프로토타입 상속 방식 비교**

| 방법 | 사용 문법 | 특징 |
| --- | --- | --- |
| **ES5 이전** | `function` + `new` | 생성자 함수를 사용해 직접 프로토타입을 설정해야 함 |
| **ES5** | `Object.create()` | 더 간결하고, `new` 없이도 원형 객체를 쉽게 설정 가능 |
| **ES6 이후** | `class` + `extends` | 클래스 문법을 통해 직관적인 상속 구현 가능 |

🚀 **즉, 자바스크립트의 프로토타입 상속 방식은 발전하면서 점점 더 쉽고 직관적으로 변해왔다!** 🎯