import { Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Edit from "./components/edit";
import Create from "./components/create";
import RecordList from "./components/recordList";

import './App.css';

export default function App()  {
  return (
    <>
      <Navbar />
      <Route exact path="/">
        <RecordList />
      </Route>
      <Route path="/edit/:id" component={Edit} />
      <Route path="/create">
        <Create />
      </Route>
    </>
  );
};
