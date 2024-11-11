import { useAtom, useAtomValue, atom } from "jotai";
import { atomWithFormControls, atomWithValidate } from "jotai-form";
import { z } from "zod";

const name = atomWithValidate("", { validate: (v) => v });
const age = atomWithValidate(17, {
  validate: (v) => z.coerce.number(v).min(18).parse(v),
});
const form = atomWithFormControls(
  { name, age },
  {
    validate: (v) => {
      z.object({
        name: z.string().optional(),
      }).parse(v);
    },
  }
);

export const FormTwo = () => {
  const {
    isValid,
    handleOnChange,
    values,
    touched,
    handleOnFocus,
    handleOnBlur,
    fieldErrors,
  } = useAtomValue(form);

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (!isValid) return;
  };

  console.log({ touched });

  return (
    <>
      <h2>
        Default values might not exist and need changes and touched state before
        submitting
      </h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>
            <input
              name="name"
              placeholder="name"
              value={values.email}
              onChange={(e) => handleOnChange("name")(e.target.value)}
              onFocus={(e) => handleOnFocus("name")()}
              onBlur={(e) => handleOnBlur("name")()}
            />
            <small>{touched.name && fieldErrors?.name?.message}</small>
          </label>
        </div>
        <div>
          <label>
            <input
              type="number"
              name="age"
              placeholder="age"
              value={values.age}
              onChange={(e) => handleOnChange("age")(e.target.value)}
              onFocus={(e) => handleOnFocus("age")()}
              onBlur={(e) => handleOnBlur("age")()}
            />
            <small>{touched.age && fieldErrors?.age?.message}</small>
          </label>
        </div>
        <button onClick={onSubmit} disabled={!isValid}>
          Submit
        </button>
      </form>
    </>
  );
};
