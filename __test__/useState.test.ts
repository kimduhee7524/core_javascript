import { useState } from "../useState";

describe("useState Hook", () => {
  test("초기 상태 값이 올바르게 설정되어야 한다", () => {
    const [count] = useState<number>(10);
    expect(count()).toBe(10);
  });

  test("setState가 상태를 변경해야 한다", () => {
    const [count, setCount] = useState<number>(0);
    setCount(5);
    expect(count()).toBe(5);
  });

  test("문자열 상태를 관리할 수 있어야 한다", () => {
    const [text, setText] = useState<string>("Hello");
    setText("World");
    expect(text()).toBe("World");
  });

  test("불리언 상태를 변경할 수 있어야 한다", () => {
    const [isActive, setIsActive] = useState<boolean>(false);
    setIsActive(true);
    expect(isActive()).toBe(true);
  });

  test("객체 상태를 변경할 수 있어야 한다", () => {
    type User = { name: string; age: number };
    const [user, setUser] = useState<User>({ name: "Alice", age: 25 });

    setUser({ name: "Bob", age: 30 });

    expect(user()).toEqual({ name: "Bob", age: 30 });
  });

  test("배열 상태를 변경할 수 있어야 한다", () => {
    const [items, setItems] = useState<number[]>([1, 2, 3]);

    setItems([4, 5, 6]);

    expect(items()).toEqual([4, 5, 6]);
  });
});
