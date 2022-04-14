import {div, mult, sub, sum} from "./tasks";

test("sum", ()=> {
    // тестовые данные
    const salery: number = 800
    const n: number = 200
    //выполнить тестируемый код
    const result = sum(salery, n)
    //3. проверка результата
    expect(result).toBe(1000)
})

test("sub", ()=> {
    expect(sub(1200, 200)).toBe(1000)
})

test( 'div', ()=> {
    expect(div(1000, 2)).toBe(500)
})

test('mult', ()=> {
    expect(mult(1000, 1.5)).toBe(1500)
})