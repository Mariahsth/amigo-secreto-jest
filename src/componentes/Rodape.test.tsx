import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import Rodape from "./Rodape";
import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes";

jest.mock("../state/hook/useListaDeParticipantes", () => {
  return {
    useListaDeParticipantes: jest.fn(),
  };
});

const mockNavegacao=jest.fn()
const mockSorteio=jest.fn()

jest.mock("../state/hook/useSorteador", () => {
    return {
      useSorteador: () => mockSorteio
    };
  });
jest.mock("react-router-dom", () => {
    return {
      useNavigate: () => mockNavegacao
    };
  });

describe("Quando não existem participantes suficientes", () => {
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue([]);
  });
  test("a brincadeira não pode ser iniciada", () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    );

    const botao = screen.getByRole("button");
    expect(botao).toBeDisabled();
  });
});

describe("Quando existem participantes suficientes", () => {
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(['Ana','Catarina', 'Julia']);
  });
  test("a brincadeira pode ser iniciada", () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    );

    const botao = screen.getByRole("button");
    expect(botao).not.toBeDisabled();
  });

  test('A brincadeira foi iniciada', () => {
    render(
        <RecoilRoot>
          <Rodape />
        </RecoilRoot>
      );
  
      const botao = screen.getByRole("button");
      fireEvent.click(botao)
      expect(mockNavegacao).toHaveBeenCalledTimes(1)
      expect(mockNavegacao).toHaveBeenCalledWith('/sorteio')
      expect(mockSorteio).toHaveBeenCalledTimes(1)
  })
});
