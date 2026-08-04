// import { act, fireEvent, render, screen } from "@testing-library/react";
// import Timer from "../page/Timer";
// import { describe, expect, it, vi } from "vitest";

// describe(Timer, () => {
//     it("Page should have the heading as Counter", () => {
//         render(<Timer />);
//         const heading = screen.getByRole("heading", {
//             name: /counter/i,
//         });

//         expect(heading).toBeInTheDocument();
//     });

//     it("Initially time should be zero", () => {
//         render(<Timer />);
//         expect(screen.getByText("0")).toBeInTheDocument();
//     });

//     it("increments timer when start button is clicked",()=>{
//         vi.useFakeTimers();

//         render(<Timer />);
//         fireEvent.click(
//             screen.getByRole("button", {name: /start/i})
//         );

//         act(()=>{
//             vi.advanceTimersByTime(1000);
//         })

//         expect(screen.getByText("1")).toBeInTheDocument();

//         vi.useRealTimers();
//     });
// })

import { render, screen, act, fireEvent, getByText } from "@testing-library/react";
import Timer from "../page/Timer";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("Timer", () => {
    test("render timers", () => {
        render(<Timer />)
        expect(screen.getByText("Counter")).toBeInTheDocument()
    });

    test("Start with 0", () => {
        render(<Timer />)
        expect(screen.getByText("0")).toBeInTheDocument()
    });

    test("render all buttons", () => {
        render(<Timer />)
        expect(screen.getByRole("button", { name: /start/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /pause/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
    });

    test("increment testing", () => {
        vi.useFakeTimers();
        render(<Timer />);
        fireEvent.click(screen.getByRole("button", { name: /start/i }))
        act(() => {
            vi.advanceTimersByTime(1000)
        })
        expect(screen.getByText("1")).toBeInTheDocument()
        vi.useRealTimers()
    });

    test("pause testing", () => {
        vi.useFakeTimers();
        render(<Timer />);
        fireEvent.click(screen.getByRole("button", { name: /start/i }))
        act(() => {
            vi.advanceTimersByTime(1000)
        })
        expect(screen.getByText("1")).toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", { name: /pause/i }));

        act(() => {
            vi.advanceTimersByTime(3000)
        })
        expect(screen.getByText("1")).toBeInTheDocument()
        vi.useRealTimers()
    });

    test("reset testing", () => {
        vi.useFakeTimers();
        render(<Timer />);
        fireEvent.click(screen.getByRole("button", { name: /start/i }));
        act(() => {
            vi.advanceTimersByTime(3000)
        })
        expect(screen.getByText("3")).toBeInTheDocument()

        fireEvent.click(screen.getByRole("button", { name: /reset/i }))

        act(() => {
            vi.advanceTimersByTime(5000)
        });
        expect(screen.getByText("0")).toBeInTheDocument();
        vi.useRealTimers()
    });

    test("clicking start twice should not create multiple intervals", async () => {

        vi.useFakeTimers();
        render(<Timer />);
        fireEvent.click(screen.getByRole("button", { name: /start/i }));
    fireEvent.click(screen.getByRole("button", { name: /start/i }));

        act(() => {
            vi.advanceTimersByTime(3000);
        });
        expect(screen.getByText("3")).toBeInTheDocument();
        vi.useRealTimers();

    });

})