import { useAtomValue } from "jotai";
import { atomWithFormControls, atomWithValidate } from "jotai-form";
import { z } from "zod";

const name = atomWithValidate("", {
	validate: (v) =>
		z.string().min(1, { message: "Name cannot be empty" }).parse(v),
});
const age = atomWithValidate(17, {
	validate: (v) => z.coerce.number(v).min(18).parse(v),
});
const formAtom = atomWithFormControls({ name, age });

export const FormOne = () => {
	const {
		isValid,
		handleOnChange,
		values,
		error,
		fieldErrors,
		touched,
		setTouched,
	} = useAtomValue(formAtom);

	const getHelperMessageFromFieldErrors = (fieldError, touched) => {
		if (touched === false) {
			return undefined;
		}

		return fieldError;
	};

	const setTouchedToErrorFields = () => {
		if (Object.keys(fieldErrors).length === 0) {
			return;
		}

		for (const field in fieldErrors) {
			const error = fieldErrors[field];

			if (error !== null) {
				setTouched(field, true);
			}
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (!isValid) {
			setTouchedToErrorFields();
		}
	};

	return (
		<>
			<h2>Default values are incorrect, Shown on submit</h2>
			<form onSubmit={onSubmit}>
				<div>
					<label>
						<input
							name="name"
							placeholder="name"
							value={values.name}
							onChange={(e) =>
								handleOnChange("name")(e.target.value)
							}
						/>
						<small>
							{getHelperMessageFromFieldErrors(
								fieldErrors?.name?.message,
								touched.name
							)}
						</small>
					</label>
				</div>
				<div>
					<label>
						<input
							type="number"
							name="age"
							placeholder="age"
							value={values.age}
							onChange={(e) =>
								handleOnChange("age")(e.target.value)
							}
						/>
						<small>
							{getHelperMessageFromFieldErrors(
								fieldErrors?.age?.message,

								touched.age
							)}
						</small>
					</label>
				</div>
				<div>
					<button onClick={onSubmit}>Submit</button>
				</div>
				{error?.message}
			</form>
		</>
	);
};
