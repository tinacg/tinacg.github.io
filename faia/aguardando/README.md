# Tasks

Run the computation function twice, after loading chegando and after loading
pedidos because it is unknown which completes first

# Interface

### Pedido

Operador digita:
1. Cod. produto (A)
2. Qtde. desejada (E)
3. Qtde. ja reservada (F)
4. Cod. cliente (n/a)
5. Reserva, Desistencia, Container, Desistencia do Container, Faturado,
ou Cancelado (D)
6. Observaçoes (H)

Computador calcula:
1. Nome do produto (L)
2. Qtde. por caixa (n/a)
3. Sobrando (J)
4. Nome do cliente (B)
5. Nome do vendedor (C)
6. Ver se é possivel calcular Desistencia do Container automaticamente (n/a)
7. Data criada (I)
8. Data atualizada (n/a)


### Clientes

1. Codigo
2. Nome
3. Vendedor

### Produtos

1. Codigo
2. Nome
3. Quantidade por caixa


### Chegando

1. Codigo Produto
2. Qtde. chegando
3. Container


# Temporary calculations

1. Wanted = Qtde. desejada - Qtde. ja reservada
2. Total wanted = sum of all wanted for a codigo
3. Sobrando = Total Chegando - Total wanted