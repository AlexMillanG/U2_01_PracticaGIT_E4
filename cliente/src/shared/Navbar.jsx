import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/proveedores" className="hover:text-gray-300">Proveedores</Link>
        </li>
        <li>
          <Link to="/cars" className="hover:text-gray-300">Automóviles</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
