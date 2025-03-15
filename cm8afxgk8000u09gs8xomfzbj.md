---
title: "[js] 이벤트 루프와 비동기 처리"
datePublished: Sat Mar 15 2025 16:48:05 GMT+0000 (Coordinated Universal Time)
cuid: cm8afxgk8000u09gs8xomfzbj
slug: js-1-1-1
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1742056868006/458b9d05-f04e-46e1-b720-ef1920aa1fab.png

---

JavaScript는 **싱글 스레드** 기반의 언어로, 한 번에 하나의 작업만 실행할 수 있다. 하지만 브라우저 환경에서는 여러 작업이 동시에 이루어지는 것처럼 보이는데, 어떻게 가능할까? 이는 **이벤트 루프**와 **비동기 처리** 덕분이다.

## 1\. JavaScript 실행 방식 (콜 스택)

JavaScript 코드는 **콜 스택**이라는 곳에서 실행된다. 콜 스택은 **LIFO (Last In, First Out) 구조**로, 가장 나중에 들어온 작업이 먼저 처리된다.

### 예제 1: 동기 코드 실행

```js
console.log("A");
console.log("B");
console.log("C");
```

출력 결과:

```javascript
A
B
C
```

이처럼 코드가 순차적으로 실행된다.

## 2\. 콜 스택이 블로킹되는 문제

만약 오래 걸리는 작업이 있다면, 콜 스택이 이 작업을 실행하느라 다른 작업을 할 수 없게 된다.

```js
console.log("A");

for (let i = 0; i < 10000000000; i++) {}  // 무거운 연산

console.log("B");
```

이 경우 브라우저가 멈춘 것처럼 보이는데, 이는 **콜 스택이 연산을 수행하느라 다른 작업을 할 수 없기 때문**이다.

## 3\. Web API와 비동기 처리

### Web API란?

Web API는 **브라우저가 제공하는 API** 로, JavaScript가 단독으로 처리할 수 없는 기능들을 수행할 수 있도록 도와준다. 즉, 브라우저가 제공하는 기능을 활용해 JavaScript가 네트워크 요청, 타이머 설정, DOM 조작, 이벤트 리스너 등 다양한 작업을 할 수 있게 된다.

Web API의 대표적인 예는 다음과 같다:

* **DOM**: HTML 요소를 조작하는 API
    
* **Fetch API / XMLHttpRequest**: 네트워크 요청을 처리하는 API
    
* **setTimeout / setInterval**: 일정 시간이 지난 후 실행되는 타이머 API
    
* **Geolocation API**: 사용자의 위치 정보를 가져오는 API
    
* **Web Storage**: 브라우저에 데이터를 저장하는 API
    

### Web API와 이벤트 루프의 관계

JavaScript는 비동기 함수를 실행할 때 Web API를 활용한다.

### 예제 2: 비동기 코드 (setTimeout)

```js
console.log("hi");

setTimeout(() => {
    console.log("there");
}, 5000);

console.log("bye");
```

출력 결과:

```javascript
hi
bye
there (5초 후 출력)
```

**실행 과정:**

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1742057140717/1f0d0e53-c9a6-4ffa-8a8c-ac92f70c5bbf.gif align="center")

1. `console.log("hi")` → 콜 스택에서 실행 후 제거
    
2. `setTimeout()` → **Web API로 넘겨 처리 (5초 대기 후 실행 예정)**
    
3. `console.log("bye")` → 콜 스택에서 실행 후 제거
    
4. 5초 후, `setTimeout`의 콜백이 **콜백 큐에 저장**됨
    
5. 이벤트 루프가 **콜 스택이 비었는지 확인** 후, 콜백을 가져와 실행
    
6. `console.log("B")` 실행
    

## 4\. 이벤트 루프(Event Loop)

이벤트 루프는 **콜 스택과 콜백 큐를 감시하면서 작업을 관리하는 역할**을 한다.

* 콜 스택이 **비어 있을 때**만 콜백 큐에서 작업을 가져와 실행한다.
    
* 이 덕분에 **비동기 작업이 완료된 후에도 프로그램이 멈추지 않고 계속 실행**될 수 있다.
    

## 5\. 마이크로태스크 큐 (Microtask Queue)

비동기 작업에는 **콜백 큐** 외에도 **마이크로태스크 큐**가 있다.

```js
console.log("A");

setTimeout(() => {
    console.log("B");
}, 0);

Promise.resolve().then(() => {
    console.log("C");
});

console.log("D");
```

출력 결과:

```javascript
A
D
C
B
```

### 실행 과정:

1. `console.log("A")` 실행
    
2. `setTimeout()` 실행 → **Web API로 넘겨 타이머 시작 (콜백 큐 대기)**
    
3. `Promise.resolve().then()` 실행 → **마이크로태스크 큐로 이동**
    
4. `console.log("D")` 실행 (동기 코드 실행)
    
5. **마이크로태스크 실행 →** `console.log("C")`
    
6. **콜백 큐 실행 →** `console.log("B")`
    

✅ **마이크로태스크(Promise, async/await)가 콜백 큐(setTimeout, setInterval)보다 먼저 실행된다!**

## 6\. async/await과 이벤트 루프

`async/await` 도 결국 **Promise 기반의 비동기 코드**이다.  
`await` 키워드는 **비동기 작업이 끝날 때까지 기다렸다가 실행을 계속**하는 역할을 한다.

### 예제 3: async/await의 실행 순서

```js
console.log("A");

async function fetchData() {
    console.log("B");
    await Promise.resolve();  
    console.log("C");
}

fetchData();

console.log("D");
```

출력 결과:

```javascript
A
B
D
C
```

### 실행 과정:

1. `console.log("A")` 실행
    
2. `fetchData()` 실행 → `console.log("B")`
    
3. `await Promise.resolve();` → 마이크로태스크 큐로 이동
    
4. `console.log("D")` 실행 (동기 코드 먼저 실행)
    
5. **마이크로태스크 실행 →** `console.log("C")`
    

## 7\. 정리

✅ JavaScript는 **싱글 스레드**이지만, **Web API와 이벤트 루프**를 활용해 비동기 작업을 처리할 수 있다. ✅ 비동기 작업이 완료되면 **콜백 큐나 마이크로태스크 큐에 등록**되고, 이벤트 루프가 이를 실행한다. ✅ **마이크로태스크(Promise, async/await)가 콜백 큐(setTimeout, setInterval)보다 먼저 실행된다.**

### 💡 결론:

**JavaScript는 싱글 스레드이지만 이벤트 루프 덕분에 마치 멀티태스킹처럼 동작한다!** 🚀