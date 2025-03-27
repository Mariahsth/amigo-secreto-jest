import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import Formulario from "./Formulario";
import { RecoilRoot } from "recoil";

//Jest

describe('o comportamento do formulário.tsx', () => {
    test("quando o input está vazio, novos participantes não podem ser adicionados", () => {
      render(
        <RecoilRoot>
          <Formulario />
        </RecoilRoot>
      );
      // Encontrar no DOM o input -> React testing library
      const input = screen.getByPlaceholderText(
        "Insira os nomes dos participantes"
      );
      // Encontrar o botão -> React testing library
      const botao = screen.getByRole("button");
      // Garantir que o input esteja no documento -> JEST
      expect(input).toBeInTheDocument();
      // Garantir que o botão esteja desabilitado -> JEST
      expect(botao).toBeDisabled();
    });
    
    test("adicionar um participante caso exista um nome preenchido", () => {
      render(
        <RecoilRoot>
          <Formulario />
        </RecoilRoot>
      );
      const input = screen.getByPlaceholderText(
        "Insira os nomes dos participantes"
      );
      const botao = screen.getByRole("button");
    
      //inserir um valor no input
      fireEvent.change(input, {
        target: {
          value: "Ana Catarina",
        },
      });
    
      //clicar no botao submeter
      fireEvent.click(botao);
      //garantir que o input esteja com o foco ativo
      expect(input).toHaveFocus();
      //garantir que o input não tenha um valor
      expect(input).toHaveValue("");
    });
    
    test("Nomes duplicados não podem ser adicionados na lista", () => {
      render(
        <RecoilRoot>
          <Formulario />
        </RecoilRoot>
      );
      const input = screen.getByPlaceholderText(
        "Insira os nomes dos participantes"
      );
      const botao = screen.getByRole("button");
    
      //inserir um valor no input
      fireEvent.change(input, {
        target: {
          value: "Ana Catarina",
        },
      });
    
      //clicar no botao submeter
      fireEvent.click(botao);
      fireEvent.change(input, {
        target: {
          value: "Ana Catarina",
        },
      });
      fireEvent.click(botao);
    
      const mensagemDeErro = screen.getByRole("alert");
      expect(mensagemDeErro.textContent).toBe(
        "Nomes duplicados não são permitidos"
      );
    });
    
    test("A mensagem de erro deve sumir após os timers", () => {
      jest.useFakeTimers();
      render(
        <RecoilRoot>
          <Formulario />
        </RecoilRoot>
      );
      const input = screen.getByPlaceholderText(
        "Insira os nomes dos participantes"
      );
      const botao = screen.getByRole("button");
    
      //inserir um valor no input
      fireEvent.change(input, {
        target: {
          value: "Ana Catarina",
        },
      });
    
      //clicar no botao submeter
      fireEvent.click(botao);
      fireEvent.change(input, {
        target: {
          value: "Ana Catarina",
        },
      });
      fireEvent.click(botao);
    
      let mensagemDeErro = screen.queryByRole("alert");
      expect(mensagemDeErro).toBeInTheDocument();
    
      //esperar N segundos
      act(() => {
        jest.runAllTimers();
      });
      mensagemDeErro = screen.queryByRole("alert");
      expect(mensagemDeErro).toBeNull();
    });

})

