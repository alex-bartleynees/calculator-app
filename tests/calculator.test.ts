// 1 + 2
// 2 - 1
// 2 * 3
// 3 / 2

import { Calculator } from "../src/components/calculator"
import { RenderInput } from "../src/components/render-input";
import { UserInput } from "../src/components/user-input";
import { state } from "../src/state/calculator-state";

test("1 + 2", () => {
    // Arrange
    const calculator = new Calculator();

    // Act
    const result = calculator.add(1, 2);

    expect(result).toBe(3);
})

test("2 - 1", () => {
    // Arrange
    const calculator = new Calculator();

    // Act
    const result = calculator.subtract(2, 1);

    expect(result).toBe(1);
})

test("2 * 3", () => {
    // Arrange
    const calculator = new Calculator();

    // Act
    const result = calculator.multiply(2, 3);

    expect(result).toBe(6);
})

test("3 / 2", () => {
    // Arrange
    const calculator = new Calculator();

    // Act
    const result = calculator.divide(3, 2);

    expect(result).toBe(1.5);
})

test("it should not divide by zero", () => {
    // Arrange
    const calculator = new Calculator();

    // Act
    const result = calculator.divide(3, 0);

    expect(result).toBe('Error');
})

it("should calculate 16 * 2 * 2 ", () => {
    // Arrange
    document.body.innerHTML = '<div class="calculator__keys">test</div> <input type="text" value="0"  />';
    jest.spyOn(RenderInput.prototype, 'setInput').mock;
    const input = new UserInput();
    const event1 = {
        target: {
            dataset: {
                value: "1"
            }
        }
    } as any;
    const event2 = {
        target: {
            dataset: {
                value: "6"
            }
        }
    } as any;
    const event3 = {
        target: {
            dataset: {
                value: "*"
            }
        }
    } as any;
    const event4 = {
        target: {
            dataset: {
                value: "2"
            }
        }
    } as any;
    const event5 = {
        target: {
            dataset: {
                value: "="
            }
        }
    } as any;
    const event6= {
        target: {
            dataset: {
                value: "*"
            }
        }
    } as any;
    const event7= {
        target: {
            dataset: {
                value: "2"
            }
        }
    } as any;
    const event8 = {
        target: {
            dataset: {
                value: "="
            }
        }
    } as any;
    
    // Act
    input.parseInput(event1)
    input.parseInput(event2)
    input.parseInput(event3)
    input.parseInput(event4)
    input.parseInput(event5)
    input.parseInput(event6)
    input.parseInput(event7)
    input.parseInput(event8)

    // Assert
    expect(state.result).toBe(64)
})

it("should calculate 1 + 1 * 5 ", () => {
    // Arrange
    document.body.innerHTML = '<div class="calculator__keys">test</div> <input type="text" value="0"  />';
    jest.spyOn(RenderInput.prototype, 'setInput').mock;
    const input = new UserInput();
    const event1 = {
        target: {
            dataset: {
                value: "1"
            }
        }
    } as any;
    const event2 = {
        target: {
            dataset: {
                value: "+"
            }
        }
    } as any;
    const event3 = {
        target: {
            dataset: {
                value: "1"
            }
        }
    } as any;
    const event4 = {
        target: {
            dataset: {
                value: "*"
            }
        }
    } as any;
    const event5 = {
        target: {
            dataset: {
                value: "5"
            }
        }
    } as any;
    const event6 = {
        target: {
            dataset: {
                value: "="
            }
        }
    } as any;
    
    // Act
    input.parseInput(event1)
    input.parseInput(event2)
    input.parseInput(event3)
    input.parseInput(event4)
    input.parseInput(event5)
    input.parseInput(event6)

    // Assert
    expect(state.result).toBe(6)
})

it("should calculate (1 + 1) * 5 ", () => {
    // Arrange
    document.body.innerHTML = '<div class="calculator__keys">test</div> <input type="text" value="0"  />';
    jest.spyOn(RenderInput.prototype, 'setInput').mock;
    const input = new UserInput();
    const event1 = {
        target: {
            dataset: {
                value: "1"
            }
        }
    } as any;
    const event2 = {
        target: {
            dataset: {
                value: "+"
            }
        }
    } as any;
    const event3 = {
        target: {
            dataset: {
                value: "1"
            }
        }
    } as any;
    const event4 = {
        target: {
            dataset: {
                value: "="
            }
        }
    } as any;
    const event5 = {
        target: {
            dataset: {
                value: "*"
            }
        }
    } as any;
    const event6 = {
        target: {
            dataset: {
                value: "5"
            }
        }
    } as any;
    const event7 = {
        target: {
            dataset: {
                value: "="
            }
        }
    } as any;
    
    // Act
    input.parseInput(event1)
    input.parseInput(event2)
    input.parseInput(event3)
    input.parseInput(event4)
    input.parseInput(event5)
    input.parseInput(event6)

    // Assert
    expect(state.result).toBe(10)
})