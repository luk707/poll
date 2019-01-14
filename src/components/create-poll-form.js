import React, { Fragment } from "react";
import { Button, Box, Text, IconButton } from "gestalt";
import { Field, FieldArray, reduxForm } from "redux-form";
import renderField from "./render-field";

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = "You must enter the name of the poll.";
  }
  if (!values.options || values.options.length < 2) {
    errors.options = { _error: "At least two options must be entered." };
  } else {
    const optionErrors = [];
    values.options.forEach((option, optionIndex) => {
      if (!option) {
        optionErrors[optionIndex] = "An option cannot be empty.";
      }
    });
    errors.options = optionErrors;
  }
  return errors;
};

const renderOptions = ({ fields, meta: { error, submitFailed } }) => (
  <Box paddingY={3}>
    {fields.map((option, index) => (
      <Box display="flex" alignItems="end">
        <Box flex="grow" paddingY={1}>
          <Field
            name={option}
            type="text"
            component={renderField}
            label={`Option #${index + 1}`}
          />
        </Box>
        <Box paddingX={2}>
          <IconButton
            accessibilityLabel="Remove"
            icon="remove"
            iconColor="gray"
            size="lg"
            onClick={() => {
              fields.remove(index);
            }}
          />
        </Box>
      </Box>
    ))}
    {submitFailed && error && <Text color="orange">{error}</Text>}
    <Box paddingY={3}>
      <Button text="Add option" onClick={() => fields.push()} inline />
    </Box>
  </Box>
);

const CreatePollForm = props => {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" justifyContent="between" alignItems="center">
        <h2>
          <Text bold size="xl">
            New poll
          </Text>
        </h2>
        <div>
          <Button type="submit" color="red" text="Create" inline />
        </div>
      </Box>
      <Field
        name="name"
        type="text"
        component={renderField}
        label="Name"
        placeholder="How much wood could a woodchuck chuck?"
      />
      <FieldArray name="options" component={renderOptions} />
    </form>
  );
};

export default reduxForm({ form: "create-poll", validate })(CreatePollForm);
