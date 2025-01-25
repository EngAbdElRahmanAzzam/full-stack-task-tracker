import Button from "../compontents/common/button"

const ErrorHandler = () => {

  //handlers
  const refreshPage = ()=>{
    window.location.reload()
  }

  return (
    <div className="px-2 text-center">
    <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-8xl font-extrabold text-red-600">500</h1>
        <p className="text-4xl font-medium text-gray-800">Internal Server Error</p>
        <p className="text-xl text-gray-800 mt-4">We apologize for the inconvenience. Please try again later.</p>
        <Button className="text-indigo-600 mt-2 border-2 border-indigo-600 hover:text-white hover:bg-indigo-600" onClick={refreshPage}>
          Try Again
        </Button>
    </div>
</div>
  )
}

export default ErrorHandler