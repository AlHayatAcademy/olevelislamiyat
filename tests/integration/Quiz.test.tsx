import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Quiz } from "@/components/Quiz";
import type { Quiz as QuizData } from "@/data/quizzes";

const testQuiz: QuizData = {
  id: "test-quiz-for-vitest",
  title: "Test Quiz",
  paper: 1,
  section: "major-themes-of-the-quran",
  topicSlug: "some-topic",
  topicTitle: "Some Topic",
  description: "A small fixture quiz for component tests.",
  questions: [
    {
      id: "q1",
      type: "multiple-choice",
      question: "What is 2 + 2?",
      options: ["3", "4", "5"],
      correctIndex: 1,
      explanation: "2 + 2 = 4.",
    },
    {
      id: "q2",
      type: "true-false",
      question: "The sky is blue.",
      correctAnswer: true,
      explanation: "Under normal daytime conditions, yes.",
    },
  ],
};

beforeEach(() => {
  window.localStorage.clear();
});

describe("Quiz", () => {
  it("renders every question and disables submit until all are answered", async () => {
    render(<Quiz quiz={testQuiz} />);

    expect(screen.getByText(/What is 2 \+ 2\?/)).toBeInTheDocument();
    expect(screen.getByText(/The sky is blue\./)).toBeInTheDocument();

    const submitButton = screen.getByRole("button", { name: /submit answers/i });
    expect(submitButton).toBeDisabled();
  });

  it("enables submit once every question is answered, and shows the score after submitting", async () => {
    const user = userEvent.setup();
    render(<Quiz quiz={testQuiz} />);

    await user.click(screen.getByRole("radio", { name: "4" }));
    await user.click(screen.getByRole("radio", { name: "True" }));

    const submitButton = screen.getByRole("button", { name: /submit answers/i });
    expect(submitButton).toBeEnabled();

    await user.click(submitButton);

    expect(screen.getByText("Quiz complete")).toBeInTheDocument();
    expect(screen.getByText("2 / 2")).toBeInTheDocument();
    expect(screen.getByText(/scored 100%/)).toBeInTheDocument();
  });

  it("scores a partially-correct attempt correctly", async () => {
    const user = userEvent.setup();
    render(<Quiz quiz={testQuiz} />);

    await user.click(screen.getByRole("radio", { name: "3" })); // wrong
    await user.click(screen.getByRole("radio", { name: "True" })); // correct

    await user.click(screen.getByRole("button", { name: /submit answers/i }));

    expect(screen.getByText("1 / 2")).toBeInTheDocument();
    expect(screen.getByText(/scored 50%/)).toBeInTheDocument();
  });

  it("retry resets answers and returns to the question view", async () => {
    const user = userEvent.setup();
    render(<Quiz quiz={testQuiz} />);

    await user.click(screen.getByRole("radio", { name: "4" }));
    await user.click(screen.getByRole("radio", { name: "True" }));
    await user.click(screen.getByRole("button", { name: /submit answers/i }));

    expect(screen.getByText("Quiz complete")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /retry quiz/i }));

    expect(screen.queryByText("Quiz complete")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit answers/i })).toBeDisabled();
  });

  it("persists best score across a second render (localStorage)", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<Quiz quiz={testQuiz} />);

    await user.click(screen.getByRole("radio", { name: "4" }));
    await user.click(screen.getByRole("radio", { name: "True" }));
    await user.click(screen.getByRole("button", { name: /submit answers/i }));
    unmount();

    render(<Quiz quiz={testQuiz} />);
    await user.click(screen.getByRole("radio", { name: "3" })); // wrong this time
    await user.click(screen.getByRole("radio", { name: "False" })); // wrong this time
    await user.click(screen.getByRole("button", { name: /submit answers/i }));

    expect(screen.getByText(/Best score so far: 100%/)).toBeInTheDocument();
  });
});
