interface Props {
  message: string;
}

const ErrorMessage = ({ message }: Props) => {
  return (
    <div className="error-div">
      <h2 className="text-danger mb-4">
        Something went wrong! You've encountered the following error:
      </h2>
      <h3 className="mb-4">
        <em>"{message}"</em>
      </h3>
      <h4 className="text-danger">
        Please wait a moment before refreshing the page. Contact server admin if
        issue persists
      </h4>
    </div>
  );
};

export default ErrorMessage;
