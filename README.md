# Aplicativo Flowk - ChargeGrid

#### FIAP + GoodWe · EV Challenge 2026
---------

###  Equipe: Khaos Flow (Grupo 03) 

#### Integrantes: 

* Ana Julia Yumi Inoue - RM: 569430

* João Pedro Santos Ferreira - RM: 569202

* Maria Fernanda Dias Ribeiro - RM: 569999

* Ulysses Gomes Soares de Souza - RM: 573826

* Yasmin Cristina Carvalho Mayer - RM: 573964


------
## Projeto 

O FlowK é uma plataforma completa para gerenciamento inteligente de eletropostos comerciais, desenvolvida sobre o ecossistema GoodWe. É Aplicativo mobile + API para localizar estações de recarga de veículos elétricos, escolher um carregador, acompanhar a sessão de carregamento em tempo real e gerenciar a carteira de pagamentos.

O sistema integra 2 camadas:

| Pasta | O que é | Stack |
| --- | --- | --- |
| backend/ | API REST com dados mockados de estações | Node.js, Express 5, CORS, nodemon |
| mobile/ | App mobile (iOS, Android e web) | React Native 0.86, Expo SDK 57, Expo Router |

-----

## Instruções de funcionamento

#### Pré-requisitos: Node.js 18+ e npm. Para rodar no celular, o app Expo Go.
--- 
#### 1. Backend
```bash
cd backend
npm install
npm run dev     # com recarga automática (nodemon)
# ou: npm start
```
A API sobe em http://localhost:3000. Teste com curl http://localhost:3000/stations.

#### 2. Mobile
```bash
cd mobile
npm install
npm start       # abre o Expo Dev Server (QR Code para o Expo Go)
# ou: npm run android | npm run ios | npm run web
```
> ⚠️ **Importante:** O endereço da API fica em `mobile/services/api.js` (`API_URL`).  
> Ao rodar em um dispositivo físico, `localhost` aponta para o próprio celular — troque pelo IP da sua máquina na rede local (ex.: `http://192.168.0.10:3000`) e mantenha celular e computador na mesma rede.

#### 3. Demonstração
1. Faça login com usuario@chargegrid.com / 123456.
2. Na Home, abra o mapa e escolha uma estação.
3. Selecione o conector, a velocidade e a meta de energia.
4. Simule a inserção do cabo e acompanhe a sessão até a meta (ou pare manualmente).
5. Confira o resumo e o impacto no saldo da carteira.

### Observações
>  **Observações Importantes:**
> - **Dados Mockados:** Não há banco de dados, autenticação real nem integração de pagamento.
> - **Simulação de Carregamento:** Toda a lógica de velocidade, kWh acumulado e custo roda no cliente, localizada em `mobile/src/app/charging-session.jsx`.
> - **Licença:** A pasta `mobile/` possui uma licença própria no arquivo `mobile/LICENSE`.

---

## Problema Inicial da GodWe
---
Eletropostos comerciais operam hoje sem inteligência integrada:

* Sobrecarga elétrica: múltiplos veículos conectados simultaneamente sem controle de demanda ultrapassam o limite da rede

* Desperdício energético: carregadores mantêm potência máxima mesmo acima de 80% de carga, desperdiçando energia renovável

* Ausência de cobrança automatizada: sem sistema de tarifação por sessão

* Falta de visibilidade: usuário não sabe status, custo nem tempo restante
---

## Nossa solução -> Aplicar os 3 Pilares da GodWe
----

#### 01) Gerenciamento Inteligente de Demanda de Potência
----
Algoritmo de balanceamento automático que divide a potência disponível igualmente entre os veículos ativos, garantindo que o total nunca ultrapasse o limite da rede.


1 veículo  → 22,00 kW

2 veículos → 11,00 kW cada   (total: 22,00 kW)

3 veículos →  7,33 kW cada   (total: 21,99 kW ✔)



#### Lógica de eficiência energética:

