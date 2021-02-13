import React from "react";
import { useForm } from "react-hook-form";
const SampleForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="username"
          type="text"
          placeholder="Enter username"
          ref={register({
            required: true,
            minLength: {
              value: 6,
              message: "Username shold be greater than 6 char",
            },
          })}
        />
        {errors.username && (
          <p className="text-danger">{errors.username.messages}</p>
        )}
        <input
          name="description"
          type="text"
          placeholder="Enter description"
          ref={register}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SampleForm;
