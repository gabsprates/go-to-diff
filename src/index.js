((d) => {
  const diffs = {
    split: "/files?diff=split",
    unified: "/files?diff=unified",
  };

  const getPulls = () => d.querySelectorAll(".js-issue-row");
  const getPullLink = (element) => element.querySelector("a");
  const createWrapper = () => d.createElement("div");
  const getWrapperContent = (url) => `
    go to
    <a href="${url}${diffs.split}">split diff</a>
    &nbsp;|&nbsp;
    <a href="${url}${diffs.unified}">unified diff</a>
  `;

  const setStyles = (pull, wrapper) => {
    pull.style.position = "relative";
    wrapper.style.right = "5px";
    wrapper.style.bottom = "5px";
    wrapper.style.position = "absolute";
  };

  getPulls().forEach((pull) => {
    const pullLink = getPullLink(pull);
    if (!pullLink) return;

    const pullURL = pullLink.getAttribute("href");

    const wrapper = createWrapper();
    wrapper.innerHTML = getWrapperContent(pullURL);

    setStyles(pull, wrapper);
    pull.appendChild(wrapper);
  });
})(document);
