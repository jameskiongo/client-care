function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Hero */}
      <div className="max-w-[85rem] h-full flex items-center justify-center  mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid */}
        <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-center">
          <div className="lg:col-span-3">
            <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl lg:text-6xl">
              Client care system
            </h1>
            {/* <p className="mt-3 text-lg text-gray-800"> */}
            {/*   Health program management system for enrolling and tracking client */}
            {/*   information */}
            {/* </p> */}
            <div>
              <p className="my-6 text-lg text-gray-800">
                A streamlined health program management system designed for
                healthcare providers to efficiently register clients, enroll
                them in various health programs, and manage their profiles. The
                system offers secure API endpoints for seamless integration with
                other platforms, ensuring accurate tracking and improved
                coordination of healthcare services.
              </p>
            </div>
          </div>
          {/* End Col */}

          <div className="lg:col-span-4 mt-10 lg:mt-0">
            <img
              className="w-full rounded-xl"
              src="https://thumbs.dreamstime.com/b/medical-hospital-healthcare-vector-infographics-doctors-departments-poster-cardiology-heart-pills-stethoscope-88016897.jpg"
              alt="Hero Image"
            />
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </div>
      {/* End Hero */}
    </div>
  );
}

export default LandingPage;
