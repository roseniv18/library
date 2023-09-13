export const checkErrorInputs = (inputs) => {
    let errorVals = [];
    Object.keys(inputs).map((val) => {
        if (!inputs[val].value) {
            errorVals.push(inputs[val]);
        }
    });
    return errorVals;
};
