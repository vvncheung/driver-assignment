import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export default function Record (currentrecord) {
  return (
    <tr>
    <td>{currentrecord.record.description}</td>
    <td className="revenue">{currentrecord.record.revenue}</td>
    <td className="cost">{currentrecord.record.cost}</td>
    <td className="actionButtons">
      <Link to={"/edit/" + currentrecord.record._id}><FontAwesomeIcon icon={faEdit}/></Link> &nbsp;
      <a
        href="/"
        onClick={() => {
          currentrecord.deleteRecord(currentrecord.record._id);
        }}
      >
        <FontAwesomeIcon icon={faTrashAlt}/>
      </a>
    </td>
  </tr>
  )
}
