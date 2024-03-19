import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import axios from "axios";

const UserRegister = () => {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(4, "Username must be at least 4 characters")
      .required("Username is required"),
    email: Yup.string()
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/,
        "Password must contain at least one uppercase letter, one special character, and one number"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const baseURL = "https://expense-tracker-task-production.up.railway.app/";

      // Endpoint for user registration
      const endpoint = "user/register";

      // Making POST request to register a user
      const response = await axios.post(`${baseURL}${endpoint}`, values);
      
      // Logging the response from the API
      console.log("User registered successfully:", response.data);
      navigate('/login');
    } catch (error) {
      // Handling any errors that occur during the registration process
      console.error("Error registering user:", error);
    }
    setSubmitting(false);
  };

  return (
    <div className="flex flex-wrap h-screen w-screen text-neutral-800 dark:text-neutral-200">
      <div className="g-0 lg:flex lg:flex-wrap h-screen w-screen">
        {/* Left column container*/}
        <div className="lg:w-5/12 h-screen w-screen pt-20">
          <div className="md:mx-6 md:p-12">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <h1 className="mb-20 text-4xl text-blue-800">Sign Up</h1>
                  <div className="relative mb-4">
                    <Field
                      type="text"
                      name="username"
                      placeholder="Username"
                      className="peer shadow-md block min-h-[auto] w-full rounded border bg-transparent px-3 py-2 leading-[1.6] outline-none focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-red-500 text-xs italic"
                    />
                  </div>

                  {/* Email input */}
                  <div className="relative mb-6">
                    <Field
                      type="text"
                      name="email"
                      placeholder="Email"
                      className="peer shadow-md block min-h-[auto] w-full rounded border bg-transparent px-3 py-2 leading-[1.6] outline-none focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-xs italic pt-2"
                    />
                  </div>
                  {/* Password input */}
                  <div className="relative mb-4">
                    <Field
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="peer shadow-md block min-h-[auto] w-full rounded border bg-transparent px-3 py-2 leading-[1.6] outline-none focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary"
                      />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-xs pt-2 italic"
                    />
                  </div>

                  {/* Confirm Password input */}
                  <div className="mb-4 relative">
                    <Field
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      className="peer shadow-md block min-h-[auto] w-full rounded border bg-transparent px-3 py-2 leading-[1.6] outline-none focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary"
                    />
                    {/* No need for separate label */}
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-red-500 text-xs italic"
                    />
                  </div>

                  {/* Submit button */}
                  <div className="flex items-center justify-center">
                    <button
                      className="mt-8 inline-block w-3/4 rounded px-6 py-3 text-xs font-medium uppercase leading-normal text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong bg-gradient-to-b from-green-400 to-green-600 hover:from-blue-400 hover:to-blue-600 border-blue-700 hover:border-blue-800"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Sign Up
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        {/* Right column container */}
        <div
          className="flex items-center justify-center lg:w-7/12 rounded-l-xl"
          style={{
            background:
              "linear-gradient(to right, rgb(5, 117, 230), rgb(2, 27, 121))",
          }}
        >
          <div className="px-4 py-6 text-white md:mx-6 md:p-12">
            <div className="text-center">
              <img
                className="w-56"
                src="https://s3-alpha-sig.figma.com/img/02d5/dbd0/25b313aca49a03d0c493d5ffa5862a3e?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=R~cDvJOVsvbLoaxPg05JKq95XXsSL0k4fdqeteGugD~ijAZ9BL3ihWwRo0bu0B0LWS3s-9lefKWD3EMWqWll7XCLQyXaIMZaEyPOiAz84cSuydNsiB6AcqlHmylNhmAb0HsUs1~DsmAlY9jGseSwz50aILbdJb9zj9Y1by9wWY-whXLIQxNLnmB7hk78ohlJ2QLtGGi8e0R-T72QOcxhBTR5R-MissVizAgPXNaBoZLyG56Fmhmzc6a44nSRMV6E6F8xpvw2ht0AwVAcXPKCEaZSpNDHIiTqL20renV4gdu54vvY7IYv0e7oQu6FHaWIgqHR~YjnC5RvpzTIxovXYw__"
                alt="logo"
              />
              <p className="text-lg -mt-12">Welcome back to win</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
