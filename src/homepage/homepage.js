import { useEffect } from 'react';
import {Link} from 'react-router-dom';
export default function HomePage({questions, handleSelect, active, handleDeselect, restartQuiz, loading, user}) {
    const categories = [
        {name:"Any", number:9},
        {name:"Movies", number:11},
        {name:"Music", number:12},
        {name:"Geography", number:22},
        {name:"History", number:23},
        {name:"Sports", number:21},
        {name:"Mythology", number:20},
      ];

      useEffect(()=> {
        restartQuiz();
      }, []);

      const listCategories = () => {
        return categories.map((category) => {
          if (loading === category.number) {
            return (
              <li key={category.number}>
             <button value={category.number} className={`loading`} onClick={()=> handleDeselect(category.number)}>Loading . . .</button></li>
            )
          }
          if (active === category.number) {
            return (
              <li key={category.number}>
             {questions && <Link to="/questions"><button value={category.number} className={`active`} onClick={()=> handleDeselect(category.number)}>Start</button>
            </Link>} </li>
            )
          } else {
            return (
              <li key={category.number}>
                <button value={category.number} className={`category-buttons`} onClick={()=> handleSelect(category.number)}>{category.name}</button>
              </li>
            );
          }
        });
      };


    return (
    <div className="App">
      <h1>Select Your Category, {user.user_name}</h1>
      <ul className="button-group">
       {listCategories()} 
      </ul>
    </div>
    )
}