```python
# Eficiência reduz após 80% — replica comportamento real de baterias
if bateria < 80:
    eficiencia = 1.0   # 100% da potência
else:
    eficiencia = 0.5   # 50% — protege a bateria e reduz desperdício

energia_min = (potencia * eficiencia) / 60
```

```text
energia_min = (potencia * eficiencia) / 60
```

#### 02) Sistema de Cobrança Automatizado
---
Tarifação por kWh com diferenciação de planos e geração de recibo ao final de cada sessão.

| Tipo | Tarifa | Taxa de sessão |
| :--- | :--- | :--- |
| Comum | R$ 1,80/kWh | R$ 5,00 |
| Premium | R$ 1,20/kWh | R$ 2,00 |

Ajuste por horário de pico (17h–21h): acréscimo de R$ 0,30/kWh.

#### 03) Interface para o Usuário — App FlowK
---
Aplicativo mobile com monitoramento em tempo real:

* Status do eletroposto e carregadores disponíveis
  
* Potência atual, energia transferida e custo acumulado
  
* Recibo digital completo ao encerrar a sessão
  
---------

## Funcionalidades 
* Splash e login: login com usuário mockado (usuario@chargegrid.com / 123456).
  
* Home: saldo, atalhos rápidos e histórico de sessões de recarga.
  
* Mapa / busca de estações: lista de estações próximas com distância, potência e preço.
  
* Seleção de carregador: escolha do conector (CCS2, Type 2), da velocidade de carga e da meta de energia; mostra
estimativa de tempo e custo antes de iniciar.

* Sessão de carregamento: simulação em tempo real de progresso da bateria, kWh e custo.
  
* Resumo da sessão: total de energia, duração e valor cobrado ao final.
  
* Carteira: saldo, métodos de pagamento (Pix, cartão) e recarga de créditos por valores pré-definidos ou personalizados.
--

## Arquitetura  - FALTA FAZER 

*fazer!****

---

## Protótipo - Imagens

#### 1) Splash / Login do Usuário 
<table>
  <tr>
    <td><img width="250" alt="WhatsApp Image 2026-09-20 at 11 33 09" src="https://github.com/user-attachments/assets/19d49d6e-5f82-4cb5-8fa2-0747bb906f66" />
</td>
    <td><img width="250" alt="WhatsApp Image 2026-09-20 at 11 33 09 (1)" src="https://github.com/user-attachments/assets/6bdb6925-a45d-46da-b67f-b8396ac1b97a" /></td>
  </tr>
  <tr>
    <td align="center"><b>Abertura APP</b></td>
    <td align="center"><b>Tela de Login</b></td>
  </tr>
</table>


#### 2) Home - Tela Inicial 
<table>
  <tr>
    <td><img width="250" alt="WhatsApp Image 2026-09-20 at 11 33 09 (2)" src="https://github.com/user-attachments/assets/b8220b9e-be57-4a46-93c5-35b3f6303d81" /></td>
    <td><img width="250" alt="WhatsApp Image 2026-09-20 at 11 39 44" src="https://github.com/user-attachments/assets/4a9b9dca-7638-45b4-b986-d40cfc29ec28" /></td>
  </tr>
  <tr>
    <td align="center"><b>Tela Inicial</b></td>
    <td align="center"><b>Histórico de Recargas</b></td>
  </tr>
</table>

#### 3) Seleção de conector - Escolher carregador disponível
<table>
  <tr>
    <td><img width="250" alt="image" src="https://github.com/user-attachments/assets/42a867e7-5580-4a88-8197-9c8aacf8e3e3" /></td>
    <td><img width="250" alt="image" src="https://github.com/user-attachments/assets/46d64f6d-172d-4f57-b282-b97e4c11fc85" /></td>
  </tr>
  <tr>
    <td align="center"><b>Clicar em "Iniciar Carregamento"</b></td>
    <td align="center"><b>Selecionar Conector</b></td>
  </tr>
</table>

