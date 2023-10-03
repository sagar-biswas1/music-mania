const Song = require("../../models/Song");
const parameterValidators = require("../../utils/songDataValidator");

const upload = async (parameters) => {
  for (const parameterName in parameterValidators) {
    const parameterValidator = parameterValidators[parameterName];
    const parameterValue = parameters[parameterName];

    const isValid = parameterValidator(parameterValue);
    if (!isValid) {
      const error = new Error(`Parameter "${parameterName}" is invalid.`);
      error.status = 400;
      throw error;
    }
  }
  const song = new Song({
    ...parameters,
  });

  await song.save();

  return song._doc;
};

module.exports = upload;
