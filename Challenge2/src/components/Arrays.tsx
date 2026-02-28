const myArray = ["First App", "Second App", "Third App"];

function Arrays() {
  return (
    <div>
      <h2>Arrays</h2>
      <ol>
        {myArray.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>
    </div>
  );
}

export default Arrays;
