import './App.css';
import RubyCourse from './images/ruby_course.png'

function App() {
  return (
    <div className="App"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <img src={RubyCourse} alt="Olentangy Mini Golf -- Ruby Course" />
    </div>
  );
}

export default App;
