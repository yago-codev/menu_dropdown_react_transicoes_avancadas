import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { ReactComponent as AlienIcon } from './assets/alien.svg';
import { ReactComponent as DownIcon } from './assets/down-arrow.svg';
import { ReactComponent as LeftIcon } from './assets/down-arrow.svg';
import { ReactComponent as RightIcon } from './assets/down-arrow.svg';
import { ReactComponent as ConfigIcon } from './assets/options.svg';
import { ReactComponent as CatIcon } from './assets/cat.svg';
import { ReactComponent as KoalaIcon } from './assets/koala.svg';
import { ReactComponent as DuckIcon } from './assets/platypus.svg';
import { ReactComponent as CockIcon } from './assets/hen.svg';
import { ReactComponent as HedgehogIcon } from './assets/hedgehog.svg';



function App() {
  function DropdownItem(props) {
    return (
      <a href="#" className="menu-item">
        {props.children}
      </a>
    )
  }

  return (
    <NavBar>
      <NavItem icon={<CockIcon />} />
      <NavItem icon={<ConfigIcon />} />
      <NavItem icon={<DownIcon />}>
        <DropdownMenu />
      </NavItem>
    </NavBar>
  );
}

function DropdownMenu() {
  const [menuAtivo, setMenuAtivo] = useState('main');
  const [menuAltura, setMenuAltura] = useState(null);

  function calcularAltura(elemento) {
    const altura = elemento.offsetHeight;
    setMenuAltura(altura);
  }

  function DropdownItem(props) {
    return (
      <a href="#" className="menu-item" onClick={() => props.vaParaOMenu && setMenuAtivo(props.vaParaOMenu)}>
        <span className="icon-button">
          {props.leftIcon}
        </span>

        {props.children}

        <span className="icon-right">
          {props.rightIcon}
        </span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuAltura }}>
      <CSSTransition
        in={menuAtivo === 'main'}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
        onEnter={calcularAltura}
      >
        <div className="menu">
          <DropdownItem leftIcon={<AlienIcon />}>
            Meu Perfil
          </DropdownItem>

          <DropdownItem
            leftIcon={<LeftIcon />}
            vaParaOMenu="settings"
          >
            Animais
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={menuAtivo === 'settings'}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={calcularAltura}
      >
        <div className="menu">
          <DropdownItem
            leftIcon={<RightIcon />}
            vaParaOMenu="main"
          />
          <DropdownItem leftIcon={<CatIcon />}>
            Gatinho
          </DropdownItem>

          <DropdownItem leftIcon={<KoalaIcon />}>
            Koala
          </DropdownItem>

          <DropdownItem leftIcon={<DuckIcon />}>
            Pato
          </DropdownItem>

          <DropdownItem leftIcon={<HedgehogIcon />}>
            Porco Espinho
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

function NavBar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        {props.children}
      </ul>
    </nav>
  );
}

function NavItem(props) {
  const [abrir, setAbrir] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setAbrir(!abrir)}>
        {props.icon}
      </a>

      {abrir && props.children}
    </li>
  );
}

export default App;
