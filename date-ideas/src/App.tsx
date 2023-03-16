import './App.css';
import Card, { Props } from './Card';

function App() {
  const todo: Props[] = [
    {
      title: "Best",
      ideas: [
        "Mall",
        "Amusement Park",
        "Arcade",
        "Invite Them Over (Later)",
        "Walk in the Park",
        "Street Fair",
        "Escape Room",
      ],
    },
    {
      title: "Great",
      ideas: [
        "Mini Golf (Need to finish one day)",
        "Zoo",
        "Roller-blading/Ice skating",
        "Bowling",
        "Trampoline Park",
        "Hiking (Find trails)",
        "Biking (Find place to rent)",
      ],
    },
    {
      title: "Good",
      ideas: [
        "Water Park",
        "Museum Exhibit (Are they a deep thinker? 🤔)",
        "Cooking Class (Make a better dish than them 💪)",
        "Camping/Road Trip (Later)",
        "Couple's Dance Class (After comfortable with their touch)",
      ],
    },
    {
      title: "Okay",
      ideas: [
        "Painting Class",
        "Pottery Class",
        "Laser Tag",
        "Canoe/Kayaking",
        "Sleping in a spoopy, scary 👻 place (Later)",
        "Volunteering",
        "A Bar (🤢 Alcohol)",
        "Coffee/Tea (Less useful with time or very casual)",
        "Karaoke (Do they sing?)",
        "Movies",
        "Comedy/Live Show",
      ],
    },
    {
      title: "Maybe",
      ideas: [
        "Random Tour of City (They've lived here their whole life 😂)",
        "Clubbing (Bring Ear plugs)",
        "House Party (Only theirs)",
        "Concert/Rave (... Drugs)",
        "Puzzle (OK Grandpa 😂)",
        "Sports Event (Do they like sports? Do I?)",
        "Beach (Where and what to do?)",
      ],
    },
  ]
  return (
    <div className="App"
      style={{ display: "flex", flexDirection: "column" }}
    >
      {todo.map((prop) => {
        return (<Card title={prop.title} ideas={prop.ideas} />)
      })}
    </div>
  );
}

export default App;
