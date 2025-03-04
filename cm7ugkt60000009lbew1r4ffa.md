---
title: "[js] 프로토타입과 상속 정리"
seoTitle: "JavaScript 프로토타입과 상속 요약"
seoDescription: "자바스크립트의 프로토타입과 상속 기초: 생성자 함수, 인스턴스, 프로토타입 체인을 쉽게 이해하는 가이드"
datePublished: Tue Mar 04 2025 12:21:56 GMT+0000 (Coordinated Universal Time)
cuid: cm7ugkt60000009lbew1r4ffa
slug: js-1-1
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1741090852253/f32e11e8-6d93-4ec3-8087-de1a771ab68c.png

---

자바스크립트에서 객체 지향 프로그래밍(OOP)을 이해하려면 **생성자 함수, 인스턴스, 프로토타입, 상속**에 대한 이해가 필요하다  
이번 포스팅에서는 **프로토타입과 상속이 어떻게 동작하는지** 정리하였다.

### **1\. 생성자 함수란?**

생성자 함수는 new 키워드와 함께 사용하여 새로운 객체(인스턴스)를 만든다.

✅ **생성자 함수 예제**

```javascript
function User(name, age) {
  this.name = name;
  this.age = age;
}

const user1 = new User("철수", 25);
console.log(user1); // User { name: '철수', age: 25 }
```

✔️ `User` 함수는 새로운 객체를 만들기 위한 **생성자 역할**을 함.  
✔️ `user1`은 `User` 생성자 함수에서 만들어진 **인스턴스**임.

### **2\. 인스턴스란?**

인스턴스는 **생성자 함수 또는 클래스로부터 만들어진 실제 데이터가 있는 객체**를 의미한다.

| 구분 | 설명 | 예제 |
| --- | --- | --- |
| **생성자 함수** | 객체를 만들기 위한 템플릿(설계도) | `function User(name, age) { ... }` |
| **인스턴스** | 생성자 함수로부터 만들어진 실제 객체 | `const user1 = new User("철수", 25);` |

✔️ 생성자 함수나 클래스로 만든 **인스턴스는 자동으로 프로토타입을 상속받는다.**  
✔️ 즉, 모든 인스턴스는 `[[Prototype]]`(또는 `__proto__`) 속성을 가진다.

### **3\. 프로토타입(Prototype)이란?**

객체가 상속받는 속성과 메서드를 정의하는 객체이다.  
모든 객체는 자신의 프로토타입을 가지고 있으며, 이를 통해 다른 객체의 속성과 메서드를 상속받아 사용할 수 있습니다. 이를 통해 코드의 재사용성과 유지보수성을 높일 수 있다  
즉, 자바스크립트에서 **모든 객체가 공통으로 속성과 메서드를 공유할 수 있는 구조**이다.

📌 **프로토타입의 핵심 개념**

* **모든 생성자 함수**는 `prototype` 속성을 가진다.
    
* **모든 인스턴스 객체**는 `__proto__`를 가지고 있으며, 이는 해당 생성자의 `prototype`을 가리킨다.
    
* 속성이나 메서드를 찾을 때, **자기 자신 → 프로토타입 체인**을 따라 상위 객체에서 찾는다.
    

✔️ **즉, 프로토타입은 자바스크립트에서 객체 간 상속을 담당하는 핵심 메커니즘이다.** 🚀

### 4\. 프로토타입과 상속

클래스 기반 언어에서는 "클래스를 기반으로 인스턴스를 생성"하지만, 자바스크립트는 "객체가 직접 다른 객체를 상속"하는 방식(프로토타입 상속)을 사용한다!  
**즉, 자바스크립트에서 "상속"은 "프로토타입"을 통해 이루어진다.**

✅ **클래스 기반 언어(Java, C++, Python)**

* 객체를 만들려면 먼저 **"클래스"**를 정의해야 한다.
    
* **클래스는 설계도(템플릿) 역할**을 하며, 이를 기반으로 객체(인스턴스)를 생성한다.
    
* **상속은 "클래스 간"에서 이루어지며,** `extends` 같은 키워드를 사용한다.
    

📌 **예제 (Java)**

```java
class Animal {
    void speak() {
        System.out.println("동물이 소리를 냅니다.");
    }
}

class Dog extends Animal { // Animal 클래스를 상속
    void bark() {
        System.out.println("멍멍!");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog();
        dog.speak(); // 부모 클래스의 메서드 사용 가능
        dog.bark();  // 자식 클래스의 메서드
    }
}
```

✔️ 클래스를 정의하고(`class`), 이를 바탕으로 객체를 만든다.  
✔️ 상속도 클래스 간에서 이루어지며 (`extends` 사용), **부모 클래스의 기능을 자식 클래스가 물려받는다.**

---

✅ **프로토타입 기반 언어 (JavaScript)**

* 자바스크립트에서는 **"클래스 없이도" 객체를 만들 수 있다.**
    
* 객체가 **직접** 다른 객체를 상속할 수 있다.
    
