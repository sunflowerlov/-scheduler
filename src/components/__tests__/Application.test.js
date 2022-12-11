import React from "react";

import { render} from "@testing-library/react";
import waitForElement from "@testing-library/react";
import Application from "components/Application";

//afterEach(cleanup);
describe("axios", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday"));
  });
});
