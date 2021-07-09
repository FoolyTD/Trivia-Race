import {Link} from 'react-router-dom';
export default function HomePage({questions, handleSelect}) {
    const categories = [
        {name:"Any", number:9},
        {name:"Movies", number:11},
        {name:"Music", number:12},
        {name:"Geography", number:22},
        {name:"History", number:23},
        {name:"Sports", number:21},
        {name:"Mythology", number:20},
      ];

      const listCategories = () => {
        return categories.map((category) => {
          return (
            <li key={category.number}>
              <button className="category-buttons" onClick={()=> handleSelect(category.number)}>{category.name}</button>
            </li>
          );
        });
      };


    return (
    <div className="App">
      <h1>Select Your Category</h1>
      <ul className="button-group">
       {listCategories()} 
      </ul>
      {questions && <Link to="/questions">Start Quiz</Link>}
    </div>
    )
}