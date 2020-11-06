import Validator from './validator';

/**
 * Runs the validation for all given inputs
 * @param {object} inputs
 */
export const validateAll = (inputs) => {
  let resultInputs = { ...inputs };

  for (let inputKey in inputs) {
    for (let ruleKey in inputs[inputKey].rules) {
      let result = {};

      if (inputs[inputKey].file) {
        result = Validator[ruleKey](
          inputs[inputKey].file,
          inputs[inputKey][ruleKey]
        );
      } else {
        result = Validator[ruleKey](
          inputs[inputKey].value,
          inputs[inputKey][ruleKey]
        );
      }

      resultInputs[inputKey] = {
        ...inputs[inputKey],
        errorMessage: result.error || ''
      };

      break;
    }
  }
  return resultInputs;
};

/**
 * Runs the validation for the given input
 * @param {object} input
 */
export const validateOne = (input) => {
  let tempInput = { ...input };

  for (let ruleKey in input.rules) {
    let result = {};

    if (input.file) {
      result = Validator[ruleKey](input.file, input[ruleKey]);
    } else {
      result = Validator[ruleKey](input.value, input[ruleKey]);
    }

    if (result.error) {
      return {
        ...tempInput,
        errorMessage: result.error
      };
    }
  }

  return {...tempInput, errorMessage: ''};
};
