const { screen } = require("@testing-library/dom");

describe("go-to-diff", () => {
  const getURL = (id) => `/gabsprates/go-to-diff/pull/${id}`;
  const getArrayOf = (size) => Array(size).fill(null);

  const render = ({ numberOfItems }) => {
    document.body.innerHTML = `
        <ul>
            ${getArrayOf(numberOfItems).map((_, index) => {
              const id = index + 1;

              return `
                    <li class='js-issue-row'>
                        <a href="${getURL(id)}">
                            link to PR ${id}
                        </a>
                    </li>
                `;
            })}
        </ul>
    `;

    jest.isolateModules(() => require("./index"));
  };

  describe("rendering", () => {
    it("should create 1 wrapper per item", () => {
      render({ numberOfItems: 3 });

      expect(screen.getAllByText(/^go to/)).toHaveLength(3);
    });

    it("should put links into wrapper", () => {
      render({ numberOfItems: 1 });

      expect(screen.getByText("split diff")).toBeInTheDocument();
      expect(screen.getByText("unified diff")).toBeInTheDocument();
    });
  });

  describe("links", () => {
    it("should have right split link", () => {
      render({ numberOfItems: 1 });

      const splitLink = screen.getByText("split diff");
      expect(splitLink).toBeInTheDocument();
      expect(splitLink.getAttribute("href")).toEqual(
        `${getURL(1)}/files?diff=split`
      );
    });

    it("should have right unified link", () => {
      render({ numberOfItems: 1 });

      const splitLink = screen.getByText("unified diff");
      expect(splitLink).toBeInTheDocument();
      expect(splitLink.getAttribute("href")).toEqual(
        `${getURL(1)}/files?diff=unified`
      );
    });
  });
});
