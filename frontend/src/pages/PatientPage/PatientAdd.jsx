function PatientAdd() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="mt-7 w-full max-w-md border border-gray-200 rounded-lg shadow-md p-8 bg-white">
        <div className="w-full">
          <div className="w-full">
            <div className="w-full">
              <h2 className="text-3xl font-bold my-4 capitalize">
                Add New Patient
              </h2>
            </div>
            <div className="w-full">
              <form>
                {/* Patient Name */}
                <div className="mb-4">
                  <label
                    htmlFor="patient-name"
                    className="block text-sm font-medium mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="patient-name"
                    name="name"
                    className="py-2.5 sm:py-3 px-4 block w-full border border-gray-400 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter patient's full name"
                  />
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label
                    htmlFor="patient-email"
                    className="block text-sm font-medium mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="patient-email"
                    name="email"
                    className="py-2.5 sm:py-3 px-4 block w-full border border-gray-400 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter patient's email"
                  />
                </div>

                {/* Phone */}
                <div className="mb-4">
                  <label
                    htmlFor="patient-phone"
                    className="block text-sm font-medium mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="patient-phone"
                    name="phone"
                    className="py-2.5 sm:py-3 px-4 block w-full border border-gray-400 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter patient's phone number"
                  />
                </div>

                {/* Gender */}
                <div className="mb-4">
                  <label
                    htmlFor="patient-gender"
                    className="block text-sm font-medium mb-1"
                  >
                    Gender
                  </label>
                  <select
                    id="patient-gender"
                    name="gender"
                    className="py-2.5 sm:py-3 px-4 block w-full border border-gray-400 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Submit Button */}
                <div className="grid">
                  <button
                    type="submit"
                    className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700"
                  >
                    Add Patient
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientAdd;
