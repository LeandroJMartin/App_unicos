import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMenuMobileContext } from '../../context/menuMobileContext';
import Logo from '../../../public/logo.svg';
import LogoWhite from '../../../public/logo-white.svg';
import { RiMenu3Fill } from 'react-icons/ri';
import SocialIcons from '../interface/SocialIcons';
import NavigationApp from '../interface/Navigation';

interface props {
  SocialLinks: any;
}

const HeaderApp = ({ SocialLinks }: props) => {
  const { state: menuState, toogleState: toogleStateMenu } =
    useMenuMobileContext();

  return (
    <header
      className={`bg-white h-auto container py-4 xl:py-0 flex flex-col xl:flex-row justify-between transition-all ${
        menuState && 'bg-blue'
      }`}
    >
      <div className="flex items-center justify-between">
        <Link href="/">
          {menuState ? (
            <Image
              src={LogoWhite}
              alt="Logotipo Unicos Construtora"
              width={150}
              height={42}
            />
          ) : (
            <Image
              src={Logo}
              alt="Logotipo Unicos Construtora"
              width={150}
              height={42}
            />
          )}
        </Link>
        <button className="block xl:hidden" onClick={() => toogleStateMenu()}>
          <RiMenu3Fill
            size={30}
            className={`transition-all ${
              menuState ? 'text-white' : 'text-blue'
            }`}
          />
        </button>
      </div>
      <div
        className={`block lg:flex flex-col xl:flex-row h-[calc(100vh_*_0.93)] lg:h-auto py-8 ${
          menuState ? 'flex' : 'hidden'
        } `}
      >
        <NavigationApp />
        <SocialIcons SocialLinks={SocialLinks.apiData.linksSocialPage} />
      </div>
    </header>
  );
};

export default HeaderApp;
