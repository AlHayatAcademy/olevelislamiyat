import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// @testing-library/react's auto-cleanup only self-registers when `test.globals: true` is set;
// this project keeps globals off (explicit imports everywhere else), so register it manually.
afterEach(cleanup);
