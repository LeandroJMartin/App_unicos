import { useState } from 'react';
import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Capa from '../../public/contato.jpeg';
import {
  FormDuvidas,
  FormContato,
  FormSuaArea,
} from '../components/interface/Forms';
import { SocialLinks } from '../lib/querys';
import { IoIosArrowDown } from 'react-icons/io';
import MapApp from '../components/interface/Map';
import { BsWhatsapp } from 'react-icons/bs';

type Indice = {
  [key: string]: JSX.Element;
};

const ContactApp: NextPage = ({ apiData }: any) => {
  const [selectedForm, setSelectedForm] = useState<keysOfForm>('form_duvida');

  const forms: Indice = {
    form_duvida: <FormDuvidas />,
    form_duvida_anexo: <FormDuvidas />,
    form_contato: <FormContato />,
    form_sua_area: <FormSuaArea />,
  };

  const handleClickButtonForm = (value: keysOfForm) => setSelectedForm(value);

  return (
    <>
      <section className="container">
        <div className="relative h-[140px] sm:h-[400px] rounded-3xl">
          <Image
            src={Capa}
            alt="Contato Unicos"
            fill
            className="object-cover object-center rounded-3xl"
          />
        </div>
      </section>

      <section className="container my-8">
        <div className="relative z-10 md:-translate-y-5 py-8">
          <h1 className="title">Fale com a Unicos</h1>
          <button className="flex md:hidden justify-center items-center bg-bgBlue py-3 px-3 mt-4 w-full rounded-xl">
            <p className="text-white font-bold mr-2">Tire suas dúvidas</p>
            <IoIosArrowDown size={20} className="text-white" />
          </button>
          <div className="block md:flex justify-center">
            <div className="hidden md:inline-block drop-shadow-xl border border-slate-300 rounded-2xl mt-6 py-2 px-4 md:bg-white">
              <FormButtonSelect
                label="Tire suas dúvidas"
                keyFormSelect="form_duvida"
                fnClick={handleClickButtonForm}
                keySelected={selectedForm}
              />

              <FormButtonSelect
                label="Ofereça sua área"
                keyFormSelect="form_sua_area"
                fnClick={handleClickButtonForm}
                keySelected={selectedForm}
              />

              <FormButtonSelect
                label="Seja um parceiro"
                keyFormSelect="form_duvida_anexo"
                fnClick={handleClickButtonForm}
                keySelected={selectedForm}
              />

              <FormButtonSelect
                label="Trabalhe conosco"
                keyFormSelect="form_contato"
                fnClick={handleClickButtonForm}
                keySelected={selectedForm}
              />
            </div>
          </div>
        </div>
        {forms[selectedForm]}
      </section>

      <section className="container py-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-[75%] md:pr-6">
            <MapApp />
          </div>
          <div className="w-full md:w-[25%] mt-6 md:mt-0">
            <h2 className="text-blue2 text-xl font-bold">0800 775 8282</h2>
            <h2 className="text-blue2 text-xl font-bold flex items-center">
              <BsWhatsapp />
              <span className="ml-2">17 99609-2042</span>
            </h2>
            <p className="font-bold text-blue my-2">
              renegocie@unicosconstrutora.com.br
            </p>
            <p>
              Av. Anísio Haddad, n° 8001, Torre Madrid Norte, Sala 413. Bairro
              Jardim Vivendas. São José do Rio Preto - SP
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactApp;

type keysOfForm =
  | 'form_duvida'
  | 'form_contato'
  | 'form_sua_area'
  | 'form_duvida_anexo';

interface IFormButtonSelect {
  label: string;
  keyFormSelect: keysOfForm;
  fnClick: (key: keysOfForm) => void;
  keySelected: keysOfForm;
}

const FormButtonSelect = ({
  label,
  keyFormSelect,
  fnClick,
  keySelected,
}: IFormButtonSelect) => {
  return (
    <button
      className={`w-[150px] inline-block ${
        keySelected === keyFormSelect ? 'text-blue' : 'text-current'
      }`}
      onClick={() => fnClick(keyFormSelect)}
    >
      {label}
    </button>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const linksSocialPage = await (
    await SocialLinks.queryExecute()
  ).linksSocialPage;

  return {
    props: {
      apiData: { linksSocialPage },
    },
    revalidate: 30,
  };
};