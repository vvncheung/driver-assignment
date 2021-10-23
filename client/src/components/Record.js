import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faBars, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export default function Record (props) {
  return (
    <tr>
    <td><FontAwesomeIcon icon={faBars}/></td>
    <td>{props.record.description}</td>
    <td className="revenue">&#x24;{props.record.revenue}</td>
    <td className="cost">&#x24;{props.record.cost}</td>
    <td className="actionButtons">
      <Link to={"/edit/" + props.record._id}><FontAwesomeIcon icon={faEdit}/></Link> &nbsp;
      <a
        href="/"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        <FontAwesomeIcon icon={faTrashAlt}/>
      </a>
    </td>
  </tr>
  )
}
