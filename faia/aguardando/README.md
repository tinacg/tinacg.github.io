# Tasks

Run the computation function twice, after loading chegando and after loading
pedidos because it is unknown which completes first

# Interface

### Pedido

Operador digita:
1. Cod. produto
2. Qtde. desejada
3. Qtde. ja reservada
4. Cod. cliente
5. Reserva, Desistencia, Container, Desistencia do Container, Faturado,
ou Cancelado
6. Observaçoes

Computador calcula:
1. Nome do produto
2. Nome do cliente
3. Nome do vendedor
4. Ver se é possivel calcular Desistencia do Container automaticamente
5. Data criada
6. Data atualizada
7. Sobrando

### Clientes

1. Codigo
2. Nome
3. Vendedor

### Chegando

1. Codigo Produto
2. Qtde. chegando
3. Container

# Temporary calculations

1. Wanted = Qtde. desejada - Qtde. ja reservada
2. Total wanted = sum of all wanted for a codigo
3. Sobrando = Total Chegando - Total wanted