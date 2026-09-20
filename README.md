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

## Problema Inicial da GodWe

Eletropostos comerciais operam hoje sem inteligência integrada:

* Sobrecarga elétrica: múltiplos veículos conectados simultaneamente sem controle de demanda ultrapassam o limite da rede

* Desperdício energético: carregadores mantêm potência máxima mesmo acima de 80% de carga, desperdiçando energia renovável

* Ausência de cobrança automatizada: sem sistema de tarifação por sessão

* Falta de visibilidade: usuário não sabe status, custo nem tempo restante
---

## Solução -> Aplicar os 3 Pilares da GodWe

#### 01 · Gerenciamento Inteligente de Demanda de Potência
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

#### 02 · Sistema de Cobrança Automatizado
---
Tarifação por kWh com diferenciação de planos e geração de recibo ao final de cada sessão.

| Tipo | Tarifa | Taxa de sessão |
| :--- | :--- | :--- |
| Comum | R$ 1,80/kWh | R$ 5,00 |
| Premium | R$ 1,20/kWh | R$ 2,00 |

Ajuste por horário de pico (17h–21h): acréscimo de R$ 0,30/kWh.

#### 03 · Interface para o Usuário — App FlowK
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
    <td><img width="565" height="1280" alt="WhatsApp Image 2026-09-20 at 11 33 09" src="https://github.com/user-attachments/assets/19d49d6e-5f82-4cb5-8fa2-0747bb906f66" />
</td>
    <td><img width="584" height="1280" alt="WhatsApp Image 2026-09-20 at 11 33 09 (1)" src="https://github.com/user-attachments/assets/6bdb6925-a45d-46da-b67f-b8396ac1b97a" /></td>
  </tr>
  <tr>
    <td align="center"><b>Abertura APP</b></td>
    <td align="center"><b>Tela de Login</b></td>
  </tr>
</table>


#### 2) Home - Tela Inicial 
<table>
  <tr>
    <td><img width="577" height="1280" alt="WhatsApp Image 2026-09-20 at 11 33 09 (2)" src="https://github.com/user-attachments/assets/b8220b9e-be57-4a46-93c5-35b3f6303d81" /></td>
    <td><img width="1010" height="1235" alt="WhatsApp Image 2026-09-20 at 11 39 44" src="https://github.com/user-attachments/assets/4a9b9dca-7638-45b4-b986-d40cfc29ec28" /></td>
  </tr>
  <tr>
    <td align="center"><b>Tela Inicial</b></td>
    <td align="center"><b>Histórico de Recargas</b></td>
  </tr>
</table>

#### 3) Seleção de conector - Escolher carregador disponível
#### 4) Sessão de carregamento
#### 5) Resumo da sessão
#### 6) Carteira




