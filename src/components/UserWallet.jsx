import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  accountBalance: Yup.number().required("Account balance is required"),
  savingsAmount: Yup.number().required("Savings amount is required"),
  cashInHand: Yup.number().required("Cash in hand is required"),
});

const initialValues = {
  accountBalance: "",
  savingsAmount: "",
  cashInHand: "",
};

const UserWallet = () => {
    const handleSubmit = async (values, { resetForm, setSubmitting }) => {
        try {
          const baseURL = "https://expense-tracker-task-production.up.railway.app/";
    
          // Endpoint for posting wallet details
          const endpoint = "user/wallet";
    
          // Set headers with token
          const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwtToken"),
            
          };
    
          // Make POST request to save wallet details
          const response = await axios.post(`${baseURL}${endpoint}`, values, { headers });
    
          // Logging the response from the API
          console.log("Wallet details saved successfully:", response.data);
    
          // Reset the form
          resetForm();
    
        } catch (error) {
          // Handling any errors that occur during the form submission
          console.error("Error saving wallet details:", error);
        }
        setSubmitting(false);
      };

  return (

    <div className="lg:w-5/12 h-screen w-screen pt-24">
      <div className="md:mx-6 md:p-12">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <h1 className="mb-20 text-4xl text-blue-800">Wallet Details</h1>
              
              {/* Account Balance input */}
              <div className="relative mb-6">
                <label htmlFor="accountBalance" className="block text-sm font-medium text-gray-700">
                  Account Balance
                </label>
                <Field
                  type="text"
                  id="accountBalance"
                  name="accountBalance"
                  placeholder="Account Balance"
                  className="peer shadow-md block min-h-[auto] w-full rounded border bg-transparent px-3 py-2 leading-[1.6] outline-none focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary"
                />
                <ErrorMessage name="accountBalance" component="div" className="text-red-500 text-xs italic pt-2" />
              </div>

              {/* Savings Amount input */}
              <div className="relative mb-6">
                <label htmlFor="savingsAmount" className="block text-sm font-medium text-gray-700">
                  Savings Amount
                </label>
                <Field
                  type="text"
                  id="savingsAmount"
                  name="savingsAmount"
                  placeholder="Savings Amount"
                  className="peer shadow-md block min-h-[auto] w-full rounded border bg-transparent px-3 py-2 leading-[1.6] outline-none focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary"
                />
                <ErrorMessage name="savingsAmount" component="div" className="text-red-500 text-xs italic pt-2" />
              </div>

              {/* Cash in Hand input */}
              <div className="relative mb-6">
                <label htmlFor="cashInHand" className="block text-sm font-medium text-gray-700">
                  Cash in Hand
                </label>
                <Field
                  type="text"
                  id="cashInHand"
                  name="cashInHand"
                  placeholder="Cash in Hand"
                  className="peer shadow-md block min-h-[auto] w-full rounded border bg-transparent px-3 py-2 leading-[1.6] outline-none focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary"
                />
                <ErrorMessage name="cashInHand" component="div" className="text-red-500 text-xs italic pt-2" />
              </div>

              {/* Submit button */}
              <div className="mb-12 pb-1 pt-1 text-center">
                <button
                  className="mt-8 inline-block w-3/4 rounded px-6 py-3 text-xs font-medium uppercase leading-normal text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong bg-gradient-to-b from-green-400 to-green-600 hover:from-blue-400 hover:to-blue-600 border-blue-700 hover:border-blue-800"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
};

export default UserWallet;
