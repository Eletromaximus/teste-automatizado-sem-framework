MOCK:
  - mock é o objeto necessário para o teste funcionar

  cenário:
  Ponto A
  Ponto B
  Ponto C

  A => B

  o mock para rodar o teste B => C é o resultado do Ponto A para o Ponto B

  A => B => C

STUB:
  - serve para interceptar chamadas externas (DB, API externa, etc...)
    - garantir que o teste seja OFFLINE(Sem sistema, sem memória)

SPY:
  -spy é um tipo de stub, mas é usado para validar como a função foi chamada, com quais parametros e quantas vezes