* **새로운 객체는 기존 객체(프로토타입)의 속성과 메서드를 "상속"받는다.**
    

1️⃣ `Object.create()`를 사용한 상속

📌 **기존 객체를 직접 프로토타입으로 설정하는 가장 단순한 방법**

```javascript
const animal = {
  speak() {
    console.log("동물이 소리를 냅니다.");
  }
};

// animal을 프로토타입으로 하는 새로운 객체 생성
const dog = Object.create(animal);
dog.bark = function() {
  console.log("멍멍!");
};

dog.speak(); // "동물이 소리를 냅니다." (animal에서 상속)
dog.bark();  // "멍멍!" (dog에서 정의)

console.log(dog.__proto__ === animal); // true (dog가 animal을 상속)
```

✔️ **가장 간단한 방식으로 상속을 구현할 수 있다.**  
✔️ **객체를 직접 상속받아 사용할 수 있으며, 생성자 함수나 클래스가 필요 없다.**

❌ **하지만 객체를 초기화하는 기능이 없어 속성을 동적으로 추가해야 한다.**  
❌ **메서드를 추가할 때 프로토타입을 직접 수정해야 하므로 불편하다.**

📌 **결론:** `Object.create()`는 **단순한 객체 상속을 구현할 때 유용하다.** 🚀

---

2️⃣ 생성자 함수 + prototype을 사용한 상속 (ES5 방식)

📌 **생성자 함수를 사용하여 객체를 생성하고, 프로토타입을 직접 조작하는 방식**

```javascript
js복사편집function Animal() {}

Animal.prototype.speak = function() {
  console.log("동물이 소리를 냅니다.");
};

function Dog() {}

// Animal의 프로토타입을 Dog의 프로토타입으로 상속
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog; // constructor 복구

Dog.prototype.bark = function() {
  console.log("멍멍!");
};

const dog = new Dog();

dog.speak(); // "동물이 소리를 냅니다." (Animal에서 상속)
dog.bark();  // "멍멍!" (Dog에서 추가)
console.log(dog instanceof Animal); // true
console.log(dog instanceof Dog);    // true
```

✔️ **생성자를 사용하여 여러 개의 인스턴스를 쉽게 생성할 수 있다.**  
✔️ **객체 생성 시 초기화가 가능하며(**`new Dog()`), `prototype`을 활용하여 메서드를 공유할 수 있다.

❌ **하지만 코드가** `Object.create()` 방식보다 길고 복잡하다.  
❌ `prototype`을 직접 조작해야 하므로 가독성이 떨어질 수 있다.

📌 **결론:** 생성자 함수 방식은 **ES5 환경에서 클래스를 사용할 수 없을 때 유용하다.**

---

3️⃣ `class extends`를 사용한 상속 (ES6 방식)

📌 **ES6 이후** `class` 문법을 사용하여 직관적으로 상속을 구현하는 방식

```javascript
class Animal {
  speak() {
    console.log("동물이 소리를 냅니다.");
  }
}

class Dog extends Animal {
  bark() {
    console.log("멍멍!");
  }
}

const dog = new Dog();

dog.speak(); // "동물이 소리를 냅니다." (Animal에서 상속)
dog.bark();  // "멍멍!" (Dog에서 추가)
console.log(dog instanceof Animal); // true
console.log(dog instanceof Dog);    // true
```

✔️ **가독성이 좋고 직관적인 코드(**`class` 문법 사용)  
✔️ `extends` 키워드를 사용하여 상속을 쉽게 구현 가능  
✔️ **객체 생성 시 속성을 초기화할 수 있음 (**`constructor` 활용 가능)

❌ **ES6(2015년) 이후 환경에서만 사용할 수 있다.**  
❌ **내부적으로는 여전히** `prototype`을 사용하지만, 초보자가 이해하기 어려울 수 있다.

📌 **결론:** `class extends`는 **최신 자바스크립트 환경에서 가장 추천되는 방법!** 🚀

---

### 5\. 프로토타입 체인(Prototype Chain)이란?

자바스크립트에서 객체는 **자신에게 없는 속성이나 메서드를 프로토타입에서 찾습니다.**

📌 **예제**

```javascript
function Animal() {}
Animal.prototype.speak = function() { console.log("동물이 소리를 냅니다."); };

function Dog() {}
Dog.prototype = Object.create(Animal.prototype); // Animal을 상속

const dog = new Dog();
dog.speak(); // "동물이 소리를 냅니다." (Animal의 메서드를 상속)
```

📌 **이 과정이 일어나는 순서** 1️⃣ `dog` 객체에서 `speak()` 메서드를 찾음 → 없음 ❌  
2️⃣ `dog.__proto__`(즉, `Dog.prototype`)에서 찾음 → 없음 ❌  
3️⃣ `Dog.prototype.__proto__`(즉, `Animal.prototype`)에서 찾음 → ✅ 발견! 실행 🎉

✔️ **이렇게 객체가 상위 객체를 따라가며 속성을 찾는 과정을 "프로토타입 체인"이라고 합니다!** 🚀