#### 4) Sessão de carregamento
<table>
  <tr>
    <td><img width="1010" height="1594" alt="image" src="https://github.com/user-attachments/assets/e61a34d2-64ce-4c0e-b073-729084b6f1ad" /></td>
    <td><img width="1170" height="1483" alt="image" src="https://github.com/user-attachments/assets/803453a5-7bdc-4532-bccc-88cca93cc73c" /></td>
    <td><img width="782" height="1600" alt="image" src="https://github.com/user-attachments/assets/85b77b5b-54af-4104-8253-28c17fc0cc8e" /></td>
    <td><img width="728" height="1600" alt="image" src="https://github.com/user-attachments/assets/4ac743f2-00f3-43f1-9ad3-fda58f9c4316" /></td>
  </tr>
  <tr>
    <td align="center"><b>Carregador conectando</b></td>
    <td align="center"><b>Carregador conectado</b></td>
    <td align="center"><b>Carregando</b></td>
    <td align="center"><b>Sessão Finalizada</b></td>
    
  </tr>
</table>

#### 5) Resumo da sessão e Carteira
<table>
  <tr>
    <td><img width="300" alt="image" src="https://github.com/user-attachments/assets/f3fd3316-4385-462c-87b4-b11688976eaa" /></td>
  </tr>
  <tr>
    <td align="center"><b>Fatura</b></td>
  </tr>
</table>

## Justificativa técnica das escolhas
FALTA FAZER !!!!! 
--

## Resultados e dados funcionais

| Cenário | Resultado Esperado |
| :--- | :--- |
| **1.** Login com usuário mockado | Redireciona para a Home |
| **2.** Login com credenciais inválidas | Alerta de erro, permanece na tela |
| **3.** `GET /stations` | `200` com a lista de estações |
| **4.** `GET /stations/:id` inexistente | `404` "Estação não encontrada" |
| **5.** Seleção de conector com meta de kWh | Estimativa de tempo e custo exibida antes de iniciar |
| **6.** Sessão de carregamento até a meta | Encerra sozinha e abre o resumo |
| **7.** Parada manual da sessão | Resumo com kWh e custo parciais |
| **8.** Recarga de créditos na carteira | Saldo atualizado |

Exemplo de cálculo da sessão (dados gerados pelo app):

> **velocidade:** Rápido → 0,20 kWh/s  
> **meta:** 8,5 kWh → ~43 s de simulação  
> **preço:** R$ 2,19 / kWh (estação ChargeGrid)  
> **custo:** 8,5 × 2,19 = R$ 18,62

-----
## Conexão com os conteúdos da disciplina
----
Arquitetura cliente-servidor e APIs REST — separação entre app (cliente) e serviço HTTP, uso correto de verbos, recursos e códigos de status (200/404).

Integração de sistemas — consumo assíncrono da API por fetch, tratamento de erro e serialização JSON.

Desenvolvimento mobile multiplataforma — componentização, estado (useState, useEffect, useMemo), ciclo de vida e navegação entre telas.

Modelagem de dados — entidades Station e Charger e seus relacionamentos.

Experiência do usuário / prototipação — fluxo completo do usuário, feedback visual e animações durante a sessão de recarga.

Sistemas embarcados e eletromobilidade — representação das grandezas de recarga (potência em kW, energia em kWh, tipos de conector CCS2 e Type 2) e do ciclo de uma sessão de carregamento.

----
## Estrutura do repositório
----
```text
├── backend/
│   └── src/
│       ├── server.js          # app Express e rotas
│       └── mocks/
│           ├── stations.js    # estações mockadas
│           └── chargers.js    # carregadores mockados
├── mobile/
│   ├── src/
│   │   ├── app/               # telas (rotas do Expo Router)
│   │   ├── components/        # Header, BottomNav, RechargeModal
│   │   └── constants/
│   │       └── theme.js       # paleta de cores
│   ├── services/
│   │   └── api.js             # cliente HTTP da API
│   └── assets/                # ícones e imagens
└── docs/                      # diagramas e capturas do protótipo
```

---
## API 
Base URL padrão: http://localhost:3000

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | / | Health check da API |
| GET | /stations | Lista todas as estações |
| GET | /stations/:id | Detalhe de uma estação (404 se não existir) |
