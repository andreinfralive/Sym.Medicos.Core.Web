# Sym.Medicos.Core.Web
Para execução da rotina do migration primeiramente deve alterar o arquivo que se encontra dentro da pasta projeto WEBPI 
arquivo config.json onde a minha connection string está como "Server=localhost;Database=SymDB;uid=root;pwd=sa772003;"
para o servidor que deva utilizar e usuario e senha de acesso ao servidor.

Depois abra o Package Manager Console e dê mo comando Enable-Migrations
Logo após o comando Update-Database observando o projeto que deve estar como Repository\Sym.Medicos.Core.Repository
e Aguardar a criação do banco de dados.

Se achar melhor já crie o seu usuário com o valor no campo de EhAdministrador como 1 para não precisar dar um update no registro.



