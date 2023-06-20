export const disableBodyScroll = () => {
  document.body.classList.add("disable-scroll");
};

export const enableBodyScroll = () => {
    document.body.classList.remove("disable-scroll");
  };