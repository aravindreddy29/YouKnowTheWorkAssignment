const Button = (props) => {
  //  Write your code here.
  const { className, buttonText } = props;
  return <button className={`button ${className}`}>{buttonText}</button>;
};

const element = (
  //  Write your code here.
  <div id="bg-container">
    <h1 className="main-heading">Social Buttons</h1>
    <div className="button-container">
      <Button buttonText="Like" className="button-l" />
      <Button buttonText="Comment" className="button-c" />
      <Button buttonText="Share" className="button-s" />
    </div>
  </div>
);

ReactDOM.render(element, document.getElementById("root"));
