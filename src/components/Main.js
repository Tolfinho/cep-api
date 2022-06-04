import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

function Main() {
  const { register, handleSubmit, setValue, setFocus } = useForm();

  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);

  const onSubmit = (e) => {
    console.log(e);
  };

  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    //console.log(cep);
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        /*alert(
          data.logradouro +
            '\n' +
            'Cidade: ' +
            data.localidade +
            '\n' +
            'Bairro: ' +
            data.bairro +
            '\n' +
            'Estado: ' +
            data.uf +
            '\n'
        );*/
        setValue('rua', data.logradouro);
        setValue('bairro', data.bairro);
        setValue('cidade', data.localidade);
        setValue('estado', data.uf);
        setFocus('numero');
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/')
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setEstados(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const id = e.target.value;
    fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/distritos?orderBy=nome`
    )
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setCidades(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="form">
        <h1>Informe o seu CEP</h1>
        <div className="hr"></div>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-container">
            <label htmlFor="cep">CEP:</label>
            <input
              name="cep"
              id="cep"
              className="input"
              autoComplete="off"
              {...register('cep')}
              onBlur={checkCEP}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="rua">Rua:</label>
            <input
              name="rua"
              id="rua"
              className="input"
              autoComplete="off"
              {...register('rua')}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="numero">Número:</label>
            <input
              name="numero"
              id="numero"
              className="input"
              autoComplete="off"
              {...register('numero')}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="bairro">Bairro:</label>
            <input
              name="bairro"
              id="bairro"
              className="input"
              autoComplete="off"
              {...register('bairro')}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="cidade">Cidade:</label>
            <input
              name="cidade"
              id="cidade"
              className="input"
              autoComplete="off"
              {...register('cidade')}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="estado">Estado:</label>
            <input
              name="estado"
              id="estado"
              className="input"
              autoComplete="off"
              {...register('estado')}
              required
            />
          </div>
          <div className="input-container">
            <button className="submit-btn">Enviar</button>
          </div>
        </form>
      </div>
      <div className="estados-cidades">
        <h1>Informe seu Estado e sua Cidade</h1>
        <hr />
        <div className="select-container">
          <select onChange={handleChange}>
            <option>Selecione o seu Estado</option>
            {estados.map((estado) => (
              <option key={estado.id} value={estado.id}>
                {estado.nome}
              </option>
            ))}
          </select>
          <select>
            <option>Selecione a sua Cidade</option>
            {cidades.map((cidade) => (
              <option key={cidade.id}>{cidade.nome}</option>
            ))}
          </select>
        </div>
        <div className="button-container">
          <button>Enviar</button>
        </div>
      </div>
    </div>
  );
}

export default Main;
