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

const submittedAtom = atom(false);

export const FormOne = () => {
  const [isSubmitted, setSubmitted] = useAtom(submittedAtom);
  const { isValid, handleOnChange, values, error, fieldErrors } =
    useAtomValue(form);

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (!isValid) return;
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
              onChange={(e) => handleOnChange("name")(e.target.value)}
            />
            <small>{isSubmitted && fieldErrors?.name?.message}</small>
          </label>
        </div>
        <div>
          <label>
            <input
              type="number"
              name="age"
              placeholder="age"
              value={values.age}
              onChange={(e) => handleOnChange("name")(e.target.value)}
            />
            <small>{isSubmitted && fieldErrors?.age?.message}</small>
          </label>
        </div>
        <div>
          <button onClick={onSubmit}>Submit</button>
        </div>
        {isSubmitted && error?.message}
      </form>
    </>
  );
};
