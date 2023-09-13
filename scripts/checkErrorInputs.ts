import { CheckErrorInputs } from "../types/CheckErrorInputs"

export const checkErrorInputs = (inputs: CheckErrorInputs) => {
	let errorVals = []

	Object.keys(inputs).map((val) => {
		if (!inputs[val].value) {
			errorVals.push(inputs[val])
		}
	})

	return errorVals
}
