import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { Offline, Online } from 'react-detect-offline';

const Navbar = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(startLogout());
  };
  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <span className="navbar-brand">{name}</span>

      <Online>
        <span className="text-success">Online</span>
      </Online>
      <Offline>
        <span className="text-danger">
          Offline - Las Peticiones seran guardadas
        </span>
      </Offline>

      <button className="btn btn-outline-danger" onClick={handleLogout}>
        <i className="fas fa-sign-out-alt">&nbsp;</i>
        <span className="navbar-brand">Salir</span>
      </button>
    </div>
  );
};

export default Navbar;
