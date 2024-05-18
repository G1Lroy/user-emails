import { ErrorMessage, Field } from "formik";
import "./../assets/styles/FormField.scss";

type FromFieldProps = {
  name: string;
  title: string;
};

const FromField = ({ name, title }: FromFieldProps) => {
  return (
    <div className="form-field">
      <label htmlFor={name}>
        {title}
      </label>
        <ErrorMessage name={name} component="div" className="error-message" />
      <Field type="text" name={name} />
    </div>
  );
};

export default FromField;
