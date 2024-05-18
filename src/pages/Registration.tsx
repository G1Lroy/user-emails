import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { register } from "../api";
import { Link, useNavigate } from "react-router-dom";
import FromField from "../components/FromField";
import "./../assets/styles/RegistrationPage.scss";
import { toast } from "react-toastify";
import { parseErrors } from "../utils";
import { useAuth } from "../providers/AuthProvider";

const initialValues = {
  username: "",
  email: "",
  password: "",
};
export interface RegFormValues {
  username: string;
  password: string;
  email: string;
}
const registerSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Registration = () => {
  const { setIsAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values: RegFormValues, { resetForm }: FormikHelpers<RegFormValues>) => {
    const regResponse = await register(values);

    if (regResponse.status > 201) {
      const messages = parseErrors(regResponse.message);
      messages.forEach((msg) => toast.warn(msg));
    }
    if (regResponse.status === 201) {
      setIsAuth(true);
      resetForm();
      navigate("/");
      toast.success("User created");
      sessionStorage.setItem("user", JSON.stringify(values));
    }
  };

  return (
    <div className="register-page">
      <h2>Registration</h2>
      <Formik
        initialValues={initialValues}
        validateOnBlur={false}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="register-form">
            <FromField name="username" title="Username:" />
            <FromField name="email" title="Email:" />
            <FromField name="password" title="Password:" />
            <button
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Loading" : "Apply"}
            </button>
          </Form>
        )}
      </Formik>
      <div>
        <p>
          Have accrount? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
