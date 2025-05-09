<h1>Parte backend</h1>

<h2>End points:</h2>
Descrição: Listar todas a mesas.</br>
Method: GET</br>
URL:http://localhost:8080/mesas</br>
</br>
Descrição: Listar todas a mesas ja reservadas.</br>
Method: GET</br>
URL:http://localhost:8080/revervadas</br>
</br>
Descrição: Reservar Mesa.</br>
Method: POST</br>
URL:http://localhost:8080/revervar/{id}</br>
Campos para preencher:</br>
{   
"horas_ocupacao": 4,</br>
"nome_cliente": "User",</br>
"telefone_cliente" : "1999999999",</br>
"email_cliente": "teste@gmail.com",</br>
"horadia_marcada": "2025-05-30T20:30:00"</br>
}</br>
</br>
Descrição: Alterar disponibilidade da mesa.</br>
Method: PUT</br>
URL:http://localhost:8080/alterarDisponibilidade/{id}</br>
</br>









