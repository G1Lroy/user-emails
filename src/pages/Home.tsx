import { Form, Formik, FormikHelpers } from "formik";
import { toast } from "react-toastify";

import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../providers/AuthProvider";
import { getLocalUser } from "../utils";

import { getEmails, getUser, sendEmail } from "../api";
import EmailEditor from "../components/EmailEditor";
import FromField from "../components/FromField";
import EmailsTable from "../components/EmailsTable";

import * as Yup from "yup";
import "./../assets/styles/HomePage.scss";

export interface UserState {
  email: string;
  id: string;
  username: string;
}
export interface EmailFormValues {
  recipient: string;
  subject: string;
}
export interface EmailsItem {
  id: number;
  recipient: string;
  subject: string;
}

interface EmailsState {
  data: EmailsItem[];
  nextPage: string;
  previous: string;
}

const emailSchema = Yup.object().shape({
  recipient: Yup.string().email().required("Recipient is required"),
  subject: Yup.string().required("Subject is required"),
});
const emptyField = JSON.stringify("<p><br></p>");

const Home = () => {
  // Text editor data
  const [htmlData, setHtmlData] = useState("");
  // Text editor node
  const [resetNode, setResetNode] = useState(0);

  const [userData, setUserData] = useState<null | UserState>(null);
  const [emailsData, setEmailsData] = useState<EmailsState>({
    data: [],
    nextPage: "",
    previous: "",
  });
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const localUser = getLocalUser();

  useEffect(() => {
    if (!localUser) {
      navigate("/login");
      toast.info("Please refresh page");
      return;
    }
    fetchUser();
    fetchEmails();
  }, []);

  const handleSubmit = async (values: EmailFormValues, { resetForm }: FormikHelpers<EmailFormValues>) => {
    const { recipient, subject } = values;
    const formData = {
      recipient,
      subject,
      message: htmlData,
      sender: parseInt(userData?.id ?? "0"),
    };
    const response = await sendEmail(formData, localUser!);

    if (response.status === 201) {
      toast.success("Message is send!");
      resetForm();
      // Re render email editor
      setResetNode((prev) => prev + 1);
      setHtmlData("");
      fetchEmails();
    }
    if (response.status > 201) {
      toast.warn("Server problems");
    }
  };

  const fetchUser = async () => {
    const { password, username } = localUser!;
    const data = await getUser(username, password);
    setUserData(data);
  };
  const fetchEmails = async (url?: string) => {
    const { password, username } = localUser!;
    const data = await getEmails(username, password, url);

    const { results, next, previous } = data;
    setEmailsData({ data: results, nextPage: next, previous });
  };

  // useCallback для корректной работы react memo
  const getHTML = useCallback((html: string) => {
    if (html === emptyField) return;
    setHtmlData(html);
  }, []);

  return (
    <div className="home-page">
      <div className="head">
        <div>{userData ? <div>{userData.email}</div> : <div>Loading user data...</div>}</div>
        <button onClick={logOut}>Logout</button>
      </div>

      <div className="content">
        <Formik
          initialValues={{
            recipient: "",
            subject: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={emailSchema}
          validateOnBlur={false}
        >
          {({ isSubmitting }) => (
            <Form className="email-form">
              <FromField name="recipient" title="To :" />
              <FromField name="subject" title="Subject :" />
              <EmailEditor key={resetNode} disabledCondition={isSubmitting} onGetValues={getHTML} />

              <button disabled={isSubmitting || htmlData === emptyField || !htmlData} type="submit">
                Send
              </button>
            </Form>
          )}
        </Formik>

        <EmailsTable emailsData={emailsData} fetchEmails={fetchEmails} />
      </div>
    </div>
  );
};

export default Home;
