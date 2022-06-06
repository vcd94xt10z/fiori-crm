## CRM - Gestão de Relacionamento com o Cliente

Este é um projeto para exemplificar uma aplicação CRUD, desenvolvida em Fiori para gerenciamento de clientes.

Framework: SAPUI5  
Versão: 1.71.40  
IDE: VSCode  

[Detalhes Tecnicos do App](app.md)

# Status de cada funcionalidade
- Criar cliente :heavy_check_mark:
- Atualizar cliente :heavy_check_mark:
- Remover cliente :heavy_check_mark:
- Listar clientes :heavy_check_mark:
- Filtrar, ordenar e limitar clientes :heavy_check_mark:
- Operações oData em um ambiente OnPremise :heavy_check_mark:
- Operações oData localmente usando MockServer :heavy_check_mark:
- Teste unitário :heavy_check_mark:
- Teste de integração

# Conceitos aplicados
- XMLViews :heavy_check_mark:
- Controllers :heavy_check_mark:
- Rotas :heavy_check_mark:
- DataBinding :heavy_check_mark:
- MockServer :heavy_check_mark:
- QUnit :heavy_check_mark:
- Sinon

# Observações
Sempre que tiver duvidas na hora de saber como passar um valor do frontend para o backend, faça uma requisição de leitura, exemplo
```
/sap/opu/odata/SAP/ZCRM_SRV/customerSet?$format=json
```
Da forma que vier o json, você deve passar para CRIAR ou ATUALIZAR uma entidade

Em regra geral, funciona da seguinte maneira:
- Int: Não tem aspas, é passado apenas os numeros
- Decimal: Tem aspas duplas, é passado os numeros com ponto "." como separador decimal
- Data: Tem aspas duplas, é passado no formato "\/Date(1653350400000)\/"
- Todo o restante: é passado como String, tem aspas duplas

