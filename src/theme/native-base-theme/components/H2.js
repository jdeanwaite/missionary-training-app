import variable from "./../variables/platform";

export default (variables = variable) => {
  const h2Theme = {
    color: variables.textColor,
    fontSize: variables.fontSizeH2,
    lineHeight: variables.lineHeightH2,
    fontWeight: '500',
  };

  return h2Theme;
};
