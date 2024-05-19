import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { login } from "../api";
import { toast } from "react-toastify";
import FromField from "../components/FromField";
import "./../assets/styles/LoginPage.scss";

interface FormValues {
  username: string;
  password: string;
}
const loginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});
const initialValues = {
  username: "",
  password: "",
};

const Login = () => {
  const { setIsAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
    const { password, username } = values;

    const responce = await login(username, password);

    if (responce === 200) {
      setIsAuth(true);
      resetForm();
      navigate("/");
      toast.success("Logged");
      sessionStorage.setItem("user", JSON.stringify(values));
    }
    if (responce === 401) {
      toast.warn("Invalid password or user name");
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <Formik
        validateOnBlur={false}
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="login-form">
            <FromField name="username" title="Username:" />
            <FromField name="password" title="Password:" />
            <button disabled={isSubmitting} type="submit">
              {isSubmitting ? "Loading" : "Login"}
            </button>
          </Form>
        )}
      </Formik>
      <div>
        <p>
          New here? <Link to={"/register"}>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
